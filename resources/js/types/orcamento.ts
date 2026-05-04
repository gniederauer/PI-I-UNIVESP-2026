export type StatusOrcamento = 'enviado' | 'aprovado' | 'emAndamento' | 'finalizado';

export type Orcamento = {
    id: number;
    cliente: string;
    status: StatusOrcamento;
    dataSolicitacao: string;
};