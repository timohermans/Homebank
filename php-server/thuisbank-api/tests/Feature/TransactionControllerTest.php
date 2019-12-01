<?php

namespace Tests\Feature;

use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Transactions\Upload\UploadResponse;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class TransactionControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testUploadFileForTransactions()
    {
        $this->mock(JobAdapterInterface::class, function ($mock) {
            $mock->shouldReceive('dispatchNow')->andReturns(new UploadResponse(10, 2));
        });

        $file = UploadedFile::fake()->create('super.csv');

        $response = $this->post( '/api/transaction/upload', ['file' => $file]);

        $response->assertStatus(200);
        $response->assertJson(['amountInserted' => 10, 'amountDuplicate' => 2]);
    }
}
