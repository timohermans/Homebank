<?php

namespace App\Http\Controllers;

use App\Domain\Entities\Transaction;
use App\Http\Requests\Transactions\AssignCategoryToTransactionRequest;
use App\Http\Requests\Transactions\UpdateTransactionRequest;
use App\Http\Requests\Transactions\UploadTransactionCommand;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Transactions\AssignCategory\AssignCategoryJob;
use App\Jobs\Transactions\Update\UpdateJob;
use App\Jobs\Transactions\Upload\UploadJob;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use ReflectionException;

class TransactionController extends Controller
{
    /** @var JobAdapterInterface */
    private $dispatcher;
    /** @var EntityManager */
    private $em;
    /** @var EntityRepository */
    private $repository;

    public function __construct(JobAdapterInterface $dispatcher, EntityManager $entityManager)
    {
        $this->dispatcher = $dispatcher;
        $this->em = $entityManager;
        $this->repository = $entityManager->getRepository(Transaction::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Illuminate\Http\JsonResponse|int
     */
    public function index()
    {
        $transactions = $this->repository->findAll();

        return $this->toEntityResponse($transactions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     * @throws ReflectionException
     */
    public function upload(UploadTransactionCommand $request)
    {
        $result = $this->dispatcher->dispatchNow(UploadJob::class, $request->getDto());

        return response()->json($result->asArray());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Illuminate\Http\JsonResponse|int
     */
    public function show($id)
    {
        $transaction = $this->repository->find($id);

        return $this->toEntityResponse($transaction);
    }

    /**
     * @param UpdateTransactionRequest $request
     * @param $id
     * @return JsonResponse
     * @throws ReflectionException
     */
    public function update(UpdateTransactionRequest $request, $id)
    {
        $result = $this->dispatcher->dispatchNow(UpdateJob::class, $request->getDto());

        return response()->json($result->asArray());
    }

    /**
     * @param AssignCategoryToTransactionRequest $request
     * @return ResponseFactory|Response
     */
    public function assignCategory(AssignCategoryToTransactionRequest $request)
    {
        $result = $this->dispatcher->dispatchNow(AssignCategoryJob::class, $request->getDto());

        return response('', 204);
    }

    /**
     * @param string $id
     */
    public function getSimilar(string $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
