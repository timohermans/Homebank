<?php

namespace App\Jobs\Categories\Get;

class GetRequest
{
    /** @var string */
    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Get the value of id
     */
    public function getId(): string
    {
        return $this->id;
    }
}
