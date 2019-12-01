<?php

namespace App\Jobs\Transactions\Upload;

use Illuminate\Http\UploadedFile;

class UploadCommand
{
    /** @var UploadedFile  */
    private $file;

    /**
     * UploadTransactionDto constructor.
     * @param UploadedFile $file
     */
    public function __construct($file) {
        $this->file = $file;
    }

    /**
     * Get the value of file
     */
    public function getFile()
    {
        return $this->file;
    }
}
