import { UserRole } from '@/types/supabase';
import { createClient } from './supabase/server';

export async function checkUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile?.role || null;
}

export async function hasRole(requiredRole: UserRole | UserRole[]): Promise<boolean> {
  const userRole = await checkUserRole();
  if (!userRole) return false;
  
  return Array.isArray(requiredRole) 
    ? requiredRole.includes(userRole)
    : userRole === requiredRole;
}