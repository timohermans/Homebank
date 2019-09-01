<?php

namespace App\GraphQL\Mutations;

use App\Features\Transactions\UploadFromFile\UploadFromFileUseCaseInterface;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Http\File;
use League\Csv\Reader;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * See https://github.com/jaydenseric/graphql-multipart-request-spec for more info on how to upload the file
 * Class UploadTransactions
 * @package App\GraphQL\Mutations
 */
class UploadTransactions
{

    /**
     * @var UploadFromFileUseCaseInterface
     */
    private $useCase;

    public function __construct(UploadFromFileUseCaseInterface $useCase)
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
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $result = $this->useCase->execute($args);
        return $result;
    }
}
