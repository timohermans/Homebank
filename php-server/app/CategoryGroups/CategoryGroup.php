<?php

namespace App\CategoryGroups;


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
        $this->name = $name;
    }
}
