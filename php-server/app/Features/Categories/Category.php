<?php

namespace App\Features\Categories;

use App\Core\Domain\Traits\ConverterTrait;
use App\Core\Domain\Validations\Guard;
use App\Features\CategoryGroups\CategoryGroup;

class Category
{
    use ConverterTrait;

    /** @var string */
    private $id;
    /** @var string */
    private $name;
    /** @var CategoryGroup */
    private $categoryGroup;

    public function __construct(string $name, CategoryGroup $categoryGroup)
    {
        Guard::againstEmptyString($name);
        Guard::againstNull($categoryGroup);

        $this->name = $name;
        $this->categoryGroup = $categoryGroup;
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
