import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';
import { ColumnDef } from '@tanstack/react-table';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};

export type StatusCounts = {
    total: number;
    aprovado: number;
    enviado: number;
    emAndamento: number;
    finalizado: number;
};

type LineChartDataset = {
    label: string;
    data: number[];
};

export type BudgetChartData = {
    labels: string[];
    datasets: LineChartDataset[];
};

export type LineChartProps = {
    labels: string[];
    datasets: LineChartDataset[];
    className?: string;
};

export type DataTableProperties<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}