"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PatientDialog } from "./patient-dialog";
import { Patient } from "./patient-card-grid";
import { usePatientMutations } from "@/hooks/use-patients";
import { ConfirmDelete } from "@/components/confirm-delete";
import { notifySuccess, notifyError } from "@/lib/toast";
import { Trash2, Eye } from "lucide-react";

export function PatientCard({ patient }: { patient: Patient }) {
  const [open, setOpen] = useState(false);
  const { remove } = usePatientMutations();

  const handleDelete = async () => {
    if (!patient.id) return;
    try {
      await remove.mutateAsync(patient.id);
      notifySuccess("Danışan silindi");
    } catch (err: any) {
      notifyError(err.message ?? "Silme işlemi başarısız");
    }
  };

  return (
    <Card className="relative flex h-full flex-col justify-between shadow-sm">
      <div className="absolute right-2 top-2 flex gap-2">
        <ConfirmDelete onConfirm={handleDelete}>
          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </ConfirmDelete>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <PatientDialog open={open} onOpenChange={setOpen} patient={patient} />
        </Dialog>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{patient.name}</CardTitle>
        <p className="text-muted-foreground text-xs">{patient.email}</p>
        <p className="text-muted-foreground text-xs">{patient.phone}</p>
      </CardHeader>

      <CardContent className="text-muted-foreground line-clamp-3 text-sm">
        {patient.notes || "Not eklenmemiş."}
      </CardContent>

      <CardFooter className="text-muted-foreground flex items-center justify-between text-sm">
        <span>Son Ziyaret: {patient.lastVisitFormatted}</span>
      </CardFooter>
    </Card>
  );
}
