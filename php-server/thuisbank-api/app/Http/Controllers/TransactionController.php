<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadTransactionCommand;
use App\Infrastructure\JobAdapterInterface;
use App\Jobs\Transactions\Upload\UploadCommand;
use App\Jobs\Transactions\Upload\UploadJob;
use App\Jobs\Transactions\Upload\UploadResponse;
use Illuminate\Bus\Dispatcher;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /** @var UploadJob */
    private $job;
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
        return 'yo';
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
     * @throws \ReflectionException
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
