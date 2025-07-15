"use client";

import { useState } from "react";
import { PatientCard } from "./patient-card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatients } from "@/hooks/use-patients";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

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
        {patients.map((patient: Patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!data || page >= (data.totalPages ?? page)) return;
                setPage((p) => p + 1);
              }}
              className={data && page >= (data.totalPages ?? page) ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
