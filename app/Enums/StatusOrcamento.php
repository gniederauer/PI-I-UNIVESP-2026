<?php

declare(strict_types=1);

namespace App\Enums;

enum StatusOrcamento: int
{
    case ENVIADO = 1;
    case APROVADO = 2;
    case EM_ANDAMENTO = 3;
    case FINALIZADO = 4;
}
