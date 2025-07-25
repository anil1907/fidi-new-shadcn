"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { notifySuccess, notifyError } from "@/lib/toast";
import { usePatientMutations } from "@/hooks/use-patients";

const schema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().int().positive(),
  email: z.string().email(),
  phone: z.string().min(10),
  notes: z.string().optional(),
});

export function PatientForm({ patient, onSuccess }: { patient?: any; onSuccess?: () => void }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: patient ?? {
      name: "",
      age: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const { create, update } = usePatientMutations();

  const onSubmit = async (values: any) => {
    try {
      if (patient) {
        await update.mutateAsync({ id: patient.id, data: values });
        notifySuccess("Danışan güncellendi");
      } else {
        await create.mutateAsync(values);
        notifySuccess("Danışan eklendi");
      }

      onSuccess?.();
    } catch (err: any) {
      notifyError(err.message ?? "İşlem başarısız");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad Soyad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yaş</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Not</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {patient ? "Güncelle" : "Kaydet"}
        </Button>
      </form>
    </Form>
  );
}
