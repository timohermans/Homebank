<?php


namespace App\CategoryGroups\CreateCategoryGroup;


use App\CategoryGroups\CategoryGroup;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManager;

class CreateCategoryGroupHandler
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(CreateCategoryGroupCommand $command)
    {
        $group = new CategoryGroup($command->get('name'));
        $this->entityManager->persist($group);
        $this->entityManager->flush();

        $command->createdId = $group->getId();
    }
}
