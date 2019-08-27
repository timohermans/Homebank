<?php

namespace App\Features\CategoryGroups;


use App\Core\Domain\Validations\Guard;

class CategoryGroup
{
    /** @var string */
    protected $id;
    /** @var string */
    protected $name;
    /** @var Category[] */
    protected $categories;

    private function __construct()
    {
    }

    public static function create(string $name): CategoryGroup {
        Guard::againstEmptyString($name);

        $group = new CategoryGroup();
        $group->name = $name;

        return $group;
    }

    /**
     * @return string id
     */
    public function getId() {
        return $this->id;
    }
}
