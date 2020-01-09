<?php


namespace App\Jobs\Categories\Create;


class CreateCommand
{
    /** @var string */
    private $id;

    /** @var string */
    private $name;

    /** @var string */
    private $iconName;


    /**
     * CreateCommand constructor.
     * @param array $reqestArray
     */
    public function __construct($reqestArray)
    {
        $this->name = $reqestArray['name'];
        $this->iconName = $reqestArray['iconName'];
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
