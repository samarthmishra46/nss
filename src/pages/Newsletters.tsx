import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Newsletters() {
  const [news, setNews] = useState<{ id: number; title: string; description: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [registeredNews, setRegisteredNews] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        fetchRegisteredNews(session.user.id);
      }
    };

    const fetchNews = async () => {
      const { data, error } = await supabase.from("news").select("*").order("date", { ascending: true });
      if (error) {
        console.error("Error fetching news:", error.message);
      } else {
        setNews(data);
      }
      setLoading(false);
    };

    const fetchRegisteredNews = async (userId: string) => {
      const { data, error } = await supabase.from("registrations").select("news_id").eq("user_id", userId);
      if (error) {
        console.error("Error fetching registered news:", error.message);
      } else {
        setRegisteredNews(data.map((item) => item.news_id));
      }
    };

    fetchUser();
    fetchNews();
  }, []);

  const handleRegister = async (newsId: number) => {
    if (!user) {
      navigate("/auth"); // Redirect to auth page if not logged in
      return;
    }

    const { data, error } = await supabase.from("registrations").insert([{ user_id: user.id, news_id: newsId }]);

    if (error) {
      console.error("Error registering:", error.message);
      alert("Registration failed. Try again!");
    } else {
      setRegisteredNews((prev) => [...prev, newsId]); // Update state to mark as registered
    }
  };

  return (
    <div className="pt-24">
      {/* Header Section */}
      <div className="text-4xl font-bold text-gray-900 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Newsletters</h1>
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">📢 Upcoming News & Events</h2>
        <p className="text-gray-600 text-center mt-2">Stay updated with the latest NSS activities.</p>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No upcoming news at the moment.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {news.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 bg-gray-100 rounded-md shadow-lg flex justify-between items-center cursor-pointer"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(item.date).toDateString()}</p>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                </div>
                {registeredNews.includes(item.id) ? (
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(item.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
