<?php

namespace App\Repositories;

use App\Entities\Category;

interface CategoryRepositoryInterface
{
    /**
     * Findt
     *
     * @param string $id
     *
     * @return Category
     */
    public function find($id);
}
