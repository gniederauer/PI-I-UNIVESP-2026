<?php

namespace App\Http\Controllers;

use App\Models\Cliente;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Cliente::paginate(10);

        $clients->getCollection()->transform(fn($cliente) => [
            'id' => $cliente->id,
            'nome_empresa' => $cliente->nome_empresa,
            'nome_solicitante' => $cliente->nome_solicitante,
            'email' => $cliente->email,
            'whatsapp' => $cliente->whatsapp,
        ]);

        return inertia('clientes/index', compact('clients'));
    }
}
