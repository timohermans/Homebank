<?php

namespace App\Features\CategoryGroups\CreateCategoryGroup;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryGroupCommand extends FormRequest
{
    /** @var string ID when created */
    public $createdId;

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
            'name' => 'required'
        ];
    }
}
