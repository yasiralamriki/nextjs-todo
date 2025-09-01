import { CreateTaskButton, TaskList } from "@/components/Task";
import { TaskProvider } from "@/components/TaskContext";

export default function Home() {
  return (
    <TaskProvider>
      <div>
        <main className="flex flex-col justify-center text-center min-h-screen items-center px-160 gap-8 bg-background">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
            <CreateTaskButton />
          </div>
          <div className="flex flex-col w-full bg-card rounded-sm p-8 items-left text-left">
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  );
}
