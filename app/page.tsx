import { CreateTaskButton, TaskList } from "@/components/Task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskProvider } from "@/components/TaskContext";

export default function Home() {
  return (
    <TaskProvider>
      <div className="h-screen">
        <main className="flex flex-col h-full items-center px-160 gap-8 bg-background p-32">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-3xl font-bold text-foreground">To-Do List</h1>
            <CreateTaskButton />
          </div>
          <ScrollArea className="flex flex-col w-full bg-card rounded-sm p-6 items-left text-left flex-1 overflow-hidden">
            <TaskList />
          </ScrollArea>
        </main>
      </div>
    </TaskProvider>
  );
}
