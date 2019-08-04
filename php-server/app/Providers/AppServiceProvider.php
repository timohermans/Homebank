<?php

namespace App\Providers;

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
        $this->app->bind(CreateCategoryUseCaseInterface::class, CreateCategoryUseCase::class);
        $this->app->bind(CreateCategoryGroupUseCaseInterface::class, CreateCategoryGroupUseCase::class);
//        $this->app->bind(CreateCategoryGroupUseCaseInterface::class, function () {
//            return new CreateCategoryGroupUseCase($this->app->make(EntityManagerInterface::class));
//        });
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
