"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthCookie } from "@/lib/auth-cookies";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "@/app/(main)/dashboard/patients/_services/patient-service";

export function usePatients(page: number) {
  const token = getAuthCookie();
  return useQuery({
    queryKey: ["patients", page],
    queryFn: () => (token ? getPatients(token, page) : Promise.resolve(null)),
    enabled: !!token,
  });
}

export function usePatientMutations() {
  const queryClient = useQueryClient();
  const token = getAuthCookie();

  const create = useMutation({
    mutationFn: (data: any) => createPatient(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updatePatient(id, data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deletePatient(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return { create, update, remove };
}
