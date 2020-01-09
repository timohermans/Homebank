<?php


namespace App\Jobs\Transactions\AssignCategory;


use App\Domain\Models\IdCollection;

class AssignCategoryCommand
{
    private IdCollection $transactionIds;
    private string $categoryId;

    /**
     * AssignCategoryCommand constructor.
     * @param IdCollection $transactionIds
     * @param string $categoryId
     */
    public function __construct(IdCollection $transactionIds, string $categoryId)
    {
        $this->transactionIds = $transactionIds;
        $this->categoryId = $categoryId;
    }

    /**
     * @return IdCollection
     */
    public function getTransactionIds(): IdCollection
    {
        return $this->transactionIds;
    }

    /**
     * @return string
     */
    public function getCategoryId(): string
    {
        return $this->categoryId;
    }
}
