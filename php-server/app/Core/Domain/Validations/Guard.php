<?php


namespace App\Core\Domain\Validations;


class Guard
{
    public static function againstEmptyString(string $value)
    {
         if (!isset($value) || trim($value) == '') {
             throw new EntityValidationException($value);
         }
    }
}
