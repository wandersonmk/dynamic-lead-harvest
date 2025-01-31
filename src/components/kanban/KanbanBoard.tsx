import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export type LeadStatus = "new" | "contacted" | "negotiating" | "won" | "lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  assignedTo?: string;
  createdAt: string;
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    status: "new",
    source: "Facebook Ads",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    status: "contacted",
    source: "Google Ads",
    assignedTo: "Alice Cooper",
    createdAt: new Date().toISOString(),
  },
];

const columns: { id: LeadStatus; title: string }[] = [
  { id: "new", title: "New Leads" },
  { id: "contacted", title: "Contacted" },
  { id: "negotiating", title: "Negotiating" },
  { id: "won", title: "Won" },
  { id: "lost", title: "Lost" },
];

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("leadId", leadId);
  };

  const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status } : lead
      )
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-5 w-5 mr-2" />
          Add Lead
        </Button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            leads={leads.filter((lead) => lead.status === column.id)}
            onDragStart={handleDragStart}
            onDrop={(e) => handleDrop(e, column.id)}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  );
}