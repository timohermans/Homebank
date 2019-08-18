<?php


namespace App\CategoryGroups\CreateCategoryGroup;


use App\CategoryGroups\CategoryGroup;
use Doctrine\ORM\EntityManager;

class CreateCategoryGroupHandler
{
    /**
     * @var EntityManager
     */
    private $entityManager;
    private $repo;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->entityManager->getRepository(CategoryGroup::class);
    }

    public function __invoke(CreateCategoryGroupCommand $command)
    {
        $group = new CategoryGroup($command->get('name'));


        $command->createdId = 'hohoho';
    }
}
