<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin() || auth()->user()->cliente?->id === $this->route('cliente')->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome_empresa' => 'required|string|max:255',
            'nome_solicitante' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'required|regex:/^\(?([1-9][0-9])\)?\s?9([0-9]{4})\-?([0-9]{4})$/|string|max:16',
        ];
    }
}
