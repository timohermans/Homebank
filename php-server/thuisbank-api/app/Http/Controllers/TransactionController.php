<?php

namespace App\Http\Controllers;

use App\Entities\Transaction;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Requests\UploadTransactionCommand;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Transactions\Update\UpdateJob;
use App\Jobs\Transactions\Upload\UploadCommand;
use App\Jobs\Transactions\Upload\UploadJob;
use App\Jobs\Transactions\Upload\UploadResponse;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Illuminate\Bus\Dispatcher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
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
