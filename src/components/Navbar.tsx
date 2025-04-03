import { useState, useEffect, useRef } from 'react';
import { Menu,HandCoins ,X, User, LogIn, LogOut, Home, Info, Calendar, Users, Mail, Newspaper, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

const navLinks = [
  { name: 'Home', path: '/', icon: <Home size={18} className="mr-2" /> },
  { name: 'AboutUs', path: '/about', icon: <Info size={18} className="mr-2" /> },
  { name: 'Events', path: '/events', icon: <Calendar size={18} className="mr-2" /> },
  { name: 'Team', path: '/team', icon: <Users size={18} className="mr-2" /> },
  { name: 'Newsletters', path: '/newsletters', icon: <Newspaper size={18} className="mr-2" /> },
  { name: 'Contact', path: '/contact', icon: <Mail size={18} className="mr-2" /> }
];

interface UserProfile {
  full_name: string;
  avatar_url: string | null;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

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

  useEffect(() => {
    const checkOverflow = () => {
      if (actionsRef.current) {
        const isOverflowing = actionsRef.current.scrollWidth > actionsRef.current.clientWidth;
        setShowActionDropdown(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
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
    setProfileDropdownOpen(false);
    setActionsDropdownOpen(false);
    navigate('/');
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
      setActionsDropdownOpen(false);
    }, 500);
  };

  const NavLink = ({ link }: { link: typeof navLinks[0] }) => {
    const isActive = location.pathname === link.path;
    
    return (
      <Link
        to={link.path}
        className={`flex items-center px-3 py-2 rounded-full text-base font-medium transition-all ${
          isActive 
            ? 'text-blue-600 bg-blue-50' 
            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {link.icon}
        {link.name}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 w-full z-50 border-b border-gray-100">
      <style>{`
        @media (max-width: 1180px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }
        @media (min-width: 1181px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-toggle {
            display: none;
          }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className=" px-1 flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/National_Service_Scheme_Logo.svg/1200px-National_Service_Scheme_Logo.svg.png" alt="NSS Logo" className="h-16 w-auto transition-transform hover:scale-105" />
            </Link>
            <Link to="https://mmmut.ac.in/" className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/en/a/a8/Madan_Mohan_Malaviya_University_of_Technology_logo.png" alt="MMMUT Logo" className="h-16 w-auto transition-transform hover:scale-105" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav items-center">
            <div className="flex space-x-6 mr-8">
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} />
              ))}
            </div>

            <div className="flex items-center space-x-4" ref={actionsRef}>
              {!showActionDropdown ? (
                <>
                  <Link
                    to="https://razorpay.me/@nssmmmut"
                    className="bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium transition-all hover:bg-green-700 flex items-center shadow-sm hover:shadow-md whitespace-nowrap"
                  >
                    <HandCoins className='mr-1'/>
                    Donate
                  </Link>

                  {session ? (
                    <div className="relative">
                      <button
                        className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full p-1 pl-3 transition-all"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
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

                      {profileDropdownOpen && (
                        <div
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <LayoutDashboard size={16} className="mr-2" />
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                          >
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate('/auth')}
                      className="bg-blue-600 text-white px-5 py-2 rounded-full text-base font-medium transition-all hover:bg-blue-700 flex items-center shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      <LogIn size={16} className="mr-1" />
                      Login
                    </button>
                  )}
                </>
              ) : (
                <div className="relative">
                  <button
                    className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-all"
                    onClick={() => setActionsDropdownOpen(!actionsDropdownOpen)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="mr-2">Actions</span>
                    <ChevronDown size={16} />
                  </button>

                  {actionsDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to="https://razorpay.me/@nssmmmut"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setActionsDropdownOpen(false)}
                      >
                        <HandCoins className='mr-1'/>
                         Donate
                      </Link>
                      {session ? (
                        <>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={() => setActionsDropdownOpen(false)}
                          >
                            <LayoutDashboard size={16} className="mr-2" />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              setActionsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                          >
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            navigate('/auth');
                            setActionsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LogIn size={16} className="mr-2" />
                          Login
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-toggle items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg-custom:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} />
              ))}

              <div className="pt-2 space-y-2">
                <Link
                  to="https://razorpay.me/@nssmmmut"
                  className="block px-4 py-2 bg-green-600 text-white rounded-full text-base font-medium transition-colors hover:bg-green-700 text-center flex items-center justify-center"
                >
                  <HandCoins className='mr-1'/>
                   Donate
                </Link>

                {session ? (
                  <>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300"
                      >
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover rounded-full" />
                        ) : (
                          <User size={20} className="text-blue-600" />
                        )}
                      </button>
                    </div>

                    {profileDropdownOpen && (
                      <div className="mt-2 bg-white rounded-lg shadow-lg py-1 border border-gray-200 text-center">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          <LayoutDashboard size={16} className="mr-1" />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setProfileDropdownOpen(false);
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center justify-center"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 bg-blue-600 text-white rounded-full text-base font-medium transition-colors hover:bg-blue-700 text-center flex items-center justify-center"
                  >
                    <LogIn size={18} className="mr-1" />
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}