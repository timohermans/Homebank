<?php

namespace App\Repositories;

use App\Domain\Entities\Category;
use App\Domain\Entities\Transaction;
use App\Domain\Models\IdCollection;
use DateTime;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;

class TransactionRepository implements TransactionRepositoryInterface
{
    /** @var ObjectRepository|EntityRepository */
    private $repo;
    private EntityManager $em;

    public function __construct(EntityManager $entityManager, EntityManager $em)
    {
        $this->repo = $entityManager->getRepository(Transaction::class);
        $this->em = $em;
    }

    public function getBetweenRange(DateTime $minDate, DateTime $maxDate)
    {
        // TODO: Implement getBetweenRange() method.
    }

    public function find(string $id): Transaction
    {
        return $this->repo->find($id);
    }

    public function findBy(IdCollection $ids)
    {
        return $this->em->createQuery(<<<SQL
            SELECT t
            FROM App\Domain\Entities\Transaction t
            WHERE t.id IN (:ids)
            SQL
        )
            ->setParameter('ids', join(', ', $ids->getIds()))
            ->getResult();
    }
}
