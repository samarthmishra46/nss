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
  const [success, setSuccess] = useState('');
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Sign Out Button at Top Right */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={async () => { 
            await supabase.auth.signOut(); 
            navigate('/'); 
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          Sign Out
        </button>
      </div>
      
      <div className="max-w-3xl w-full bg-white shadow rounded-lg overflow-hidden p-6 text-center">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={profile?.avatar_url || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <label className="cursor-pointer mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Change Photo
            </span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Profile Details and Edit Button */}
        <div className="space-y-4 text-left">
          <p><strong>Full Name:</strong> {profile?.full_name || 'Not provided'}</p>
          <p><strong>Gender:</strong> {profile?.gender || 'Not provided'}</p>
          <p><strong>Age:</strong> {profile?.age || 'Not provided'}</p>
          <p><strong>Blood Group:</strong> {profile?.blood_group || 'Not provided'}</p>
        </div>
        
        {/* Buttons (Edit Profile and Change Photo) */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Edit Profile
          </button>
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
              Change Photo
            </span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
