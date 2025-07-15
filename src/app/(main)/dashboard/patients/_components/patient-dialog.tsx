"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PatientForm } from "./patient-form";
import { ConfirmDelete } from "@/components/confirm-delete";
import { notifySuccess, notifyError } from "@/lib/toast";
import { usePatientMutations } from "@/hooks/use-patients";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: any;
}

export function PatientDialog({ open, onOpenChange, patient }: Props) {
  const { remove } = usePatientMutations();

  const handleDelete = async () => {
    if (!patient?.id) return;
    try {
      await remove.mutateAsync(patient.id);
      notifySuccess("Danışan silindi");
      onOpenChange(false);
    } catch (err: any) {
      notifyError(err.message ?? "Silme işlemi başarısız");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{patient ? "Danışanı Güncelle" : "Yeni Danışan Ekle"}</DialogTitle>
        </DialogHeader>

        <PatientForm patient={patient} onSuccess={() => onOpenChange(false)} />

        {patient && (
          <DialogFooter className="justify-start">
            <ConfirmDelete onConfirm={handleDelete}>
              <Button variant="destructive" className="mt-2">
                Danışanı Sil
              </Button>
            </ConfirmDelete>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
