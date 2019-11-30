<?php

namespace App\Jobs;

use App\Dto\UploadTransactionDto;
use Assert\Assertion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use LaravelDoctrine\ORM\Facades\EntityManager;
use NumberFormatter;

class UploadTransactions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $numberFormatter;
    private $dateIndex = 4;
    private $amountIndex = 6;
    private $payeeIndex = 9;
    private $memoIndex = 19;
    private $automaticIncassoIdentification = 16;
    private $positiveAmountCharacter = '+';
    /** @var EntityManager */
    private $entityManager;


    /**
     * Create a new job instance.
     *
     * @param UploadTransactionDto $request
     *
     * @return void
     */
    public function __construct(UploadTransactionDto $request)
    {
        $this->request = $request;
        $this->numberFormatter = NumberFormatter::create('nl_NL', NumberFormatter::DECIMAL);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;

        Assertion::notNull($this->request['file']);

        $records = $this->getRecordsFrom($this->request);

        $transactionsParsed = $this->createTransactionsFrom($records);
        $existingTransactions = $this->getExistingTransactions($transactionsParsed);
        $transactionsToInsert = $this->getTransactionsToInsertFrom($transactionsParsed, $existingTransactions);

        $this->saveTransactions($transactionsParsed);

        return (string) count($transactionsParsed);
    }

    private function getRecordsFrom($request)
    {
        /** @var File $file */
        $file = $request['file'];

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

            $date = \DateTime::createFromFormat('!Y-m-d', $record[$this->dateIndex]);
            $payee = $record[$this->payeeIndex];
            $memo = $record[$this->memoIndex];
            $amountString = $record[$this->amountIndex];
            $isPositiveAmount = $amountString[0] === $this->positiveAmountCharacter;
            $amount = $this->numberFormatter->parse(ltrim($amountString, $amountString[0]));
            $incassoId = $record[$this->automaticIncassoIdentification];
            $incassoIdText = trim($incassoId) === '' ? '' : " (Incasso: $incassoId)";
            $isTransactionFromBank = true;
            $isInflowForBudgeting = true;

            $transactionsParsed[] = new Transaction(
                $date,
                $payee,
                null,
                "$memo$incassoIdText",
                $isPositiveAmount ? 0 : $amount,
                $isPositiveAmount ? $amount : 0,
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

        return $this->entityManager->createQuery("
            select t
            from App\Features\Transactions\Transaction t
            where t.date > :minDate and t.date < :maxDate
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
                    dump('uh?');
                    $foundTransaction = $existingTransaction;
                    continue;
                }
            }

            if (!isset($foundTransaction)) {
                dump('adding');
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
