"use client";

import { useEffect, useState } from "react";
import { getPatients } from "../_services/patient-service";
import { PatientCard } from "./patient-card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [refreshKey, setRefreshKey] = useState(0); // 🔁 refresh tetikleyici

  useEffect(() => {
    getPatients().then((res) => setPatients(res.items));
  }, [refreshKey]); // refreshKey değiştikçe yeniden fetch eder

  const refresh = () => setRefreshKey((prev) => prev + 1);

  if (!patients) return <Skeleton className="h-[400px] w-full" />;
  if (patients.length === 0) return <p className="text-muted-foreground">Danışan bulunamadı.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onRefresh={refresh} />
      ))}
    </div>
  );
}
