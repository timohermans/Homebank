<?php

namespace App\Jobs\Transactions\AssignCategory;

use App\Domain\Entities\Transaction;
use App\Http\Requests\Transactions\AssignCategoryToTransactionRequest;
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

class AssignCategoryJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * @var AssignCategoryCommand
     */
    private AssignCategoryCommand $command;

    /**
     * Create a new job instance.
     *
     * @param AssignCategoryCommand $command
     */
    public function __construct(AssignCategoryCommand $command)
    {
        //
        $this->command = $command;
    }

    /**
     * Execute the job.
     *
     * @param TransactionRepositoryInterface $transactionRepository
     * @param CategoryRepositoryInterface $categoryRepository
     * @param UnitOfWorkInterface $unitOfWork
     * @throws AssertionFailedException
     */
    public function handle(TransactionRepositoryInterface $transactionRepository, CategoryRepositoryInterface $categoryRepository, UnitOfWorkInterface $unitOfWork): void
    {
        $transactions = $transactionRepository->findBy($this->command->getTransactionIds());
        $category = $categoryRepository->find($this->command->getCategoryId());

        Assertion::notEmpty($transactions);
        Assertion::notNull($category);

        /** @var Transaction $transaction */
        foreach ($transactions as $transaction) {
            $transaction->assignCategory($category);
        }

        $unitOfWork->save();
    }
}
