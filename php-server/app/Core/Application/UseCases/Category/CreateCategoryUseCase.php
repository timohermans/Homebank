<?php


namespace App\Core\Application\UseCases\Category;


use App\Core\Application\UseCases\UseCaseInterface;
use Doctrine\ORM\EntityManagerInterface;

class CreateCategoryUseCase implements CreateCategoryUseCaseInterface
{
    /** @var EntityManagerInterface */
    protected $em;

    public function __construct()
    {
    }

    /**
     * @param array|null|string $request
     * @return mixed can be anything
     */
    public function execute($request)
    {
        // TODO: Implement execute() method.
    }
}
