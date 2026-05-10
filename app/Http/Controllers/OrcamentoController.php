<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrcamentoRequest;
use App\Http\Requests\UpdateOrcamentoRequest;
use App\Models\CoresImpressao;
use App\Models\GramaturaPapel;
use App\Models\Orcamento;
use App\Models\TipoMaterial;
use App\Models\TipoPapel;
use Inertia\Inertia;

class OrcamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgets = Orcamento::paginate(10);

        $budgets->getCollection()->transform(fn($orcamento) => [
            'id' => $orcamento->id,
            'nomeCliente' => $orcamento->cliente->nome_empresa,
            'cliente' => $orcamento->cliente,
            'status' => str($orcamento->status->name)->title()->replace('_', ' ')->toString(),
            'dataSolicitacao' => $orcamento->data_solicitacao->format('d/m/Y'),
        ]);

        return inertia('orcamentos/index', compact('budgets'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrcamentoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Orcamento $orcamento)
    {
        $orcamento->load([
            'cliente',
            'arte',
            'material.tipoMaterial',
            'material.formato',
            'material.gramaturaPapel',
            'material.coresImpressao',
            'material.tipoPapel',
        ]);

        return inertia('orcamentos/show', compact('orcamento'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Orcamento $orcamento)
    {
        $orcamento->load([
            'material.tipoMaterial',
            'material.formato',
            'material.gramaturaPapel',
            'material.coresImpressao',
            'material.tipoPapel',
            'arte',
        ]);

        return inertia('orcamentos/edit', [
            'orcamento' => $orcamento,
            'tiposMaterial' => TipoMaterial::with('formatos')->orderBy('nome')->get(),
            'gramaturasPapel' => GramaturaPapel::orderBy('gramatura')->get(),
            'coresImpressao' => CoresImpressao::orderBy('descricao')->get(),
            'tiposPapel' => TipoPapel::orderBy('nome')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrcamentoRequest $request, Orcamento $orcamento)
    {
        $data = $request->validated();

        $orcamento->update([
            'valor_total' => $data['valor_total'],
            'status' => $data['status'],
            'observacoes' => $data['observacoes'] ?? null,
        ]);

        if ($orcamento->material) {
            $orcamento->material->update([
                'tipo_material_id' => $data['material_tipo_material_id'],
                'formato_id' => $data['material_formato_id'],
                'gramatura_papel_id' => $data['material_gramatura_papel_id'],
                'cores_impressao_id' => $data['material_cores_impressao_id'],
                'tipo_papel_id' => $data['material_tipo_papel_id'],
                'quantidade' => $data['material_quantidade'],
            ]);
        }

        if ($orcamento->arte) {
            $arteData = [
                'precisa_criacao' => $data['arte_precisa_criacao'] ?? false,
                'possui_arte' => $data['arte_possui_arte'] ?? false,
            ];

            if ($request->hasFile('arte_arquivo')) {
                $arteData['arquivo'] = $request->file('arte_arquivo')->store('artes', 'public');
            }

            $orcamento->arte->update($arteData);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Orçamento atualizado com sucesso.']);

        return to_route('orcamentos.show', $orcamento);
    }
}
