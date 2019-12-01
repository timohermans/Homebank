<?php

namespace App\Jobs\Categories\Get;

use App\Entities\Category;
use App\Repositories\CategoryRepositoryInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Doctrine\ORM\EntityManager;

class GetJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var string */
    private $id;

    /**
     * Create a new job instance.
     *
     * @param $id
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @param CategoryRepositoryInterface $repository
     *
     * @return Category
     */
    public function handle(CategoryRepositoryInterface $repository)
    {
        return $repository->find($this->id);
    }
}
