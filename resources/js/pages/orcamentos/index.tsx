import { Head, usePage, Link } from '@inertiajs/react';
import { index, create } from '@/routes/orcamentos';
import { columns } from '@/components/tables/orcamento';
import { DataTable } from '@/components/data-table';
import { PaginatedData } from '@/types';
import { Orcamento } from '@/types/orcamento';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Orcamentos({ budgets }: { budgets: PaginatedData<Orcamento> }) {
    const page = usePage();

    const { auth } = page.props;

    const isAdmin = auth?.user?.is_admin as boolean;

    return (
        <>
            <Head title="Orçamentos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Orçamentos</h1>
                    {!isAdmin && (
                        <Link href={create()}>
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Criar orçamento
                            </Button>
                        </Link>
                    )}
                </div>
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
