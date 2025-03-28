import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string; 
  full_name: string | null;
  gender: string | null;
  age: number | null;
  blood_group: string | null;
  avatar_url: string | null;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState({
    profile: false,
    update: false,
    avatar: false
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    age: '',
    blood_group: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    setLoading(prev => ({...prev, profile: true}));
    setError('');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, gender, age, blood_group, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        gender: data.gender || '',
        age: data.age?.toString() || '',
        blood_group: data.blood_group || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(prev => ({...prev, profile: false}));
    }
  }

  async function handleUpdateProfile() {
    setLoading(prev => ({ ...prev, update: true }));
    
    try {
      // 1. Get session AND user ID
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No active session!");
      
      const userId = session.user.id; // <- Critical
  
      // 2. Prepare data WITH ID
      const updates = {
        id: userId, // <- MUST INCLUDE THIS
        full_name: formData.full_name || null,
        gender: formData.gender || null,
        age: formData.age ? parseInt(formData.age) : null,
        blood_group: formData.blood_group || null,
        updated_at: new Date().toISOString() // Only if column exists
      };
  
      // 3. Upsert (handles both insert and update)
      const { error } = await supabase
        .from('profiles')
        .upsert(updates); // <- Uses id to find record
  
      if (error) throw error;
  
      // 4. Refresh UI
      setProfile(prev => ({ ...prev!, ...updates }));
      setEditing(false);
  
    } catch (error) {
      console.error("Profile operation failed:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  }
  
  async function handleProfilePictureUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(prev => ({...prev, avatar: true}));
    setError('');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      // Delete old avatar if exists
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        await supabase.storage.from('avatars').remove([oldPath!]);
      }

      const filePath = `avatars/${session.user.id}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      fetchUserProfile();
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload profile picture. Please try again.');
    } finally {
      setLoading(prev => ({...prev, avatar: false}));
    }
  }

  if (loading.profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {profile && (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={profile.avatar_url || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              {loading.avatar && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">Uploading...</span>
                </div>
              )}
            </div>
            <label className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
              Change Photo
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleProfilePictureUpload} 
                className="hidden" 
                disabled={loading.avatar}
              />
            </label>
          </div>
        )}

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                value={formData.blood_group}
                onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleUpdateProfile}
                disabled={loading.update}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
              >
                {loading.update ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setEditing(false)}
                disabled={loading.update}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Name:</strong> {profile?.full_name || 'N/A'}</p>
            <p className="text-gray-700"><strong>Gender:</strong> {profile?.gender || 'N/A'}</p>
            <p className="text-gray-700"><strong>Age:</strong> {profile?.age || 'N/A'}</p>
            <p className="text-gray-700"><strong>Blood Group:</strong> {profile?.blood_group || 'N/A'}</p>

            <button
              onClick={() => setEditing(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}

        <button
          onClick={async () => { 
            await supabase.auth.signOut(); 
            navigate('/'); 
          }}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
