import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mglbdxdgndniiumoqqht.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbGJkeGRnbmRuaWl1bW9xcWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDk4NDUsImV4cCI6MjA1NjU4NTg0NX0.NniEHQfC_X_HSjgNLDN8KR8kV7Z_xck7gMrb1pMTHcg'
);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Volunteers', path: '/volunteers' },
  { name: 'Team', path: '/team' },
  { name: 'Newsletters', path: '/newsletters' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleAuthClick = async () => {
    if (session) {
      await supabase.auth.signOut(); // Sign out user
      setSession(null);
    } else {
      navigate('/auth'); // Redirect to login page
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/nsslogo.png" 
                alt="NSS Logo" 
                className="h-16 w-auto"
              />
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
            
            {/* Login / Logout Button */}
            <button
              onClick={handleAuthClick}
              className={`px-4 py-2 rounded-md font-medium transition-colors ml-auto ${
                session ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-800'
              }`}
            >
              {session ? 'Sign Out' : 'Log In'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
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
            {/* Mobile Login / Logout Button */}
            <button
              onClick={() => {
                handleAuthClick();
                setIsOpen(false);
              }}
              className={`w-full block text-center px-4 py-2 rounded-md font-medium transition-colors ${
                session ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-800'
              }`}
            >
              {session ? 'Sign Out' : 'Log In'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
