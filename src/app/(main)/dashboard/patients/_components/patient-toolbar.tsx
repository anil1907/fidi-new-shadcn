"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { PatientDialog } from "./patient-dialog";

export function PatientToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Danışan arayın (isim, e-posta...)"
        className="max-w-sm"
      />

      <Button className="ml-auto" onClick={() => setOpen(true)}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Yeni Danışan Ekle
      </Button>

      {/* Yeni danışan ekleme modalı */}
      <PatientDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
