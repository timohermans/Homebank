<?php

namespace App\Providers;

use App\Infrastructure\JobAdapter;
use App\Infrastructure\JobAdapterInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\TransactionRepository;
use App\Repositories\TransactionRepositoryInterface;
use App\Repositories\UnitOfWork;
use App\Repositories\UnitOfWorkInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        CategoryRepositoryInterface::class => CategoryRepository::class,
        TransactionRepositoryInterface::class => TransactionRepository::class,
        JobAdapterInterface::class => JobAdapter::class,
        UnitOfWorkInterface::class => UnitOfWork::class
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
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
