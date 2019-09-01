<?php

namespace App\Core\Providers;

use App\Features\Categories\CreateCategory\CreateCategoryUseCase;
use App\Features\Categories\CreateCategory\CreateCategoryUseCaseInterface;
use App\Features\Transactions\UploadFromFile\UploadFromFileUseCase;
use App\Features\Transactions\UploadFromFile\UploadFromFileUseCaseInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        CreateCategoryUseCaseInterface::class => CreateCategoryUseCase::class,
        UploadFromFileUseCaseInterface::class => UploadFromFileUseCase::class
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //


    }
}
