<?php

namespace App\Features\Categories;

use App\Features\CategoryGroups\CategoryGroup;

class Category {
    /** @var string */
    protected $id;
    /** @var string */
    protected $name;
    /** @var CategoryGroup */
    protected $categoryGroup;
}
