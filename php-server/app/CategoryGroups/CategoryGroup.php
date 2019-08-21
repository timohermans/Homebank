<?php

namespace App\CategoryGroups;


use App\Core\Domain\Validations\Guard;

class CategoryGroup
{
    /** @var string */
    protected $id;
    /** @var string */
    protected $name;
    /** @var Category[] */
    protected $categories;

    public function __construct(string $name)
    {
        Guard::againstEmptyString($name);

        $this->name = $name;
    }

    /**
     * @return string id
     */
    public function getId() {
        return $this->id;
    }
}
