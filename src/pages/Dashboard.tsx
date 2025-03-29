import { useEffect, useState } from 'react';
import { Camera, X, User, LogIn, LogOut, Home, Info, Calendar, Users, Mail, Newspaper, LayoutDashboard } from 'lucide-react';
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
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const DEFAULT_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState({
    profile: true,
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
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  async function fetchUserProfile() {
    setLoading(prev => ({ ...prev, profile: true }));
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
      setLoading(prev => ({ ...prev, profile: false }));
    }
  }

  async function handleUpdateProfile() {
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return;
    }

    setLoading(prev => ({ ...prev, update: true }));
    setError('');
    setSuccess('');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No active session!");
      
      const updates = {
        full_name: formData.full_name.trim(),
        gender: formData.gender || null,
        age: formData.age ? parseInt(formData.age) : null,
        blood_group: formData.blood_group || null,
        updated_at: new Date().toISOString()
      };
  
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session.user.id);
  
      if (error) throw error;
  
      setProfile(prev => ({ ...prev!, ...updates }));
      setEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error("Profile update failed:", error);
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  }
  
  async function handleProfilePictureUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setLoading(prev => ({ ...prev, avatar: true }));
    setError('');
    setSuccess('');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      // Delete old avatar if exists
      if (profile?.avatar_url && !profile.avatar_url.includes(DEFAULT_AVATAR)) {
        const oldPath = profile.avatar_url.split('/').pop();
        await supabase.storage.from('avatars').remove([oldPath!]);
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev!, avatar_url: publicUrl }));
      setSuccess('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload profile picture. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, avatar: false }));
    }
  }

  if (loading.profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Sign Out Button at Top Right */}
      <div className="w-full max-w-4xl flex justify-end mb-4">
  <button
    onClick={async () => { 
      await supabase.auth.signOut(); 
      navigate('/'); 
    }}
    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    aria-label="Sign out"
  >
    <LogOut className="w-4 h-4 mr-2" />
    Sign Out
  </button>
</div>
      
      {/* Success/Error Messages */}
      {(error || success) && (
        <div className="w-full max-w-3xl mb-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
              <button 
                onClick={() => setError('')}
                className="absolute top-0 right-0 px-2 py-1"
                aria-label="Dismiss error"
              >
                &times;
              </button>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
              <button 
                onClick={() => setSuccess('')}
                className="absolute top-0 right-0 px-2 py-1"
                aria-label="Dismiss success message"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      )}

      <div className="max-w-3xl w-full bg-white shadow rounded-lg overflow-hidden p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative mb-4">
              <img
                src={profile?.avatar_url || DEFAULT_AVATAR}
                alt={`${profile?.full_name || 'User'}'s profile`}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {loading.avatar && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            

            <label className="cursor-pointer mb-6 w-full">
              <span className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
                {loading.avatar ? 'Uploading...' : <><Camera className="w-4 h-4 mr-2" /> <p> </p> Change Photo</>}
              </span>
              <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleProfilePictureUpload}
                className="hidden"
                disabled={loading.avatar}
                aria-label="Upload profile picture"
              />
            </label>
          </div>

          {/* Profile Details Section */}
          <div className="md:w-2/3">
            {editing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={loading.update}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading.update}
                    >
                      <option value="">Select Gender</option>
                      {GENDERS.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading.update}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="blood_group" className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      id="blood_group"
                      value={formData.blood_group}
                      onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading.update}
                    >
                      <option value="">Select Blood Group</option>
                      {BLOOD_GROUPS.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading.update}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-400 transition duration-200"
                    >
                      {loading.update ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      disabled={loading.update}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {profile?.full_name || 'Not provided'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {profile?.gender || 'Not provided'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Age</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {profile?.age || 'Not provided'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Blood Group</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {profile?.blood_group || 'Not provided'}
                  </p>
                </div>
                
                <button
                  onClick={() => setEditing(true)}
                  className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}