"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PatientDialog } from "./patient-dialog";
import { Patient } from "./patient-card-grid";
import { usePatientMutations } from "@/hooks/use-patients";
import { toast } from "sonner";

export function PatientCard({ patient }: { patient: Patient }) {
  const [open, setOpen] = useState(false);
  const { remove } = usePatientMutations();

  const handleDelete = async () => {
    if (!patient.id) return;
    if (!window.confirm("Danışanı silmek istediğinize emin misiniz?")) return;
    try {
      await remove.mutateAsync(patient.id);
      toast.success("Danışan silindi");
    } catch (err: any) {
      toast.error(err.message ?? "Silme işlemi başarısız");
    }
  };

  return (
    <Card className="flex h-full flex-col justify-between shadow-sm">
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

        <div className="flex gap-2">
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Sil
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                Detay
              </Button>
            </DialogTrigger>
            <PatientDialog open={open} onOpenChange={setOpen} patient={patient} />
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
