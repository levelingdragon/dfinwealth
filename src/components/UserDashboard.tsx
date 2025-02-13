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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome, {profile?.full_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Email: {profile?.email}</p>
            <p className="text-gray-600">Role: {profile?.role}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Documents</h2>
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <button className="text-blue-600 hover:text-blue-700">
            View All Documents
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Settings</h2>
            <Settings className="h-6 w-6 text-blue-600" />
          </div>
          <button className="text-blue-600 hover:text-blue-700">
            Manage Settings
          </button>
        </div>
      </div>

      <div className="mt-8">
        <DocumentUpload />
      </div>
    </div>
  );
}