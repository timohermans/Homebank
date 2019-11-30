<?php

namespace App\Dto;

use Illuminate\Http\UploadedFile;

class UploadTransactionDto
{
    /** @var UploadedFile  */
    private $file;

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
