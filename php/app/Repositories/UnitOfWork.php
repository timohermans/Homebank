<?php


namespace App\Repositories;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;

class UnitOfWork implements UnitOfWorkInterface
{
    /** @var EntityManager */
    private $entityManager;

    /**
     * UnitOfWork constructor.
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    /**
     * @param Object $entity
     * @return mixed
     * @throws ORMException
     */
    public function insert($entity)
    {
        $this->entityManager->persist($entity);
    }

    /**
     * @return void
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function save()
    {
        $this->entityManager->flush();
    }
}
