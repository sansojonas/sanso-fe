import { createClient } from '@/utils/supabase/server';
import { getProjects } from '@/utils/supabase/Projects/queries';
import { CreateProjectForm } from './CreateProjectForm';
import { ProjectsTable } from './ProjectsTable';

export default async function ProjectsPage() {
  const supabase = createClient();
  const projects = await getProjects(supabase);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Projects</h2>
        <CreateProjectForm />
      </div>
      
      <ProjectsTable projects={projects} />
    </div>
  );
}