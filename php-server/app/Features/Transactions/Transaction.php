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
        Category $category,
        string $memo,
        string $outFlow,
        string $inFlow,
        bool $isInflowForBudgeting,
        bool $isBankTransaction)
    {
        Assertion::date($date);
        Assertion::notEmpty($payee); // https://github.com/beberlei/assert
        Assertion::notEmpty($memo);
        Assertion::numeric($outFlow);
        Assertion::numeric($inFlow);

        if (StringUtil::isEmpty($inFlow) && StringUtil::isEmpty($outFlow)) {
            throw new EntityValidationException('Must have at least an inflow or an outflow');
        }

        $this->date = $date;
        $this->payee = $payee;
        $this->memo = $memo;
        $this->outflow = $outFlow;
        $this->inflow = $inFlow;
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
