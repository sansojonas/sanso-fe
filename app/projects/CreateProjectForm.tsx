'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createProject } from "@/app/projects/actions";
import { useState } from "react";

export function CreateProjectForm() {
  const [open, setOpen] = useState(false);

  async function onSubmit(formData: FormData) {
    await createProject(formData);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              placeholder="Project Name"
              required
            />
          </div>
          <div>
            <Input
              name="job_address"
              placeholder="Job Address"
            />
          </div>
          <div>
            <Input
              name="start_date"
              type="date"
              placeholder="Start Date"
            />
          </div>
          <Button type="submit">Create Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 