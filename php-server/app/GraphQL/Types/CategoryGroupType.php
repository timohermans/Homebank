<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class CategoryGroupType extends GraphQLType
{
    protected $attributes = [
        'name' => 'CategoryGroup',
        'description' => 'Used for categorizing the main groups of transactions/budgets'
    ];

    public function fields(): array
    {
        return [ // use gqlf as snippet
            'id' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'the primary key'
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'the name of the group'
            ]
        ];
    }
}
