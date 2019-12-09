<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCategoryFormRequest;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Categories\Create\CreateJob;
use App\Jobs\Categories\Get\GetJob;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /** @var JobAdapterInterface */
    private $dispatcher;

    public function __construct(JobAdapterInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws \ReflectionException
     */
    public function store(CreateCategoryFormRequest $request)
    {
        $response = $this->dispatcher->dispatchNow(CreateJob::class, $request->getDto());

        return response()->json($response->asArray(), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = GetJob::dispatchNow($id);
        return response()->json($category->asArray());
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
