import { Menu, X, ChevronDown, User, LogIn, LogOut, Home, Info, Calendar, Users, Mail, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

const navLinks = [
  { name: 'Home', path: '/', icon: <Home size={18} className="mr-2" /> },
  { name: 'About Us', path: '/about', icon: <Info size={18} className="mr-2" /> },
  { name: 'Events', path: '/events', icon: <Calendar size={18} className="mr-2" /> },
  { name: 'Team', path: '/team', icon: <Users size={18} className="mr-2" /> },
  { name: 'Newsletters', path: '/newsletters', icon: <Newspaper size={18} className="mr-2" /> },
  { name: 'Contact', path: '/contact', icon: <Mail size={18} className="mr-2" /> }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
      setSession(session);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/nsslogo.png" 
                alt="NSS Logo" 
                className="h-16 w-auto transition-transform hover:scale-105" 
              />
            </Link>
          </div>

          {/* Desktop Navigation with improved symmetry */}
          <div className="hidden md:flex items-center">
            {/* Navigation Links with original font size */}
            <div className="flex space-x-6 mr-8"> {/* Added margin-right for separation */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-all flex items-center"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons with more spacing */}
            <div className="flex items-center space-x-4">
              {/* Donate Button */}
              <Link
                to="/donate"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-base font-medium transition-all hover:bg-green-700 flex items-center shadow-sm hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Donate
              </Link>

              {/* User Dropdown */}
              {session ? (
                <div className="relative group ml-2">
                  <button className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full p-1 pl-3 transition-all">
                    <span className="text-sm font-medium text-gray-700">
                      {profile?.full_name || 'Account'}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User size={16} className="text-blue-600" />
                      )}
                    </div>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center"
                    >
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium transition-all hover:bg-blue-700 flex items-center shadow-sm hover:shadow-md"
                >
                  <LogIn size={16} className="mr-1" />
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <div className="pt-2 space-y-2">
              <Link
                to="/donate"
                className="block px-4 py-2 bg-green-600 text-white rounded-md text-base font-medium transition-colors hover:bg-green-700 text-center flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Donate
              </Link>

              {session ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 bg-blue-600 text-white rounded-md text-base font-medium transition-colors hover:bg-blue-700 text-center flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} className="mr-1" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-base font-medium transition-colors hover:bg-gray-300 text-center flex items-center justify-center"
                  >
                    <LogOut size={18} className="mr-1" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 bg-blue-600 text-white rounded-md text-base font-medium transition-colors hover:bg-blue-700 text-center flex items-center justify-center"
                >
                  <LogIn size={18} className="mr-1" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}