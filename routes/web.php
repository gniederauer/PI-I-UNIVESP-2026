<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\OrcamentoController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';

Route::middleware('auth')->resource('orcamentos', OrcamentoController::class);
Route::middleware('auth')->resource('clientes', ClienteController::class);
