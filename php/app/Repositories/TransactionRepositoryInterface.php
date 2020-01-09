<?php

namespace App\Repositories;

use App\Domain\Entities\Category;
use App\Domain\Entities\Transaction;
use App\Domain\Models\IdCollection;
use DateTime;

interface TransactionRepositoryInterface
{
    public function find(string $id): Transaction;
    public function getBetweenRange(DateTime $minDate, DateTime $maxDate);
    public function findBy(IdCollection $ids);
}
