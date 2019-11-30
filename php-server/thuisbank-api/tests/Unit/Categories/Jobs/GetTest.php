<?php

namespace Tests\Unit\Categories\Jobs;

use App\Jobs\Categories\Get;
use App\Repositories\CategoryRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\QueryBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
        $job = new Get('c_1');
        $job->handle($repo);
        $this->assertTrue(true);
    }
}
