import { Head } from '@inertiajs/react';
import { index } from '@/routes/orcamentos';
import { columns } from '@/components/tables/orcamento';
import { DataTable } from '@/components/data-table';
import { PaginatedData } from '@/types';
import { Orcamento } from '@/types/orcamento';

export default function Orcamentos({ budgets }: { budgets: PaginatedData<Orcamento> }) {
    return (
        <>
            <Head title="Orçamentos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-bold tracking-tight mb-4">Todos os orçamentos</h1>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable data={budgets} columns={columns} />
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
