'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useTasks } from "./TaskContext"

function CreateTaskButton() {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (taskName.trim()) {
      await addTask(taskName);
      setTaskName("");
      setIsOpen(false);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer"
        >
          <Plus />
          Create Task
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
          <DialogDescription>
          Fill in the details for your new task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="cursor-pointer">Create</Button>
        </DialogFooter>
        </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TaskCard({ name }: { name: string }) {
  return (
    <div className="flex flex-row bg-secondary rounded-sm p-4 items-center justify-between w-full">
      <h1 className="text-lg secondary-foreground">{name}</h1>
    </div>
  )
}

function TaskList() {
  const { tasks, loading } = useTasks();

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full p-8">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center w-full p-8">
        <p className="text-muted-foreground">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6">
      {tasks.map((task: { id: number; name: string }) => (
        <TaskCard key={task.id} name={task.name} />
      ))}
    </div>
  );
}

export { 
  CreateTaskButton,
  TaskList
};