<?php

namespace App\Http\Requests;

use App\Jobs\Categories\Create\CreateCommand;
use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryFormRequest extends FormRequest implements CommandInterface
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
            'name' => 'required|string',
            'iconName' => 'required|string'
        ];
    }

    function getDto()
    {
        return new CreateCommand($this->request->all());
    }
}
