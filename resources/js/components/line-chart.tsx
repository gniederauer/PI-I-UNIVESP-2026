import React from "react";
import * as Recharts from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart";
import { LineChartProps } from "@/types";

export function LineChart({
    labels,
    datasets,
    className,
}: LineChartProps) {
    const formattedData = React.useMemo(
        () =>
            datasets.map((dataset) => ({
                ...dataset,
                dataKey:
                    dataset.label.replace(/\s+/g, "-").toLowerCase(),
            })),
        [datasets]
    );

    const chartData = React.useMemo(
        () =>
            labels.map((label, index) => {
                const item: Record<string, string | number> = { name: label };

                formattedData.forEach((dataset) => {
                    item[dataset.dataKey] = dataset.data[index] ?? 0;
                });

                return item;
            }),
        [labels, formattedData]
    );

    const config: ChartConfig = React.useMemo(
        () =>
            Object.fromEntries(
                formattedData.map((dataset) => [
                    dataset.dataKey,
                    {
                        label: dataset.label,
                    },
                ])
            ) as Record<string, { label: string }>,
        [formattedData]
    );

    return (
        <ChartContainer config={config} className={className}>
            <Recharts.LineChart data={chartData}>
                <Recharts.CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                />
                <Recharts.XAxis dataKey="name" />
                <Recharts.YAxis allowDecimals={false} domain={[0, 'dataMax']} />
                <ChartTooltip content={<ChartTooltipContent />} />
                {formattedData.map((dataset) => (
                    <Recharts.Line
                        key={dataset.dataKey}
                        dataKey={dataset.dataKey}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                    />
                ))}
            </Recharts.LineChart>
        </ChartContainer>
    );
}

