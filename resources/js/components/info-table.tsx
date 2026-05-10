import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function InfoTable({
    title,
    rows,
}: {
    title?: string;
    rows: { label: string; value: React.ReactNode }[];
}) {
    return (
        <Table>
            {title && (
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-3" colSpan={2}>
                            {title}
                        </TableHead>
                    </TableRow>
                </TableHeader>
            )}
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.label}>
                        <TableCell className="font-medium text-muted-foreground w-1/3 align-top">
                            {row.label}
                        </TableCell>
                        <TableCell>{row.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
