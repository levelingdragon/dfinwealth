import { useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  created_at: string;
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('documents')
        .insert([
          {
            user_id: user.id,
            name: file.name,
            type: file.type,
            url: publicUrl,
          },
        ]);

      if (dbError) throw dbError;

      // Refresh documents list
      const { data: newDocuments } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id);

      if (newDocuments) {
        setDocuments(newDocuments);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting document');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Document Management</h2>

      <div className="mb-6">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
        >
          <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
              <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
            </div>
          </div>
        </label>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <File className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(doc.id)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}