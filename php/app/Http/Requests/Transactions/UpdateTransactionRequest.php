<?php

namespace App\Http\Requests\Transactions;

use App\Http\Requests\CommandInterface;
use App\Jobs\Transactions\Update\UpdateCommand;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest implements CommandInterface
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
            'id' => 'string|required',
            'categoryId' => 'string|required'
        ];
    }

    /**
     * @return UploadTransactionCommand
     */
    public function getDto(): UpdateCommand
    {
        return null;
//        return new UpdateCommand($this->all());
    }
}
