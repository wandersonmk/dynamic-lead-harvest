import { Phone, Mail, Calendar } from "lucide-react";
import { Lead } from "./KanbanBoard";
import { Badge } from "@/components/ui/badge";

interface LeadCardProps {
  lead: Lead;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
}

export function LeadCard({ lead, onDragStart }: LeadCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:animate-card-hover transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-900">{lead.name}</h4>
        <Badge variant="secondary" className="text-xs">
          {lead.source}
        </Badge>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      {lead.assignedTo && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Assigned to: {lead.assignedTo}
          </span>
        </div>
      )}
    </div>
  );
}