import { SupabaseClient } from '@supabase/supabase-js';

export interface Project {
  id: number;
  created_at: string;
  name: string;
  job_address: string | null;
  start_date: string | null;
  organization_id: number;
  status: string;
}

export async function getProjects(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('deleted', false)
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createProject(
  supabase: SupabaseClient,
  project: {
    name: string;
    job_address?: string;
    start_date?: string;
    organization_id: number;
  }
) {
  const { data, error } = await supabase
    .from('Projects')
    .insert([{
      ...project,
      slug: project.name.toLowerCase().replace(/\s+/g, '-'),
      slug_name: project.name.toLowerCase(),
      source: 'MANUAL',
      provider_status: 'ACTIVE'
    }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function searchProjects(
  supabase: SupabaseClient,
  searchTerm: string
) {
  const { data, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('deleted', false)
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
} 