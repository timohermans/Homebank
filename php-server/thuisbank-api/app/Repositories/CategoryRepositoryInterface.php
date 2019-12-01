<?php

namespace App\Repositories;

use App\Entities\Category;

interface CategoryRepositoryInterface
{
    /**
     * @param string $id
     *
     * @return Category
     */
    public function find($id);

    public function findByName(string $name);
}
