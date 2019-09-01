<?php


namespace App\Features\CategoryGroups\CreateCategoryGroup;


use App\Exceptions\EntityValidationException;
use App\Features\CategoryGroups\CategoryGroup;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManager;

class CreateCategoryGroupUseCase
{
    /**
     * @var EntityManager
     */
    private $entityManager;
    private $repo;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repo = $entityManager->getRepository(CategoryGroup::class);
    }

    public function __invoke(CreateCategoryGroupCommand $command)
    {
        $group = $this->repo->findOneBy(array('name' => $command->get('name')));

        if (isset($group)) {
            throw new EntityValidationException('Group already exists');
        }

        $group = CategoryGroup::create($command->get('name'));
        $this->entityManager->persist($group);
        $this->entityManager->flush();

        $command->createdId = $group->getId();
    }
}
