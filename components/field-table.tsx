import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FieldTableItem {
  name: string;
  cropType: string;
  stage: string;
  status: string;
  agent: string;
}

interface FieldTableProps {
  fields: FieldTableItem[];
}

export function FieldTable({ fields }: FieldTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <th className="pb-3 pr-6">Field</th>
              <th className="pb-3 pr-6">Crop</th>
              <th className="pb-3 pr-6">Stage</th>
              <th className="pb-3 pr-6">Status</th>
              <th className="pb-3">Agent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {fields.map((field) => (
              <tr key={field.name} className="hover:bg-slate-50">
                <td className="py-4 pr-6 font-semibold text-slate-900">{field.name}</td>
                <td className="py-4 pr-6">{field.cropType}</td>
                <td className="py-4 pr-6">{field.stage}</td>
                <td className="py-4 pr-6">
                  <Badge variant={field.status === "At Risk" ? "warning" : field.status === "Completed" ? "secondary" : "success"}>
                    {field.status}
                  </Badge>
                </td>
                <td className="py-4">{field.agent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
