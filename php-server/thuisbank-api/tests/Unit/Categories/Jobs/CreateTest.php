<?php

namespace Tests\Unit\Categories\Jobs;

use App\Entities\Category;
use App\Jobs\Categories\Create\CreateCommand;
use App\Jobs\Categories\Create\CreateJob;
use App\Jobs\Categories\Create\CreateResponse;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\UnitOfWorkInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Mockery;
use Mockery\MockInterface;

class CreateTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     * @throws \App\Exceptions\EntityValidationException
     */
    public function testSuccessfullyCreates()
    {
        $command = new CreateCommand(['name' => 'category 1', 'iconName' => 'purse']);

        $job = new CreateJob($command);

        /** @var CategoryRepositoryInterface&MockInterface */
        $repoMock = Mockery::mock(CategoryRepositoryInterface::class);
        $repoMock->shouldReceive('findByName')->andReturns(null);
        $repoMock->shouldReceive('save')->with(Mockery::on(function ($categoryToSave) {
            return $categoryToSave->isEqual(new Category('category 1', 'purse'));
        }));
        $uowMock = $this->mock(UnitOfWorkInterface::class, function ($mock) {
            $mock->shouldReceive('save');
        });

        /** @var CreateResponse $result */
        $result = $job->handle($repoMock, $uowMock);

        $this->assertEquals($result->getName(), 'category 1');
        $this->assertEquals($result->getIconName(), 'purse');
    }
}
