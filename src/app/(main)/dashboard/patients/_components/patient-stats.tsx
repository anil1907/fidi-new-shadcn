import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PatientStats() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Genel Durum</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div>Toplam Danışan: <strong>42</strong></div>
        <div>Aktif Takip: <strong>28</strong></div>
        <div>Bu Ay Eklenen: <strong>5</strong></div>
      </CardContent>
    </Card>
  );
}
