import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Use named import
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Adjust width as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuthClick = async () => {
    if (session) {
      await supabase.auth.signOut();
      setSession(null);
    } else {
      navigate('/auth');
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

            {/* Show More button if the screen is small */}
            {isSmallScreen && (
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
                >
                  More <ChevronDown className="ml-1" size={18} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <Link
                      to="/donate"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setMoreOpen(false)}
                    >
                      Donate
                    </Link>
                    <button
                      onClick={() => {
                        handleAuthClick();
                        setMoreOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {session ? 'Sign Out' : 'Log In'}
                    </button>
                  </div>
                )}
              </div>
            )}
<div></div>
<div></div>
            {/* Show Donate & Login Button normally on large screens */}
            {!isSmallScreen && (
              <>
                <Link
                  to="/donate"
                  className="bg-green-500 text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-green-700"
                >
                  Donate
                </Link>

                <button
                  onClick={handleAuthClick}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    session ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-800'
                  }`}
                >
                  {session ? 'Sign Out' : 'Log In'}
                </button>
              </>
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

            {/* Mobile More Menu */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="w-full text-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors hover:bg-gray-300"
              >
                More ▼
              </button>

              {moreOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-md">
                  <Link
                    to="/donate"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setMoreOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Donate
                  </Link>
                  <button
                    onClick={() => {
                      handleAuthClick();
                      setMoreOpen(false);
                      setIsOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {session ? 'Sign Out' : 'Log In'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
