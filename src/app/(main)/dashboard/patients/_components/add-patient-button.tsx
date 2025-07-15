"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PatientDialog } from "./patient-dialog";
import { PlusIcon } from "lucide-react";

export function AddPatientButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Yeni Danışan
      </Button>
      <PatientDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
