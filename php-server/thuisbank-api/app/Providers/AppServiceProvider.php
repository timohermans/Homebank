<?php

namespace App\Providers;

use App\Infrastructure\JobAdapter;
use App\Infrastructure\JobAdapterInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\CategoryRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        CategoryRepositoryInterface::class => CategoryRepository::class,
        JobAdapterInterface::class => JobAdapter::class
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
