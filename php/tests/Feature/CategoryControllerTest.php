<?php

namespace Tests\Feature;

use App\Domain\Entities\Category;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Categories\Create\CreateResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     * @throws \ReflectionException
     */
    public function testCreateCategory()
    {
        $name = 'verplicht';
        $iconName = 'user';
        $createdCategory = new CreateResponse(new Category($name, $iconName));
        $this->setPrivateVariable($createdCategory, 'id', 'abc-def');

        $this->mock(JobAdapterInterface::class, function ($mock) use ($createdCategory) {
            $mock->shouldReceive('dispatchNow')->andReturns($createdCategory);
        });

        $response = $this->post( '/api/category', ['name' => 'verplicht', 'iconName' => 'user']);

        $response->assertStatus(201);
        $response->assertJson(['id' => 'abc-def', 'name' => $name, 'iconName' => $iconName]);
    }
}
