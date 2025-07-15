"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PatientForm } from "./patient-form";
import { toast } from "sonner";
import { deletePatient } from "../_services/patient-service";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: any;
}

export function PatientDialog({ open, onOpenChange, patient }: Props) {
  const handleDelete = async () => {
    if (!patient?.id) return;

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) throw new Error("Token eksik");

      await deletePatient(patient.id, token);
      toast.success("Danışan silindi");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message ?? "Silme işlemi başarısız");
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
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="mt-2"
            >
              Danışanı Sil
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
