import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const [profile, setProfile] = useState<{ full_name: string; avatar_url: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
    } else {
      setProfile(data);
    }
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Upload profile picture
  const uploadAvatar = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, { upsert: true });

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError.message);
      setLoading(false);
      return;
    }

    // Get the public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    updateProfile(data.publicUrl);
  };

  // Update profile with avatar URL
  const updateProfile = async (avatarUrl: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      setProfile((prev) => prev && { ...prev, avatar_url: avatarUrl });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img
          src={profile?.avatar_url || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
        />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button
          onClick={uploadAvatar}
          disabled={loading}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-800"
        >
          {loading ? "Uploading..." : "Upload Avatar"}
        </button>
      </div>

      {/* User Info */}
      <p className="mt-4 text-lg font-medium">Name: {profile?.full_name || "N/A"}</p>
    </div>
  );
}
