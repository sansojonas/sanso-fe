'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { CheckIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { sanso_project_status } from '@prisma/client'
const ACTIVE_STATUSES = [
  sanso_project_status.NotStarted,
  sanso_project_status.InProgress,
] as const;



type Project = {
  id: string;
  name: string;
  job_address: string;
  start_date: string;
  status: string;
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.job_address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isActive = project.status && ACTIVE_STATUSES.includes(project.status as "NotStarted" | "InProgress");
    const matchesActive = showActiveOnly ? isActive : true;
    
    return matchesSearch && matchesActive;
  });

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Input 
          placeholder="Search projects..." 
          className="w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Toggle 
          aria-label="Toggle active projects" 
          variant="outline"
          pressed={showActiveOnly}
          onPressedChange={setShowActiveOnly}
        >
          <CheckIcon className="h-4 w-4 mr-2" />
          Active Projects Only
        </Toggle>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.job_address}</TableCell>
                <TableCell>
                  {project.start_date 
                    ? new Date(project.start_date).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>{project.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
} 