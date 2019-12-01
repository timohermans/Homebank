<?php

namespace App\Repositories;

use App\Entities\Category;
use Doctrine\ORM\EntityManager;

class CategoryRepository implements CategoryRepositoryInterface
{
    /** @var EntityManager */
    private $entityManager;
    /** @var \Doctrine\Common\Persistence\ObjectRepository|\Doctrine\ORM\EntityRepository */
    private $repo;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repo = $entityManager->getRepository(Category::class);
    }

    /**
     * @param string $id
     * @return Category
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function find($id): Category
    {
        $class = Category::class;
        $qb = $this->entityManager->createQuery("SELECT c FROM $class c WHERE c.id = :id")
            ->setParameter('id', $id)
            ->getSingleResult();

        return $qb;
    }

    /**
     * @param string $name
     * @return Category
     */
    public function findByName(string $name): Category
    {
        return $this->repo->findOneBy(['name' => $name]);
    }
}
