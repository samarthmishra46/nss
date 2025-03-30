import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ full_name: string; avatar_url: string | null } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function handleAuthChange() {
      try {
        setLoading(true);
        setError(null);
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (mounted) {
          setSession(session);
          if (session?.user) {
            const profileData = await fetchUserProfile(session.user.id);
            setProfile(profileData);
            navigate('/dashboard', { replace: true });
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to authenticate');
          console.error('Authentication error:', err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    handleAuthChange();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session);
        if (session?.user) {
          try {
            const profileData = await fetchUserProfile(session.user.id);
            setProfile(profileData);
            navigate('/dashboard', { replace: true });
          } catch (err) {
            setError('Failed to load user profile');
            console.error('Profile fetch error:', err);
          }
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-2">
          <img 
            src="/nsslogo.png" 
            alt="Logo" 
            className="h-16 mx-auto mb-4"
            width={64}
            height={64}
          />
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4F46E5',
                  brandAccent: '#4338CA',
                  brandButtonText: 'white',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '8px',
                  inputBorderRadius: '8px',
                },
                space: {
                  buttonPadding: '0.625rem 1rem',
                  inputPadding: '0.625rem 1rem',
                },
                fontSizes: {
                  baseBodySize: '0.875rem',
                  baseInputSize: '0.875rem',
                  baseLabelSize: '0.875rem',
                }
              },
            },
            className: {
              anchor: 'text-blue-600 hover:text-blue-800 text-sm',
              button: 'w-full flex justify-center items-center gap-2',
              container: 'space-y-4',
              divider: 'bg-gray-200',
              input: 'w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              label: 'text-sm font-medium text-gray-700 mb-1 block',
              message: 'text-red-600 text-sm mt-1'
            },
          }}
          providers={['google', 'github']}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email Address',
                password_label: 'Password',
                email_input_placeholder: 'your@email.com',
                password_input_placeholder: '••••••••',
                button_label: 'Sign In',
              },
              sign_up: {
                email_label: 'Email Address',
                password_label: 'Password',
                email_input_placeholder: 'your@email.com',
                password_input_placeholder: '••••••••',
                button_label: 'Sign Up',
              },
            },
          }}
          theme="light"
        />

        <div className="text-center text-sm text-gray-600">
          <p>Don't have an account?{' '}
            <button 
              onClick={() => supabase.auth.signInWithOtp({ email: '' })}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}