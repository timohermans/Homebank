<?php

namespace App\Core\Http\Controllers;

use App\Core\Domain\Entities\Transaction;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected $em;
    protected $transactionRepo;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->transactionRepo = $em->getRepository(Transaction::class);
    }

    public function index(Request $requestInput): iterable
    {
        return $this->transactionRepo->findAll();
    }
}
