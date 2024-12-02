import { createClient } from '@/utils/supabase/server';
import { getProjects } from '@/utils/supabase/Projects/queries';
import { CreateProjectForm } from './CreateProjectForm';
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProjectsPage() {
  const supabase = createClient();
  const projects = await getProjects(supabase);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Projects</h2>
        <CreateProjectForm />
      </div>
      
      <Input 
        placeholder="Search projects..." 
        className="w-64 mb-6"
      />

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
            {projects.map((project) => (
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
    </div>
  );
}