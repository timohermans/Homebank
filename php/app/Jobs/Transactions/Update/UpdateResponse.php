<?php


namespace App\Jobs\Transactions\Update;


use App\Domain\Entities\Category;
use App\Domain\Entities\Transaction;
use App\Jobs\JobResponse;
use Carbon\Carbon;

class UpdateResponse extends JobResponse
{
    /** @var string */
    private $id;
    /** @var CategoryResponse */
    private $category;

    /**
     * UpdateResponse constructor.
     * @param Transaction $transaction
     */
    public function __construct($transaction)
    {
        $this->id = $transaction->getId();
        $this->category = new CategoryResponse($transaction->getCategory());
    }


    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return CategoryResponse
     */
    public function getCategory(): CategoryResponse
    {
        return $this->category;
    }
}

class CategoryResponse extends JobResponse
{
    /** @var string */
    private $id;
    /** @var string */
    private $name;
    /** @var string */
    private $iconName;

    /**
     * CategoryResponse constructor.
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        $this->id = $category->getId();
        $this->name = $category->getName();
        $this->iconName = $category->getIconName();
    }


    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getIconName(): string
    {
        return $this->iconName;
    }
}
