"use client";

import { useEffect, useState } from "react";
import { getPatients } from "../_services/patient-service";
import { PatientCard } from "./patient-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuthCookie } from "@/lib/auth-cookies";

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
  const [patients, setPatients] = useState<Patient[] | null>(null);

  useEffect(() => {
    const token = getAuthCookie();
    if (!token) return;

    getPatients(token).then((res) => setPatients(res.items));
  }, []);

  if (!patients) return <Skeleton className="h-[400px] w-full" />;
  if (patients.length === 0) return <p className="text-muted-foreground">Danışan bulunamadı.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
