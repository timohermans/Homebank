<?php


namespace App\Features\Transactions\UploadFromFile;


use App\Features\Transactions\Transaction;
use Assert\Assertion;
use Doctrine\ORM\EntityManager;
use Illuminate\Http\File;
use League\Csv\Reader;
use NumberFormatter;

/**
 * This is the Rabobank converter. TODO: Refactor this to a rabobank converter
 *
 * Class UploadFromFileUseCase
 * @package App\Features\Transactions\UploadFromFile
 */
class UploadFromFileUseCase implements UploadFromFileUseCaseInterface
{

    private $numberFormatter;
    private $dateIndex = 4;
    private $amountIndex = 6;
    private $payeeIndex = 9;
    private $memoIndex = 19;
    private $automaticIncassoIdentification = 16;
    private $positiveAmountCharacter = '+';
    /** @var EntityManager */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;

        $this->numberFormatter = numfmt_create('nl_NL', NumberFormatter::DECIMAL);
    }

    /**
     * @param array $request the nice php request
     * @return mixed whatever the usecase is supposed to do
     * @throws \Assert\AssertionFailedException
     * @throws \League\Csv\Exception
     * @throws \App\Exceptions\EntityValidationException
     */
    function execute(array $request)
    {
        Assertion::notNull($request['file']);

        $records = $this->getRecordsFrom($request);

        $transactionsParsed = $this->createTransactionsFrom($records);
        $this->saveTransactions($transactionsParsed);

        return (string)count($transactionsParsed);
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

    private function saveTransactions(array $transactions): void
    {
        foreach ($transactions as $transaction) {
            $this->entityManager->persist($transaction);
        }

        $this->entityManager->flush();
    }
}
