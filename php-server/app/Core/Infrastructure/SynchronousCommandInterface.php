<?php


namespace App\Core\Infrastructure;


interface SynchronousCommandInterface
{
    public function getResult($value);
}
