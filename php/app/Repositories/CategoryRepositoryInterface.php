<?php

namespace App\Repositories;

use App\Domain\Entities\Category;

interface CategoryRepositoryInterface
{
    /**
     * @param string $id
     *
     * @return Category
     */
    public function find($id);

    public function findByName(string $name);

    public function save(Category $category);
}
