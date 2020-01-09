<?php

namespace App\Jobs\Transactions\Update;

use App\Domain\Entities\Transaction;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\TransactionRepositoryInterface;
use App\Repositories\UnitOfWorkInterface;
use Assert\Assertion;
use Assert\AssertionFailedException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var UpdateCommand */
    private $command;

    /**
     * Create a new job instance.
     * @param UpdateCommand $command
     */
    public function __construct(UpdateCommand $command)
    {
        $this->command = $command;
    }

    /**
     * @param CategoryRepositoryInterface $repo
     * @param TransactionRepositoryInterface $transactionRepo
     * @param UnitOfWorkInterface $unitOfWork
     * @return UpdateResponse
     * @throws AssertionFailedException
     */
    public function handle(CategoryRepositoryInterface $repo, TransactionRepositoryInterface $transactionRepo, UnitOfWorkInterface $unitOfWork)
    {
        $transaction = $transactionRepo->find($this->command->getId());
        $category = $repo->find($this->command->getCategoryId());

        Assertion::notNull($transaction);
        Assertion::notNull($category);

        $transaction->assignCategory($category);

        $unitOfWork->save();

        return new UpdateResponse($transaction);
    }
}
