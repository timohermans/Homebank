<?php

namespace App\Http\Requests\Transactions;

use App\Http\Requests\CommandInterface;
use App\Jobs\Transactions\Upload\UploadCommand;
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
     * @return UploadTransactionCommand
     */
    public function getDto(): UploadCommand
    {
        $file = $this->files->get('file');

        return new UploadCommand($file);
    }
}
