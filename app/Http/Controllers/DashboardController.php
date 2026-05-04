<?php

namespace App\Http\Controllers;

use App\Models\Orcamento;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return inertia('dashboard', [
            'statusCounts' => Orcamento::getCountsByStatus(),
            'budgetsByMonth' => Orcamento::getBudgetsByMonth(),
        ]);
    }
}
