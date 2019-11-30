<?php

namespace App\Jobs\Categories;

use App\Entities\Category;
use App\Repositories\CategoryRepositoryInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Doctrine\ORM\EntityManager;

class Get implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var string */
    private $id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @param TransactionRepositoryInterface $repository
     *
     * @return void
     */
    public function handle($repository)
    {
        return $repository->find($this->id);
    }
}
