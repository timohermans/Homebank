<?php

namespace App\Domain\Entities;

use Assert\Assert;
use Assert\Assertion;

// TODO: Is it possible to save images in the DB? How to handle this in doctrine (read -> use storage)

class Category extends Entity
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
     * @param string $name
     * @param string $iconName
     */
    public function __construct(string $name, ?string $iconName)
    {
        $this->changeNameWith($name);
        $this->iconName = $iconName ?? 'euro-sign';
    }

    public function changeNameWith(string $name): void
    {
        $minLength = 1;
        $maxLength = 50;
        Assertion::notNull($name);
        Assertion::minLength($name, $minLength);
        Assertion::maxLength($name, $maxLength);

        $this->name = $name;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

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

    /**
     * @param Category $c2
     * @return bool
     */
    public function isEqual(Category $c2): bool
    {
        return $this->getName() === $c2->getName() &&
            $this->getIconName() === $c2->getIconName();
    }
}
