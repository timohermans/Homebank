<?php


namespace App\Infrastructure;


use App\Jobs\JobResponse;

interface JobAdapterInterface
{
    function dispatchNow(string $jobClass, ...$args);
}
