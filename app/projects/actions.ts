'use server'

import { createClient } from '@/utils/supabase/server';
import { createProject as createProjectQuery } from '@/utils/supabase/Projects/queries';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  const supabase = createClient();
  
  const project = {
    name: formData.get('name') as string,
    job_address: formData.get('job_address') as string,
    start_date: formData.get('start_date') as string,
    organization_id: 3
  };

  await createProjectQuery(supabase, project);
  revalidatePath('/projects');
}