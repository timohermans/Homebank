<?php

namespace Tests\Feature;

use App\Jobs\UploadTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
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
        Bus::fake();

        $file = UploadedFile::fake()->create('super.csv');

        $response = $this->post('/api/transaction/upload', ['file' => $file]);

        Bus::assertDispatched(UploadTransactions::class);

        $response->assertStatus(200);
    }
}
