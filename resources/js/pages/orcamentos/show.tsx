import { Head, Link, usePage } from '@inertiajs/react';
import { edit, index } from '@/routes/orcamentos';
import { Orcamento } from '@/types/orcamento';
import InfoTable from '@/components/info-table';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, EyeIcon, PencilIcon } from 'lucide-react';

const textosStatus: Record<number, string> = {
    1: 'Enviado',
    2: 'Aprovado',
    3: 'Em andamento',
    4: 'Finalizado',
};

export default function Orcamentos({ orcamento }: { orcamento: Orcamento }) {
    const page = usePage();

    const { auth } = page.props;

    const isAdmin = auth?.user?.is_admin as boolean;

    return (
        <>
            <Head title="Orçamentos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-xl font-bold tracking-tight mb-4">Detalhes do Orçamento</h1>
                    {isAdmin && (
                        <Link href={edit({ orcamento: orcamento.id })}>
                            <Button variant="outline" size="sm">
                                <PencilIcon />
                                Editar
                            </Button>
                        </Link>
                    )}
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div className="grid gap-4 md:grid-cols-3 auto-rows-max">
                        <Card className="h-full flex flex-col">
                            <CardContent className="p-0 flex-1">
                                <InfoTable
                                    title="Dados do cliente"
                                    rows={[
                                        { label: 'Empresa', value: orcamento.cliente.nome_empresa },
                                        { label: 'Solicitante', value: orcamento.cliente.nome_solicitante },
                                        { label: 'Email', value: orcamento.cliente.email },
                                        { label: 'WhatsApp', value: orcamento.cliente.whatsapp },
                                    ]}
                                />
                            </CardContent>
                        </Card>

                        <Card className="h-full flex flex-col">
                            <CardContent className="p-0 flex-1">
                                <InfoTable
                                    title="Dados do orçamento"
                                    rows={[
                                        { label: 'Status', value: textosStatus[orcamento.status] },
                                        { label: 'Data de solicitação', value: orcamento.data_solicitacao },
                                        { label: 'Observações', value: orcamento.observacoes },
                                    ]}
                                />
                            </CardContent>
                            <CardFooter />
                        </Card>

                        <Card className="h-full flex flex-col">
                            <CardContent className="p-0 flex-1">
                                <InfoTable
                                    title="Dados da arte"
                                    rows={[
                                        { label: 'Precisa de criação?', value: orcamento.arte.precisa_criacao ? 'Sim' : 'Não' },
                                        { label: 'Possui arte?', value: orcamento.arte.possui_arte ? 'Sim' : 'Não' },
                                        ...(orcamento.arte.arquivo
                                            ? [{
                                                label: 'Arquivo',
                                                value: (
                                                    <Button variant="link" size="sm" className="h-auto p-0" onClick={() => window.open(orcamento.arte.arquivo, '_blank')}>
                                                        <Download className="mr-1 h-4 w-4" />
                                                        Baixar arquivo
                                                    </Button>
                                                ),
                                            }]
                                            : []),
                                    ]}
                                />
                            </CardContent>
                            <CardFooter />
                        </Card>
                    </div>

                    <div className="mt-4 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-4 py-3" colSpan={2}>
                                        Dados do material
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium text-muted-foreground w-56">
                                        Tipo de material
                                    </TableCell>
                                    <TableCell>{orcamento.material.tipo_material.nome}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-muted-foreground w-56">Formato</TableCell>
                                    <TableCell>{orcamento.material.formato.descricao}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-muted-foreground w-56">Gramatura do papel</TableCell>
                                    <TableCell>{orcamento.material.gramatura_papel.gramatura} g/m²</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-muted-foreground w-56">Cores de impressão</TableCell>
                                    <TableCell>{orcamento.material.cores_impressao.descricao}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-muted-foreground w-56">Tipo de papel</TableCell>
                                    <TableCell>{orcamento.material.tipo_papel.nome}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-muted-foreground w-56">Quantidade</TableCell>
                                    <TableCell>{orcamento.material.quantidade}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

Orcamentos.layout = {
    breadcrumbs: [
        {
            title: 'Orçamentos',
            href: index(),
        },
    ],
};