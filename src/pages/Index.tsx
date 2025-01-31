import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <KanbanBoard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;