<?php

namespace App\Models;

use App\Enums\StatusOrcamento;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['valor_total', 'data_solicitacao', 'status', 'observacoes'])]
class Orcamento extends Model
{
    /** @use HasFactory<\Database\Factories\OrcamentoFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Cliente>
     */
    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    /**
     * @return HasOne<Arte>
     */
    public function arte(): HasOne
    {
        return $this->hasOne(Arte::class);
    }

    /**
     * @return HasOne<Material>
     */
    public function material(): HasOne
    {
        return $this->hasOne(Material::class);
    }

    /**
     * Retorna a contagem de orçamentos agrupados por status.
     *
     * @return array<string, int>
     */
    public static function getCountsByStatus(): array
    {
        $totalCount = self::count('id');

        $counts = self::query()
            ->select('status')
            ->get()
            ->countBy(fn($orcamento) => $orcamento->status->value)
            ->toArray();

        return collect(StatusOrcamento::cases())
            ->mapWithKeys(function (StatusOrcamento $status) use ($counts) {
                return [
                    str($status->name)->lower()->camel()->toString()
                    => $counts[$status->value] ?? 0
                ];
            })
            ->put('total', $totalCount)
            ->toArray();
    }

    /**
     * Retorna os dados de orçamentos por mês nos últimos 12 meses.
     *
     * @return array{
     *     labels: string[],
     *     datasets: array<int, array<string, mixed>>,
     * }
     */
    public static function getBudgetsByMonth(): array
    {
        $labelsMap = [
            'jan',
            'fev',
            'mar',
            'abr',
            'mai',
            'jun',
            'jul',
            'ago',
            'set',
            'out',
            'nov',
            'dez',
        ];

        $start = now()->subMonths(11)->startOfMonth();
        $end = now()->endOfMonth();

        $periods = collect(range(0, 11))
            ->map(fn(int $offset) => $start->copy()->addMonths($offset));

        $monthlyResults = self::query()
            ->whereBetween('data_solicitacao', [$start, $end])
            ->get(['data_solicitacao', 'valor_total'])
            ->groupBy(fn(self $orcamento) => $orcamento->data_solicitacao->format('Y-m'))
            ->map(fn($group) => [
                'count' => $group->count(),
                'total' => $group->sum(fn(self $orcamento) => (float) $orcamento->valor_total),
            ])
            ->all();

        $labels = $periods
            ->map(fn($date) => sprintf('%s/%s', $labelsMap[$date->month - 1], $date->format('y')))
            ->toArray();

        $counts = $periods
            ->map(fn($date) => $monthlyResults[$date->format('Y-m')]['count'] ?? 0)
            ->toArray();

        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Orçamentos',
                    'data' => $counts,
                ],
            ],
        ];
    }

    protected function casts(): array
    {
        return [
            'valor_total' => 'decimal:2',
            'data_solicitacao' => 'datetime',
            'status' => StatusOrcamento::class,
            'observacoes' => 'string',
        ];
    }
}
