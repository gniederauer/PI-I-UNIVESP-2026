import { Head } from '@inertiajs/react';
import { StatusCard } from '@/components/ui/status-card';
import { dashboard } from '@/routes';
import { Box, Send, Check, Clock, CircleCheck } from 'lucide-react';
import { StatusCounts, BudgetChartData } from '@/types/ui';
import { LineChart } from '@/components/line-chart';

export default function Dashboard({
    statusCounts,
    budgetsByMonth,
}: {
    statusCounts: StatusCounts;
    budgetsByMonth: BudgetChartData;
}) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold tracking-tight">Orçamentos</h1>
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard title="Total" value={statusCounts.total}>
                            <Box className="size-6 text-yellow-500" />
                        </StatusCard>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard title="Enviados" value={statusCounts.enviado}>
                            <Send className="size-6 text-green-500" />
                        </StatusCard>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard title="Aprovados" value={statusCounts.aprovado}>
                            <Check className="size-6 text-blue-500" />
                        </StatusCard>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard title="Em andamento" value={statusCounts.emAndamento}>
                            <Clock className="size-6 text-yellow-500" />
                        </StatusCard>
                    </div>
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <StatusCard title="Finalizados" value={statusCounts.finalizado}>
                            <CircleCheck className="size-6 text-green-500" />
                        </StatusCard>
                    </div>
                </div>
                <div className="relative w-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-background dark:border-sidebar-border p-4">
                    <h1 className="text-xl font-bold tracking-tight">Orçamentos por mês</h1>
                    <div className="flex items-center justify-between border-b border-border/50 bg-card px-4 py-4">
                        <LineChart
                            labels={budgetsByMonth.labels}
                            datasets={budgetsByMonth.datasets}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
