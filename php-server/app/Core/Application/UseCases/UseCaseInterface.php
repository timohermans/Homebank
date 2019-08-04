<?php


namespace App\Core\Application\UseCases;


interface UseCaseInterface
{
    /**
     * @param array|null|string $request
     * @return mixed can be anything
     */
    public function execute($request);
}
