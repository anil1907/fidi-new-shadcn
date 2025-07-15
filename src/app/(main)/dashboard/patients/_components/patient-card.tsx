"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PatientDialog } from "./patient-dialog";
import { Patient } from "./patient-card-grid";

export function PatientCard({ patient }: { patient: Patient }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="flex flex-col justify-between h-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{patient.name}</CardTitle>
        <p className="text-xs text-muted-foreground">{patient.email}</p>
        <p className="text-xs text-muted-foreground">{patient.phone}</p>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground line-clamp-3">
        {patient.notes || "Not eklenmemiş."}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Son Ziyaret: {patient.lastVisitFormatted}</span>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              Detay
            </Button>
          </DialogTrigger>
          <PatientDialog open={open} onOpenChange={setOpen} patient={patient} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
