import { Lead } from "./KanbanBoard";
import { LeadCard } from "./LeadCard";

interface KanbanColumnProps {
  title: string;
  leads: Lead[];
  onDragStart: (e: React.DragEvent, leadId: string) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export function KanbanColumn({
  title,
  leads,
  onDragStart,
  onDrop,
  onDragOver,
}: KanbanColumnProps) {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}