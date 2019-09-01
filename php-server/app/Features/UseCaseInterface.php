<?php


namespace App\Features;


interface UseCaseInterface
{
    /**
     * @param array $request the nice php request
     * @return mixed whatever the usecase is supposed to do
     */
    function execute(array $request);
}
