import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Patient = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Ad Soyad",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "E-posta",
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span className={`text-sm font-medium ${status === "active" ? "text-green-600" : "text-gray-500"}`}>
          {status === "active" ? "Aktif" : "Pasif"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => (
      <div className="text-right">
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
