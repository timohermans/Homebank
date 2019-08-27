<?php

namespace App\Features\Transactions;

use DateTime;

class Transaction
{
    /** @var string */
    protected $id;
    /** @var DateTime */
    protected $date;
    /** @var string */
    protected $memo;
    /** @var string */
    protected $outflow;
    /** @var string */
    protected $inflow;
    /** @var bool */
    protected $isBankTransaction;
    /** @var bool */
    protected $isInflowForBudgeting;
}
