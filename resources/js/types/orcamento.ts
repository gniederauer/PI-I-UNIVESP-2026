import { Cliente } from "./cliente";
import { Arte } from "./arte";
import { Material } from "./material";

export type StatusOrcamento = 1 | 2 | 3 | 4;

export type Orcamento = {
    id: number;
    valor_total: string;
    nomeCliente: string;
    cliente: Cliente;
    arte: Arte;
    material: Material;
    status: StatusOrcamento;
    dataSolicitacao: string;
    data_solicitacao: string;
    observacoes: string;
};