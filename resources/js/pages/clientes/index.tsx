import { Head } from '@inertiajs/react';
import { index } from '@/routes/clientes';
import { columns } from '@/components/tables/cliente';
import { DataTable } from '@/components/data-table';
import { PaginatedData } from '@/types';
import { Cliente } from '@/types/cliente';

export default function Clientes({ clients }: { clients: PaginatedData<Cliente> }) {
    return (
        <>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-bold tracking-tight mb-4">Todos os clientes</h1>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable data={clients} columns={columns} />
                </div>
            </div>
        </>
    );
}

Clientes.layout = {
    breadcrumbs: [
        {
            title: 'Clientes',
            href: index(),
        },
    ],
};
