import { PatientCardGrid } from "./_components/patient-card-grid";
import { PatientToolbar } from "./_components/patient-toolbar";

export default function Page() {
  return (
    <div className="space-y-6">
      <PatientToolbar />
      <PatientCardGrid />
    </div>
  );
}
