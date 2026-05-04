import { Orcamento } from "@/types/orcamento";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { show } from "@/routes/orcamentos";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export const columns: ColumnDef<Orcamento>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "dataSolicitacao",
        header: "Data",
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const orcamento = row.original;

            return (
                <Link href={show(orcamento.id)}>
                    <Button variant="outline" size="sm">
                        <EyeIcon className="mr-2 h-4 w-4" />
                        Ver
                    </Button>
                </Link>
            );
        },
    }
];