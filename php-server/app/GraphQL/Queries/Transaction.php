<?php

namespace App\GraphQL\Queries;

use App\Features\Categories\Category;
use App\Features\Transactions\Transaction as TransactionEntity;
use Doctrine\ORM\EntityManager;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use function Doctrine\ORM\QueryBuilder;

class Transaction
{
    /** @var EntityManager */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param mixed[] $args The arguments that were passed into the field.
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext $context Arbitrary data that is shared between all fields of a single query.
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $fields = $resolveInfo->getFieldSelection(5);

        $qb = $this->entityManager->createQueryBuilder()
            ->select('t')
            ->from(TransactionEntity::class, 't');

        if (isset($fields['category'])) {
            $qb = $qb->leftJoin('t.category', 'c')
                ->addSelect('c'); // eager load the category group
        }

        $qb = $qb->where($qb->expr()->eq('t.id', ':id'))
            ->setParameter('id', $args['id']);

        $qb = $qb->getQuery()
            ->getArrayResult();

        return $qb[0];
    }
}
