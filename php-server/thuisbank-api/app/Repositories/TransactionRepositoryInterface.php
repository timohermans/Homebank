<?php

namespace App\Repositories;

use App\Entities\Category;
use DateTime;

interface TransactionRepositoryInterface
{
    public function getBetweenRange(DateTime $minDate, DateTime $maxDate)
    {

    }
}
