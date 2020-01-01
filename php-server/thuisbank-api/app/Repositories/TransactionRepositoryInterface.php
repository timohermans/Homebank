<?php

namespace App\Repositories;

use App\Entities\Category;
use App\Entities\Transaction;
use DateTime;

interface TransactionRepositoryInterface
{
    public function find(string $id): Transaction;
    public function getBetweenRange(DateTime $minDate, DateTime $maxDate);
}
