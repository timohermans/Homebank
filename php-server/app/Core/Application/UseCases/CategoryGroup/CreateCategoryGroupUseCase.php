<?php


namespace App\Core\Application\UseCases\CategoryGroup;

use App\Core\Domain\Entities\Transaction;
use Doctrine\ORM\EntityManagerInterface;

class CreateCategoryGroupUseCase implements CreateCategoryGroupUseCaseInterface
{
    /** @var EntityManagerInterface */
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @param array|null|string $request
     * @return mixed can be anything
     */
    public function execute($request)
    {
        // heuj het werkt 😊
    }
}
