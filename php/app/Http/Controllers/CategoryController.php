<?php

namespace App\Http\Controllers;

use App\Domain\Entities\Category;
use App\Http\Requests\Transactions\CreateCategoryFormRequest;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Categories\Create\CreateJob;
use App\Jobs\Categories\Get\GetJob;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /** @var JobAdapterInterface */
    private $dispatcher;
    /** @var EntityRepository */
    private $repository;

    public function __construct(JobAdapterInterface $dispatcher, EntityManager $entityManager)
    {
        $this->dispatcher = $dispatcher;
        $this->repository = $entityManager->getRepository(Category::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Illuminate\Http\JsonResponse|int
     */
    public function index()
    {
        $categories = $this->repository->findAll();

        return $this->toEntityResponse($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
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
     * @return Illuminate\Http\JsonResponse|int
     */
    public function show($id)
    {
        $category = GetJob::dispatchNow($id);

        return $this->toEntityResponse($category);
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
