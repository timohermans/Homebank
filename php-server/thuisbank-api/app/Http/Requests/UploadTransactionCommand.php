<?php

namespace App\Http\Requests;

use App\Dto\UploadTransactionDto;
use Illuminate\Foundation\Http\FormRequest;

class UploadTransactionCommand extends FormRequest implements CommandInterface
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => 'required'
        ];
    }

    /**
     * @return UploadTransactionDto
     */
    public function getDto(): UploadTransactionDto
    {
        $file = $this->files->get('file');

        return new UploadTransactionDto($file);
    }
}
