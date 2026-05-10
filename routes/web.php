<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrcamentoController;
use App\Http\Middleware\IsAdminUser;
use App\Http\Middleware\IsNotAdminUser;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__ . '/settings.php';

Route::middleware('auth')->group(function () {
    Route::get('orcamentos', [OrcamentoController::class, 'index'])->name('orcamentos.index');
    Route::get('orcamentos/{orcamento}', [OrcamentoController::class, 'show'])->name('orcamentos.show');

    Route::middleware(IsNotAdminUser::class)->group(function () {
        Route::get('orcamentos/create', [OrcamentoController::class, 'create'])->name('orcamentos.create');
        Route::post('orcamentos', [OrcamentoController::class, 'store'])->name('orcamentos.store');
    });

    Route::middleware(IsAdminUser::class)->group(function () {
        Route::get('orcamentos/{orcamento}/edit', [OrcamentoController::class, 'edit'])->name('orcamentos.edit');
        Route::put('orcamentos/{orcamento}', [OrcamentoController::class, 'update'])->name('orcamentos.update');
    });
});

Route::middleware('auth')
    ->middleware(IsAdminUser::class)
    ->resource('clientes', ClienteController::class)->except('create', 'destroy', 'edit', 'update');
