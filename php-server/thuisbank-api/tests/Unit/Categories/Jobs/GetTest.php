<?php

namespace Tests\Unit\Categories\Jobs;

use App\Entities\Category;
use App\Jobs\Categories\Get\GetJob;
use App\Repositories\CategoryRepositoryInterface;
use Mockery;
use Tests\TestCase;

class GetTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $repo = Mockery::mock(CategoryRepositoryInterface::class);
        $repo->shouldReceive('find')->with('c_1')->andReturns(new Category('hallo', 'derp'));

        $job = new GetJob('c_1');
        $category = $job->handle($repo);

        $this->assertEquals($category->getName(), 'hallo');
    }
}
