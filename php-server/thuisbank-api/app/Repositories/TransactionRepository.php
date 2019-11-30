<?php

namespace App\Repositories;

use App\Entities\Category;
use Doctrine\ORM\EntityManager;

class TransactionRepository implements TransactionRepositoryInterface
{
    /** @var EntityManager */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }
}
