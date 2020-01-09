<?php

namespace App\Http\Requests\Transactions;

use App\Domain\Models\IdCollection;
use App\Http\Requests\CommandInterface;
use App\Jobs\Transactions\AssignCategory\AssignCategoryCommand;
use Illuminate\Foundation\Http\FormRequest;

class AssignCategoryToTransactionRequest extends FormRequest implements CommandInterface
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
            'transactionIds' => 'required|array',
            'categoryId' => 'required|string'
        ];
    }

    function getDto()
    {
        $body = $this->all();

        return new AssignCategoryCommand(new IdCollection(...$body['transactionIds']), $body['categoryId']);
    }
}
