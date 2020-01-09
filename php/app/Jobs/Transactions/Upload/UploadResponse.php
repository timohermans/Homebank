<?php


namespace App\Jobs\Transactions\Upload;


use App\Jobs\JobResponse;

class UploadResponse extends JobResponse
{
    /** @var int */
    private $amountInserted;
    /** @var int */
    private $amountDuplicate;

    /**
     * UploadResponse constructor.
     * @param int $amountInserted
     * @param int $amountDuplicate
     */
    public function __construct(int $amountInserted, int $amountDuplicate)
    {
        $this->amountInserted = $amountInserted;
        $this->amountDuplicate = $amountDuplicate;
    }

    /**
     * @return int
     */
    public function getAmountInserted(): int
    {
        return $this->amountInserted;
    }

    /**
     * @return int
     */
    public function getAmountDuplicate(): int
    {
        return $this->amountDuplicate;
    }
}
