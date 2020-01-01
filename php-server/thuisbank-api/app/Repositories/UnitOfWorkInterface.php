<?php


namespace App\Repositories;


interface UnitOfWorkInterface
{
    /**
     * @param mixed $entity
     * @return mixed
     */
    public function insert($entity);

    /**
     * @return void
     */
    public function save();
}
