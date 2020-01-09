<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * @param object $class
     * @param string $property
     * @param string $value
     * @throws \ReflectionException
     */
    public function setPrivateVariable($class, $property, $value): void
    {
        $reflection = new \ReflectionClass($class);
        $property = $reflection->getProperty($property);
        $property->setAccessible(true);
        $property->setValue($class, $value);
    }
}
