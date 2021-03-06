<?php

namespace DoctrineProxies\__CG__\App\Domain\Entities;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class Transaction extends \App\Domain\Entities\Transaction implements \Doctrine\ORM\Proxy\Proxy
{
    /**
     * @var \Closure the callback responsible for loading properties in the proxy object. This callback is called with
     *      three parameters, being respectively the proxy object to be initialized, the method that triggered the
     *      initialization process and an array of ordered parameters that were passed to that method.
     *
     * @see \Doctrine\Common\Proxy\Proxy::__setInitializer
     */
    public $__initializer__;

    /**
     * @var \Closure the callback responsible of loading properties that need to be copied in the cloned object
     *
     * @see \Doctrine\Common\Proxy\Proxy::__setCloner
     */
    public $__cloner__;

    /**
     * @var boolean flag indicating if this object was already initialized
     *
     * @see \Doctrine\Common\Persistence\Proxy::__isInitialized
     */
    public $__isInitialized__ = false;

    /**
     * @var array properties to be lazy loaded, with keys being the property
     *            names and values being their default values
     *
     * @see \Doctrine\Common\Proxy\Proxy::__getLazyProperties
     */
    public static $lazyPropertiesDefaults = [];



    /**
     * @param \Closure $initializer
     * @param \Closure $cloner
     */
    public function __construct($initializer = null, $cloner = null)
    {

        $this->__initializer__ = $initializer;
        $this->__cloner__      = $cloner;
    }







    /**
     * 
     * @return array
     */
    public function __sleep()
    {
        if ($this->__isInitialized__) {
            return ['__isInitialized__', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'id', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'date', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'payee', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'memo', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'outflow', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'inflow', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'isBankTransaction', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'isInflowForBudgeting', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'category'];
        }

        return ['__isInitialized__', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'id', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'date', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'payee', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'memo', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'outflow', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'inflow', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'isBankTransaction', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'isInflowForBudgeting', '' . "\0" . 'App\\Domain\\Entities\\Transaction' . "\0" . 'category'];
    }

    /**
     * 
     */
    public function __wakeup()
    {
        if ( ! $this->__isInitialized__) {
            $this->__initializer__ = function (Transaction $proxy) {
                $proxy->__setInitializer(null);
                $proxy->__setCloner(null);

                $existingProperties = get_object_vars($proxy);

                foreach ($proxy->__getLazyProperties() as $property => $defaultValue) {
                    if ( ! array_key_exists($property, $existingProperties)) {
                        $proxy->$property = $defaultValue;
                    }
                }
            };

        }
    }

    /**
     * 
     */
    public function __clone()
    {
        $this->__cloner__ && $this->__cloner__->__invoke($this, '__clone', []);
    }

    /**
     * Forces initialization of the proxy
     */
    public function __load()
    {
        $this->__initializer__ && $this->__initializer__->__invoke($this, '__load', []);
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __isInitialized()
    {
        return $this->__isInitialized__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitialized($initialized)
    {
        $this->__isInitialized__ = $initialized;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitializer(\Closure $initializer = null)
    {
        $this->__initializer__ = $initializer;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __getInitializer()
    {
        return $this->__initializer__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setCloner(\Closure $cloner = null)
    {
        $this->__cloner__ = $cloner;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific cloning logic
     */
    public function __getCloner()
    {
        return $this->__cloner__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     * @static
     */
    public function __getLazyProperties()
    {
        return self::$lazyPropertiesDefaults;
    }

    
    /**
     * {@inheritDoc}
     */
    public function assignCategory(\App\Domain\Entities\Category $category)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'assignCategory', [$category]);

        return parent::assignCategory($category);
    }

    /**
     * {@inheritDoc}
     */
    public function getId(): string
    {
        if ($this->__isInitialized__ === false) {
            return  parent::getId();
        }


        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getId', []);

        return parent::getId();
    }

    /**
     * {@inheritDoc}
     */
    public function getDate(): \Carbon\Carbon
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getDate', []);

        return parent::getDate();
    }

    /**
     * {@inheritDoc}
     */
    public function getPayee(): string
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getPayee', []);

        return parent::getPayee();
    }

    /**
     * {@inheritDoc}
     */
    public function getMemo(): string
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getMemo', []);

        return parent::getMemo();
    }

    /**
     * {@inheritDoc}
     */
    public function getOutflow(): string
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getOutflow', []);

        return parent::getOutflow();
    }

    /**
     * {@inheritDoc}
     */
    public function getInflow(): string
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getInflow', []);

        return parent::getInflow();
    }

    /**
     * {@inheritDoc}
     */
    public function isEqual($other): bool
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'isEqual', [$other]);

        return parent::isEqual($other);
    }

    /**
     * {@inheritDoc}
     */
    public function getCategory(): ?\App\Domain\Entities\Category
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getCategory', []);

        return parent::getCategory();
    }

    /**
     * {@inheritDoc}
     */
    public function asArray()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'asArray', []);

        return parent::asArray();
    }

}
