<?php

namespace Tests\Unit\Transactions\Jobs;

use App\Jobs\Transactions\Upload\AssignCategoryCommand as UpdateCommand;
use App\Jobs\Transactions\Upload\UpdateJob as UpdateJob;
use App\Repositories\CategoryRepositoryInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery\MockInterface;
use Tests\TestCase;

class UpdateTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testAssingingCategory()
    {
        // arrange
        /** @var CategoryRepositoryInterface&MockInterface */
        $categoryRepositoryMock = $this->mock(CategoryRepositoryInterface::class);

        $request = new UpdateCommand([
            'id' => 'abc-def-ghi',
            'categoryId' => 'xyz-rst-uvw'
        ]);

        $job = new UpdateJob($request);

        // act

        // assert
    }
}
