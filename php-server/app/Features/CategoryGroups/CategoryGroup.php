<?php

namespace App\Features\CategoryGroups;


use App\Core\Domain\Traits\ConverterTrait;
use App\Core\Domain\Validations\Guard;

class CategoryGroup
{
    use ConverterTrait;

    /** @var string */
    private $id;
    /** @var string */
    private $name;
    /** @var Category[] */
    private $categories;

    private function __construct()
    {
    }

    public static function create(string $name): CategoryGroup
    {
        Guard::againstEmptyString($name);

        $group = new CategoryGroup();
        $group->name = $name;

        return $group;
    }

    /**
     * @return string id
     */
    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }
}
