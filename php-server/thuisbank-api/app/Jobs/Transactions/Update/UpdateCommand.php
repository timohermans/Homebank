<?php

namespace App\Jobs\Transactions\Update;

use Illuminate\Http\UploadedFile;

class UpdateCommand
{
    /** @var string */
    private $id;

    /** @var string */
    private $categoryId;

    /**
     * @param array $requestArray
     */
    public function __construct($requestArray)
    {
        $this->id = $requestArray['id'];
        $this->categoryId = $requestArray['categoryId'];
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getCategoryId(): string
    {
        return $this->categoryId;
    }
}
