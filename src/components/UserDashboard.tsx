import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DocumentUpload } from './DocumentUpload';
import { User, FileText, Settings } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export function UserDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error('Not authenticated');

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setProfile(data);
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error}</div>;

  return (
    <div>
      <h1>Welcome, {profile?.full_name}</h1>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
      <DocumentUpload />
    </div>
  );
}