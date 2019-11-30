<?php

namespace App\Dto\Categories;

class GetDto
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
