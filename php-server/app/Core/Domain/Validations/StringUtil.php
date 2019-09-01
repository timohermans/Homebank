<?php


namespace App\Core\Domain\Validations;


class StringUtil
{
    public static function isEmpty($value)
    {
        return !isset($value) || trim($value) === '';
    }
}
