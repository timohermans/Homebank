<?php

namespace App\Http\Controllers;

use App\Entities\Entity;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     *
     * @param Entity|Entity[] $result
     * @return array
     */
    public function toJson($result)
    {
        if (is_array($result)) {
            return array_map(function ($item) {
                return $item->asArray();
            }, $result);
        }

        return $result->asArray();
    }

    /**
     * @param mixed $result
     * @return int|Illuminate\Http\JsonResponse
     */
    public function toEntityResponse($result)
    {
        if (!is_array($result) && $result === null) {
            return response()->status(404);
        }

        return response()->json($this->toJson($result));
    }
}
