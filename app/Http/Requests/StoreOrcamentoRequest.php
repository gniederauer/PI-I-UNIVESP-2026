<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrcamentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'observacoes' => ['nullable', 'string', 'max:1000'],

            'material_tipo_material_id' => ['required', 'exists:tipo_materiais,id'],
            'material_formato_id' => ['required', 'exists:formatos,id'],
            'material_gramatura_papel_id' => ['required', 'exists:gramatura_papeis,id'],
            'material_cores_impressao_id' => ['required', 'exists:cores_impressao,id'],
            'material_tipo_papel_id' => ['required', 'exists:tipo_papeis,id'],
            'material_quantidade' => ['required', 'integer', 'min:1'],

            'arte_precisa_criacao' => ['boolean'],
            'arte_possui_arte' => ['boolean'],
            'arte_arquivo' => ['nullable', 'file', 'mimes:ai,psd,png,svg', 'max:10240'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'observacoes.max' => 'As observações não podem ter mais que :max caracteres.',

            'material_tipo_material_id.required' => 'O tipo de material é obrigatório.',
            'material_tipo_material_id.exists' => 'O tipo de material selecionado é inválido.',
            'material_formato_id.required' => 'O formato é obrigatório.',
            'material_formato_id.exists' => 'O formato selecionado é inválido.',
            'material_gramatura_papel_id.required' => 'A gramatura do papel é obrigatória.',
            'material_gramatura_papel_id.exists' => 'A gramatura selecionada é inválida.',
            'material_cores_impressao_id.required' => 'As cores de impressão são obrigatórias.',
            'material_cores_impressao_id.exists' => 'As cores selecionadas são inválidas.',
            'material_tipo_papel_id.required' => 'O tipo de papel é obrigatório.',
            'material_tipo_papel_id.exists' => 'O tipo de papel selecionado é inválido.',
            'material_quantidade.required' => 'A quantidade é obrigatória.',
            'material_quantidade.integer' => 'A quantidade deve ser um número inteiro.',
            'material_quantidade.min' => 'A quantidade deve ser no mínimo 1.',
        ];
    }
}
