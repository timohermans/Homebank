<?php


namespace App\Infrastructure;


use App\Jobs\JobResponse;
use Illuminate\Foundation\Bus\Dispatchable;

class JobAdapter implements JobAdapterInterface
{

    /**
     * @param string $jobClass The job to dispatch
     * @param mixed ...$args
     * @return JobResponse|null
     */
    function dispatchNow(string $jobClass, ...$args)
    {
        return call_user_func(array($jobClass, 'dispatchNow'), ...$args);
    }
}
