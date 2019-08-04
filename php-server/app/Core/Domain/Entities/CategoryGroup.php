<?php

namespace App\Core\Domain\Entities;


class CategoryGroup
{
    /** @var string */
    protected $id;
    /** @var string */
    protected $name;
    /** @var Category[] */
    protected $categories;
}
