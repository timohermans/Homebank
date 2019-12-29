<?php

namespace App\Jobs\Transactions\Upload;

use Illuminate\Http\UploadedFile;

class UpdateCommand
{
    /** @var string */
    private $transactionId;

    /** @var string */
    private $categoryId;

    /**
     * @param array $requestArray
     */
    public function __construct($requestArray)
    {
        $this->transactionId = $requestArray['transactionId'];
        $this->categoryId = $requestArray['categoryId'];
    }
}
