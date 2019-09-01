<?php

namespace App\GraphQL\Mutations;

use App\Features\Categories\Category;
use App\Features\Categories\CreateCategory\CreateCategoryUseCaseInterface;
use Doctrine\ORM\EntityManager;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Prooph\ServiceBus\CommandBus;

class CreateCategory
{
    /**
     * @var CreateCategoryUseCaseInterface
     */
    private $useCase;

    public function __construct(CreateCategoryUseCaseInterface $useCase)
    {
        $this->useCase = $useCase;
    }

    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param mixed[] $args The arguments that were passed into the field.
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext $context Arbitrary data that is shared between all fields of a single query.
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     * @throws \ReflectionException
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        /** @var Category $category */
        $category = $this->useCase->execute($args);

        return $category->asArray();
    }
}
