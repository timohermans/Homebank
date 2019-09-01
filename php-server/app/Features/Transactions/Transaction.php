<?php

namespace App\Features\Transactions;

use App\Core\Domain\Validations\Guard;
use App\Core\Domain\Validations\StringUtil;
use App\Exceptions\EntityValidationException;
use App\Features\Categories\Category;
use Assert\Assertion;
use DateTime;

class Transaction
{
    /** @var string */
    private $id;
    /** @var DateTime */
    private $date;
    /** @var string */
    private $payee;
    /** @var string */
    private $memo;
    /** @var string */
    private $outflow;
    /** @var string */
    private $inflow;
    /** @var bool */
    private $isBankTransaction;
    /** @var bool */
    private $isInflowForBudgeting;
    /** @var Category */
    private $category;

    public function __construct(
        DateTime $date,
        string $payee,
        ?Category $category,
        string $memo,
        string $outflow,
        string $inflow,
        bool $isInflowForBudgeting,
        bool $isBankTransaction)
    {
        Assertion::notEmpty($payee); // https://github.com/beberlei/assert
        Assertion::notEmpty($memo);
        Assertion::numeric($outflow);
        Assertion::numeric($inflow);

        $this->date = $date;
        $this->payee = $payee;
        $this->memo = $memo;
        $this->outflow = $outflow;
        $this->inflow = $inflow;
        $this->isBankTransaction = $isBankTransaction;

        if ($isInflowForBudgeting) {
            $this->markTransactionForInFlow(true);
        } else if (!is_null($category)) {
            $this->assignCategory($category);
        }
    }

    private function markTransactionForInFlow(bool $isInFlowForBudgeting)
    {
        if ($this->isInflowForBudgeting) {
            $this->category = null;
        }

        $this->isInflowForBudgeting = $isInFlowForBudgeting;
    }

    private function assignCategory(Category $category)
    {
        Assertion::notNull($category);

        $this->isInflowForBudgeting = false;
        $this->category = $category;
    }
}
