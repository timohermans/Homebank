<?php

namespace Tests\Unit\Transactions\Jobs;

use App\Entities\Category;
use App\Entities\Transaction;
use App\Jobs\Transactions\Update\UpdateCommand;
use App\Jobs\Transactions\Update\UpdateJob;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\TransactionRepositoryInterface;
use App\Repositories\UnitOfWorkInterface;
use Assert\AssertionFailedException;
use Carbon\Carbon;
use Mockery\MockInterface;
use ReflectionException;
use Tests\TestCase;

class UpdateTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     * @throws AssertionFailedException
     * @throws ReflectionException
     */
    public function testAssigningCategory()
    {
        // arrange
        $category = new Category('verplicht', 'person');
        $this->setPrivateVariable($category, 'id', 'xyz-rst-uvw');
        $transaction = new Transaction(Carbon::today(), 'J.M.G. Kerkhoffs eo', $category, 'Spotify', '0.00', '2.50', true, true);
        $this->setPrivateVariable($transaction, 'id', 'abc-def-ghi');

        /** @var CategoryRepositoryInterface $categoryRepositoryMock */
        $categoryRepositoryMock = $this->mock(CategoryRepositoryInterface::class, function (MockInterface $mock) use ($category) {
            $mock->shouldReceive('find')->with('xyz-rst-uvw')->andReturn($category);
        });
        /** @var TransactionRepositoryInterface $transactionRepositoryMock */
        $transactionRepositoryMock = $this->mock(TransactionRepositoryInterface::class, function (MockInterface $mock) use ($transaction) {
            $mock->shouldReceive('find')->with('abc-def-ghi')->andReturn($transaction);
        });
        /** @var UnitOfWorkInterface $unitOfWork */
        $unitOfWork = $this->mock(UnitOfWorkInterface::class, function(MockInterface $mock) {
            $mock->shouldReceive('save');
        });

        $request = new UpdateCommand([
            'id' => 'abc-def-ghi',
            'categoryId' => 'xyz-rst-uvw'
        ]);

        $job = new UpdateJob($request);

        // act
        $result = $job->handle($categoryRepositoryMock, $transactionRepositoryMock, $unitOfWork);

        // assert
        $this->assertNotNull($result->getCategory());
    }
}
