<?php

namespace App\Repositories;

use App\Entities\Category;
use Doctrine\ORM\EntityManager;

class CategoryRepository implements CategoryRepositoryInterface
{
    /** @var EntityManager */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function find($id): Category
    {
        $class = Category::class;
        $qb = $this->entityManager->createQuery("SELECT c FROM $class c WHERE c.id = :id")
            ->setParameter('id', $id)
            ->getSingleResult();

        return $qb;
    }
}
