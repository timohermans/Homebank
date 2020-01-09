<?php

namespace Tests\Feature;

use App\Domain\Entities\Category;
use App\Domain\Entities\Transaction;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Transactions\Update\UpdateCommand;
use App\Jobs\Transactions\Update\UpdateResponse;
use App\Jobs\Transactions\Upload\UploadResponse;
use Carbon\Carbon;
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

        $response = $this->post('/api/transaction/upload', ['file' => $file]);

        $response->assertStatus(200);
        $response->assertJson(['amountInserted' => 10, 'amountDuplicate' => 2]);
    }

    public function testUpdateTransaction()
    {
        // arrange
        $category = new Category('verplicht', 'person');
        $this->setPrivateVariable($category, 'id', 'xyz-rst-uvw');

        $transaction = new Transaction(Carbon::today(), 'J.M.G. Kerkhoffs eo', $category, 'Spotify', '0.00', '2.50', true, true);
        $transactionId = 'abc-def-ghi';
        $this->setPrivateVariable($transaction, 'id', 'abc-def-ghi');

        $response = new UpdateResponse($transaction);

        $params = ['id' => $transaction->getId(), 'categoryId' => $category->getId()];

        $this->mock(JobAdapterInterface::class, function ($mock) use ($category, $transaction) {
            $transaction->assignCategory($category);
            $mock->shouldReceive('dispatchNow')->andReturns(new UpdateResponse($transaction));
        });

        // act
        $response = $this->put("/api/transaction/$transactionId", $params);

        // assert
        $response->assertStatus(200);
        $response->assertJson([
            'id' => $transactionId,
            'category' => [
                'id' => 'xyz-rst-uvw',
                'name' => 'verplicht',
                'iconName' => 'person'
            ]
        ]);
    }
}
