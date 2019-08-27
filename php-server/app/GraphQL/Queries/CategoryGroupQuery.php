<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;


use App\Features\CategoryGroups\CategoryGroup;
use Closure;
use App\User;
use Doctrine\ORM\EntityManager;
use Prooph\ServiceBus\CommandBus;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\SelectFields;

class CategoryGroupQuery extends Query
{
    private $entityManager;

    protected $attributes = [
        'name' => 'categoryGroup query',
        'description' => 'A query'
    ];

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('CategoryGroup'));
    }

    public function args(): array
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::string()],
            'name' => ['name' => 'name', 'type' => Type::string()],
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        /** @var SelectFields $fields */
        $fields = $getSelectFields();
        $select = $fields->getSelect();
        $with = $fields->getRelations();

        $repo = $this->entityManager->getRepository(CategoryGroup::class);

        $categories = $repo->findBy($args);

        $result = array_map(function($category) {
            /** @var CategoryGroup $category */
            return $category->asArray();
        }, $categories);

        return $result;
    }
}
