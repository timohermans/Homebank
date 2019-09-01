<?php

namespace App\Core\Domain\Traits;


use ReflectionClass;

trait ConverterTrait
{
    /**
     * Nicely converts the object to an array. It only uses getters.
     * E.g. a class with with 'getName() { return $this->name; }' will return { 'name' => 'name' }
     * @return array
     * @throws \ReflectionException
     */
    public function asArray()
    {
        $result = array();

        $clazz = new ReflectionClass(__CLASS__);
        foreach ($clazz->getMethods() as $method) {
            if (substr($method->name, 0, 3) == 'get') {
                $propName = strtolower(substr($method->name, 3, 1)) . substr($method->name, 4);

                $result[$propName] = $method->invoke($this);
            }
        }

        return $result;
    }
}
