<?php


namespace App\Core\Domain\Validations;


use App\Exceptions\EntityValidationException;

class Guard
{
    public static function againstEmptyString(string $value)
    {
         if (!isset($value) || trim($value) == '') {
             throw new EntityValidationException("$value cannot be an empty string");
         }
    }

    public static function againstNull($value)
    {
        if (is_null($value)) {
            throw new EntityValidationException("$value cannot be null");
        }
    }

}
