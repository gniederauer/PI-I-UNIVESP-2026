import { Cliente } from "@/types/cliente";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { show } from "@/routes/clientes";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export const columns: ColumnDef<Cliente>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nome_empresa",
        header: "Empresa",
    },
    {
        accessorKey: "nome_solicitante",
        header: "Solicitante",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "whatsapp",
        header: "WhatsApp",
    }
];