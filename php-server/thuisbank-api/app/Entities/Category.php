<?php

namespace App\Entities;

use Assert\Assertion;

// TODO: Is it possible to save images in the DB? How to handle this in doctrine
// TODO: Add job for creating a category

class Category
{
    use ConverterTrait;

    /** @var string */
    private $id;
    /** @var string */
    private $name;

    public function __construct(string $name)
    {
        Assertion::notNull($name);

        $this->name = $name;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
