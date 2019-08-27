<?php

namespace App\Core\Providers;

use App\Core\Application\UseCases\Category\CreateCategoryUseCase;
use App\Core\Application\UseCases\Category\CreateCategoryUseCaseInterface;
use App\Core\Application\UseCases\CategoryGroup\CreateCategoryGroupUseCase;
use App\Core\Application\UseCases\CategoryGroup\CreateCategoryGroupUseCaseInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
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
