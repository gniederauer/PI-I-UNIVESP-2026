<?php

namespace App\Http\Controllers;

use App\Models\Orcamento;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return redirect()->route('orcamentos.index');
        }

        $orcamentos = Orcamento::with('cliente')
            ->latest('data_solicitacao')
            ->take(5)
            ->get()
            ->map(fn($orcamento) => [
                'id' => $orcamento->id,
                'nomeCliente' => $orcamento->cliente->nome_empresa,
                'cliente' => $orcamento->cliente,
                'status' => str($orcamento->status->name)->title()->replace('_', ' ')->toString(),
                'dataSolicitacao' => $orcamento->data_solicitacao->format('d/m/Y'),
            ]);

        $latestBudgets = new LengthAwarePaginator($orcamentos, $orcamentos->count(), 5, 1);

        return inertia('dashboard', [
            'statusCounts' => Orcamento::getCountsByStatus(),
            'budgetsByMonth' => Orcamento::getBudgetsByMonth(),
            'latestBudgets' => $latestBudgets,
        ]);
    }
}
