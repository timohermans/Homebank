<?php

namespace App\Core\Http\Controllers;

use App\Core\Application\UseCases\CategoryGroup\CreateCategoryGroupUseCaseInterface;
use Illuminate\Http\Request;

class CategoryGroupController extends Controller
{

    public function __construct(CreateCategoryGroupUseCaseInterface $createCategoryUseCase)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param CreateCategoryGroupUseCaseInterface $createGroupUseCase
     * @return void
     */
    public function store(Request $request, CreateCategoryGroupUseCaseInterface $createGroupUseCase)
    {
        dd($createGroupUseCase);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
