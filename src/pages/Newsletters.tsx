import { useEffect, useState } from "react";
import {supabase} from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Newsletters() {
  const [news, setNews] = useState<{ id: number; title: string; date: string; description: string }[]>([]);
  const [registeredNews, setRegisteredNews] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const navigate = useNavigate();

  // 🟢 Fetch all news from Supabase
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase.from("news").select("*").order("date", { ascending: true });

      if (error) {
        console.error("Error fetching news:", error.message);
      } else {
        setNews(data);
      }
      setLoading(false); // ✅ Fix loading state
    };

    fetchNews();
  }, []);

  // 🟢 Check and set user session
  useEffect(() => {
    const checkUserSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      if (data?.user) {
        setUser({ id: data.user.id, email: data.user.email || "" });
        fetchRegisteredNews(data.user.id);
      }
    };

    checkUserSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
        fetchRegisteredNews(session.user.id);
      } else {
        setUser(null);
        setRegisteredNews([]);
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, []);

  // 🟢 Fetch registered news from Supabase
  const fetchRegisteredNews = async (userId: string) => {
    const { data, error } = await supabase
      .from("news_registrations")
      .select("news_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching registrations:", error.message);
    } else {
      setRegisteredNews(data.map((item) => item.news_id));
    }
  };

  // 🟢 Handle registration with unique constraint
  const handleRegister = async (newsId: number) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const { error } = await supabase.from("news_registrations").upsert([
      { user_id: user.id, news_id: newsId }
    ], { onConflict: 'user_id,news_id' }); // ✅ Prevent duplicates

    if (error) {
      alert("Something went wrong! Please try again.");
      console.error("Error registering:", error.message);
      return;
    }

    setRegisteredNews((prev) => [...prev, newsId]); // ✅ Update UI
  };

  return (
    <div className="pt-24">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Newsletters</h1>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">📢 Upcoming News & Events</h2>
        <p className="text-center text-gray-600 mt-2">Stay updated with the latest NSS activities.</p>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No upcoming news at the moment.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-100 rounded-md shadow transition-transform duration-300 ease-in-out transform hover:scale-105 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(item.date).toDateString()}</p>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                </div>

                {registeredNews.includes(item.id) ? (
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                    Registered ✅
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(item.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
