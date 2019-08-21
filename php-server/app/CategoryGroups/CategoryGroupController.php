<?php


namespace App\CategoryGroups;


use App\CategoryGroups\CreateCategoryGroup\CreateCategoryGroupCommand;
use App\Core\Application\UseCases\CategoryGroup\CreateCategoryGroupUseCaseInterface;
use App\Core\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Prooph\ServiceBus\CommandBus;
use Prooph\ServiceBus\Exception\CommandDispatchException;

class CategoryGroupController extends Controller
{
    /**
     * @var CommandBus
     */
    private $commandBus;

    /**
     * CategoryGroupController constructor.
     * @param CommandBus $commandBus
     */
    public function __construct(CommandBus $commandBus)
    {
        $this->commandBus = $commandBus;
    }

    public function index()
    {
        dd('index');
    }

    /**
     * Create a new category group
     * @param CreateCategoryGroupCommand $command
     */
    public function store(CreateCategoryGroupCommand $command)
    {
        $this->commandBus->dispatch($command);

        return $command->createdId;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        dd('show');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        dd('update');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        dd('destroy');
    }
}
