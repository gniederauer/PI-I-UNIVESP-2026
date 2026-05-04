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
        $latestBudgets = Orcamento::query()
            ->latest('data_solicitacao')
            ->take(5)
            ->get()
            ->map(fn($orcamento) => [
                'id' => $orcamento->id,
                'cliente' => $orcamento->cliente->nome_empresa,
                'status' => str($orcamento->status->name)->title()->replace('_', ' ')->toString(),
                'dataSolicitacao' => $orcamento->data_solicitacao->format('d/m/Y'),
            ]);

        return inertia('dashboard', [
            'statusCounts' => Orcamento::getCountsByStatus(),
            'budgetsByMonth' => Orcamento::getBudgetsByMonth(),
            'latestBudgets' => $latestBudgets,
        ]);
    }
}
