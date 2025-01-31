import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "(11) 99999-9999",
    status: "new",
    source: "Facebook Ads",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@exemplo.com",
    phone: "(11) 88888-8888",
    status: "contacted",
    source: "Google Ads",
    assignedTo: "Ana Costa",
    createdAt: new Date().toISOString(),
  },
];

const columns: { id: LeadStatus; title: string }[] = [
  { id: "new", title: "Novos Leads" },
  { id: "contacted", title: "Contatados" },
  { id: "negotiating", title: "Em Negociação" },
  { id: "won", title: "Ganhos" },
  { id: "lost", title: "Perdidos" },
];

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Telefone deve ter pelo menos 8 dígitos"),
  source: z.string().min(2, "Origem deve ter pelo menos 2 caracteres"),
});

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      source: "",
    },
  });

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newLead: Lead = {
      id: Math.random().toString(36).substring(7),
      name: values.name,
      email: values.email,
      phone: values.phone,
      source: values.source,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    setLeads((prevLeads) => [...prevLeads, newLead]);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Lead adicionado com sucesso",
      description: `${values.name} foi adicionado à lista de leads.`,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Funil de Leads</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-5 w-5 mr-2" />
              Adicionar Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Lead</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do lead" {...field} />
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
                        <Input placeholder="email@exemplo.com" {...field} />
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
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origem</FormLabel>
                      <FormControl>
                        <Input placeholder="Facebook Ads, Google Ads, etc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Adicionar Lead</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
