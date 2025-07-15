import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PatientFilters() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Filtrele</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="İsim, soyisim veya e-posta" />
        <Button className="w-full" variant="secondary">Filtrele</Button>
      </CardContent>
    </Card>
  );
}
