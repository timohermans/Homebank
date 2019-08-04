<?php

namespace App\Core\Domain\Entities;

class Category {
    /** @var string */
    protected $id;
    /** @var string */
    protected $name;
    /** @var CategoryGroup */
    protected $categoryGroup;
}
