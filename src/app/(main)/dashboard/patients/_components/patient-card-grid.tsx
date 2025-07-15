"use client";

import { useState } from "react";
import { PatientCard } from "./patient-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { usePatients } from "@/hooks/use-patients";

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  notes: string;
  lastVisitFormatted: string;
}

export function PatientCardGrid() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePatients(page);

  if (isLoading) return <Skeleton className="h-[400px] w-full" />;

  const patients = data?.items ?? [];
  if (patients.length === 0) return <p className="text-muted-foreground">Danışan bulunamadı.</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Önceki
        </Button>
        <Button
          variant="outline"
          disabled={data && page >= (data.totalPages ?? page)}
          onClick={() => setPage((p) => p + 1)}
        >
          Sonraki
        </Button>
      </div>
    </>
  );
}
