<?php


namespace App\Domain\Models;


use Exception;
use Traversable;

class IdCollection implements \IteratorAggregate
{
    private array $ids;

    /**
     * IdCollection constructor.
     * @param mixed $ids,... ids to be passed
     */
    public function __construct(string ...$ids)
    {
        $this->ids = $ids;
    }

    /**
     * @inheritDoc
     */
    public function getIterator()
    {
        return new \ArrayIterator($this->ids);
    }

    /**
     * @return string[]
     */
    public function getIds()
    {
        return $this->ids;
    }
}
