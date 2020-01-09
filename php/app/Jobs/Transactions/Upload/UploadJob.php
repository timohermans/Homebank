<?php

namespace App\Jobs\Transactions\Upload;

use App\Domain\Entities\Transaction;
use Assert\Assertion;
use Carbon\Carbon;
use Doctrine\ORM\EntityManager;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use League\Csv\Reader;
use NumberFormatter;

class UploadJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $numberParser;
    private $numberFormatter;
    private $dateIndex = 4;
    private $amountIndex = 6;
    private $payeeIndex = 9;
    private $memoIndex = 19;
    private $automaticIncassoIdentification = 16;
    private $positiveAmountCharacter = '+';
    /** @var EntityManager */
    private $entityManager;
    /** @var UploadedFile */
    private $file;


    /**
     * Create a new job instance.
     *
     * @param UploadCommand $dto
     */
    public function __construct(UploadCommand $dto)
    {
        $this->file = $dto->getFile();
        $this->numberParser = NumberFormatter::create('nl_NL', NumberFormatter::DECIMAL);
        $this->numberParser->setAttribute($this->numberParser::FRACTION_DIGITS, 2);
        $this->numberFormatter = NumberFormatter::create('en', NumberFormatter::DECIMAL);
        $this->numberFormatter->setAttribute($this->numberParser::FRACTION_DIGITS, 2);
        $this->numberFormatter->setAttribute($this->numberParser::GROUPING_USED, false);
    }

    /**
     * @param EntityManager $entityManager
     * @return UploadResponse
     * @throws \Assert\AssertionFailedException
     */
    public function handle(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;

        Assertion::notNull($this->file);

        $records = $this->getRecordsFrom($this->file);

        $transactionsParsed = $this->createTransactionsFrom($records);
        $existingTransactions = $this->getExistingTransactions($transactionsParsed);
        $transactionsToInsert = $this->getTransactionsToInsertFrom($transactionsParsed, $existingTransactions);

        $this->saveTransactions($transactionsToInsert);

        return new UploadResponse(count($transactionsToInsert), count($existingTransactions));
    }

    /**
     * @param UploadedFile $file
     * @return mixed
     */
    private function getRecordsFrom($file)
    {
        $content = $file->openFile();
        $csv = Reader::createFromFileObject($content);

        $records = $csv->getRecords();
        return $records;
    }

    private function createTransactionsFrom($records): array
    {
        foreach ($records as $offset => $record) {
            if ($offset === 0) {
                continue;
            }

            $date = Carbon::createFromFormat('!Y-m-d', $record[$this->dateIndex]);
            $payee = $record[$this->payeeIndex];
            $memo = $record[$this->memoIndex];
            $amountString = $record[$this->amountIndex];
            $isPositiveAmount = $amountString[0] === $this->positiveAmountCharacter;
            $amount = $this->numberParser->parse(ltrim($amountString, $amountString[0]));
            $amount = $this->numberFormatter->format($amount);
            $incassoId = $record[$this->automaticIncassoIdentification];
            $incassoIdText = trim($incassoId) === '' ? '' : " (Incasso: $incassoId)";
            $isTransactionFromBank = true;
            $isInflowForBudgeting = true;

            $transactionsParsed[] = new Transaction(
                $date,
                $payee,
                null,
                "$memo$incassoIdText",
                $isPositiveAmount ? '0.00' : $amount,
                $isPositiveAmount ? $amount : '0.00',
                $isInflowForBudgeting,
                $isTransactionFromBank
            );
        }

        return $transactionsParsed;
    }

    /**
     * @param $transactionsParsed Transaction[]
     * @return Transaction[]
     */
    private function getExistingTransactions($transactionsParsed): array
    {
        $datesOfTransaction = array_map(function ($transaction) {
            return $transaction->getDate();
        }, $transactionsParsed);

        $minDate = min($datesOfTransaction);
        $maxDate = max($datesOfTransaction);

        $transactionClass = Transaction::class;
        return $this->entityManager->createQuery("
            select t
            from $transactionClass t
            where t.date >= :minDate and t.date <= :maxDate
        ")
            ->setParameter('minDate', $minDate)
            ->setParameter('maxDate', $maxDate)
            ->getResult();
    }

    /**
     * @param $transactionsParsed Transaction[]
     * @param $existingTransactions Transaction[]
     * @return Transaction[]
     */
    private function getTransactionsToInsertFrom($transactionsParsed, $existingTransactions)
    {
        $transactionsToSave = [];

        // todo: somehow the equal is wrong..has to do with conversion from db

        foreach ($transactionsParsed as $parsedTransaction) {
            $foundTransaction = null;

            foreach ($existingTransactions as $existingTransaction) {
                if ($parsedTransaction->isEqual($existingTransaction)) {
                    $foundTransaction = $existingTransaction;
                    continue;
                }
            }

            if (!isset($foundTransaction)) {
                $transactionsToSave[] = $parsedTransaction;
            }
        }

        return $transactionsToSave;
    }

    private function saveTransactions(array $transactions): void
    {
        foreach ($transactions as $transaction) {
            $this->entityManager->persist($transaction);
        }

        $this->entityManager->flush();
    }
}
