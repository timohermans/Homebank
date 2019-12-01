<?php

namespace Tests\Unit\Transactions\Jobs;

use App\Jobs\Transactions\Upload\UploadCommand;
use App\Entities\Transaction;
use App\Jobs\Transactions\Upload\UploadJob;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\QueryBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class UploadTest extends TestCase
{
    /** @test */
    public function testUploadingACorrectFile()
    {
        $file = new UploadedFile('/var/www/tests/Data/dummy.csv', 'dummy.csv');
        $expectedAlreadyPersistedTransaction = new Transaction(new \DateTime('2019-09-01'), 'SPY*Parking Atrium B.V Heerlen', null, 'Betaalautomaat 22:04 pasnr. 008', 4.6, 0, true, true);

        $qbMock = \Mockery::mock(QueryBuilder::class);
        $qbMock->allows([
            'setParameter' => $qbMock,
            'getResult' => [$expectedAlreadyPersistedTransaction]
        ]);

        $emMock = \Mockery::mock(EntityManager::class);
        $emMock->shouldReceive('flush');
        $emMock->allows()->createQuery("
            select t
            from App\Features\Transactions\Transaction t
            where t.date > :minDate and t.date < :maxDate
        ")->andReturns($qbMock);

        $emMock->shouldReceive('persist')->with(\Mockery::on(function ($arg) {
            $expectedTransactionsToInsert = [
                new Transaction(new \DateTime('2019-09-01'), 'J.M.G. Kerkhoffs eo', null, 'Spotify', 0, 2.5, true, true),
                new Transaction(new \DateTime('2019-09-01'), 'ABN AMRO Bank NV', null, '000126428870 0030004357616765 WINDRAAK31 BV NL40INGB0006724892 x3866 pasnr.008', 47.6, 0, true, true)
            ];

            /** @var Transaction $expectedTransaction */
            foreach ($expectedTransactionsToInsert as $expectedTransaction) {
                if ($expectedTransaction->isEqual($arg)) {
                    return true;
                }
            }

            return false;
        }));

        $job = new UploadJob(new UploadCommand($file));

        $result = $job->handle($emMock);

        $this->assertEquals(2, $result);
    }
}
