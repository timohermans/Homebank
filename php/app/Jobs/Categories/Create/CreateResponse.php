<?php


namespace App\Jobs\Categories\Create;


use App\Domain\Entities\Category;
use App\Jobs\JobResponse;

class CreateResponse extends JobResponse
{
    /** @var string */
    private $id;
    /** @var string */
    private $name;
    /**
     * @var string
     */
    private $iconName;

    /**
     * Category constructor.
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        $this->name = $category->getName();
        $this->iconName = $category->getIconName();
        $this->id = $category->getId();
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
