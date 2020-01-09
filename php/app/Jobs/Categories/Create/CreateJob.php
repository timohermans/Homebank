<?php

namespace App\Jobs\Categories\Create;

use App\Domain\Entities\Category;
use App\Exceptions\EntityValidationException;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\UnitOfWorkInterface;
use Doctrine\ORM\EntityManager;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * @var CreateCommand
     */
    private $command;
    /**
     * @var CategoryRepositoryInterface
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param CreateCommand $command
     */
    public function __construct(CreateCommand $command)
    {
        $this->command = $command;
    }

    /**
     * Execute the job.
     *
     * @param CategoryRepositoryInterface $repository
     * @param UnitOfWorkInterface $unitOfWork
     * @return CreateResponse
     * @throws EntityValidationException
     */
    public function handle(CategoryRepositoryInterface $repository, UnitOfWorkInterface $unitOfWork): CreateResponse
    {
        $this->repository = $repository;

        $category = new Category($this->command->getName(), $this->command->getIconName());

        $dbCategory = $this->repository->findByName($category->getName());
        if ($dbCategory !== null) {
            throw new EntityValidationException('Category already exists');
        }

        $this->repository->save($category);
        $unitOfWork->save();

        return new CreateResponse($category);
    }
}
