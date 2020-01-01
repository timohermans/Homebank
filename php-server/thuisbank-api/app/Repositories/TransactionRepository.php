<?php

namespace App\Repositories;

use App\Entities\Category;
use App\Entities\Transaction;
use DateTime;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;

class TransactionRepository implements TransactionRepositoryInterface
{
    /** @var ObjectRepository|EntityRepository */
    private $repo;

    public function __construct(EntityManager $entityManager)
    {
        $this->repo = $entityManager->getRepository(Transaction::class);
    }

    public function getBetweenRange(DateTime $minDate, DateTime $maxDate)
    {
        // TODO: Implement getBetweenRange() method.
    }

    public function find(string $id): Transaction
    {
        return $this->find($id);
    }
}
