<?php


namespace App\Features\Categories\CreateCategory;


use App\Features\Categories\Category;
use App\Features\CategoryGroups\CategoryGroup;
use Doctrine\ORM\EntityManager;

class CreateCategoryUseCase implements CreateCategoryUseCaseInterface
{

    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param array $request the nice php request
     * @return mixed whatever the usecase is supposed to do
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    function execute(array $request)
    {
        $categoryGroup = $this->handleCategoryGroup($request['groupName']);
        $category = new Category($request['name'], $categoryGroup);

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        return $category;
    }

    /**
     * @param string $categoryGroupName
     * @return CategoryGroup categoryGroup
     */
    private function handleCategoryGroup($categoryGroupName)
    {
        $groupRepo = $this->entityManager->getRepository(CategoryGroup::class);
        $categoryGroup = $groupRepo->findOneBy(array('name' => $categoryGroupName));
        if (is_null($categoryGroup)) {
            $categoryGroup = CategoryGroup::create($categoryGroupName);
        }

        return $categoryGroup;
    }
}
