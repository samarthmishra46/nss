import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Team', path: '/team' },
  { name: 'Newsletters', path: '/newsletters' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  interface UserProfile {
    full_name: string;
    avatar_url: string | null;
  }

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Fetched session:', session); // Debugging
      setSession(session);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session); // Debugging
      setSession(session);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null); // Reset profile on logout
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      setProfile(data);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/nsslogo.png" alt="NSS Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Show Donate button normally on large screens */}
            <Link
              to="/donate"
              className="bg-green-500 text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-green-700"
            >
              Donate
            </Link>

            {/* Show Profile Picture or Dashboard Button */}
            {session ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-800"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-800"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Donate Button */}
            <Link
              to="/donate"
              className="block px-4 py-2 bg-green-500 text-white rounded-md font-medium transition-colors hover:bg-green-700 text-center"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>

            {/* Mobile Login / Dashboard Button */}
            {session ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-800"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-800"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
