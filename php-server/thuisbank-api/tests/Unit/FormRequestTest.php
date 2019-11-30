<?php

namespace Tests\Unit;

use App\Dto\UploadTransactionDto;
use App\Http\Requests\UploadTransactionCommand;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class FormRequestTest extends TestCase
{
    /** @test */
    public function mapRequestToDto()
    {
        $uploadedFile = UploadedFile::fake()->create('fake.csv');
        $request = new UploadTransactionCommand([], [], [], [], ['file' => $uploadedFile]);

        $dto = $request->getDto();

        $this->assertNotNull($dto->getFile());
    }
}
