import React, { useState } from 'react';
import { 
  LogOut, 
  Crown, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  ChevronDown,
  Check
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export interface LoginButtonProps {
  language?: 'en' | 'my';
  className?: string;
  variant?: 'default' | 'compact' | 'header' | 'pill';
  showAdminBadge?: boolean;
  onAdminStatusChange?: (isAdmin: boolean) => void;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  language = 'en',
  className = '',
  variant = 'default',
  showAdminBadge = true,
}) => {
  const {
    user,
    userEmail,
    userName,
    userAvatar,
    isAdmin,
    loading,
    error,
    signInWithGoogle,
    signOut,
  } = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        console.error('Google Sign-In Error:', result.error);
        setIsSigningIn(false);
      }
    } catch (err) {
      console.error('Google Sign-In Exception:', err);
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      setDropdownOpen(false);
    } finally {
      setIsSigningOut(false);
    }
  };

  // Google 'G' official SVG icon
  const GoogleIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );

  // 1. Loading State
  if (loading) {
    return (
      <div
        className={`h-10 px-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center gap-2 text-xs font-semibold ${className}`}
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span className="font-myanmar">{language === 'my' ? 'စစ်ဆေးနေပါသည်...' : 'Checking...'}</span>
      </div>
    );
  }

  // 2. Unauthenticated State (Render Sign In Button)
  if (!user) {
    if (variant === 'compact') {
      return (
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isSigningIn}
          className={`h-9 px-3 rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-border-subtle dark:border-neutral-700 text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs disabled:opacity-60 font-myanmar ${className}`}
          title={language === 'my' ? 'Google အကောင့်ဖြင့် ဝင်ရောက်ရန်' : 'Sign in with Google'}
          id="google-login-btn-compact"
        >
          {isSigningIn ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <GoogleIcon />}
          <span>{language === 'my' ? 'ဝင်ရောက်ရန်' : 'Login'}</span>
        </button>
      );
    }

    if (variant === 'pill') {
      return (
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isSigningIn}
          className={`h-8 px-3 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs disabled:opacity-60 font-myanmar ${className}`}
          id="google-login-btn-pill"
        >
          {isSigningIn ? <Loader2 className="w-3 h-3 animate-spin" /> : <GoogleIcon />}
          <span>{language === 'my' ? 'Google ဝင်ရန်' : 'Sign in'}</span>
        </button>
      );
    }

    // Default Full Variant
    return (
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isSigningIn}
        className={`h-10 px-4 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-border-subtle dark:border-neutral-700 text-xs font-bold flex items-center gap-2.5 transition cursor-pointer shadow-2xs hover:shadow-xs disabled:opacity-60 font-myanmar ${className}`}
        title={language === 'my' ? 'Google အကောင့်ဖြင့် ဝင်ရောက်ရန်' : 'Sign in with Google OAuth'}
        id="google-login-btn"
      >
        {isSigningIn ? <Loader2 className="w-4 h-4 animate-spin text-neutral-600" /> : <GoogleIcon />}
        <span className="whitespace-nowrap">
          {language === 'my' ? 'Google ဖြင့် ဝင်ရောက်ရန်' : 'Sign In with Google'}
        </span>
      </button>
    );
  }

  // 3. Authenticated State (Render User Profile + Admin Badge + Sign Out)
  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      {/* User Info Capsule */}
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1] cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition shadow-2xs select-none"
        title={
          isAdmin
            ? (language === 'my' ? 'အက်ဒမင် (Admin) အဖြစ် စစ်ဆေးအတည်ပြုထားပါသည်' : 'Verified Administrator')
            : (language === 'my' ? 'သာမန်အသုံးပြုသူ (User)' : 'Standard User Account')
        }
        id="user-profile-capsule"
      >
        {/* User Avatar */}
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName || 'User'}
            className="w-6 h-6 rounded-full object-cover border border-emerald-500/40 shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
            {(userName || 'U').charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name & Role Text */}
        <div className="text-left hidden sm:block max-w-[150px]">
          <div className="text-xs font-bold text-black dark:text-white comfort:text-[#231f1a] flex items-center gap-1.5 leading-tight truncate">
            <span className="truncate">{userName || 'Google User'}</span>

            {/* Conditionally Render Admin Badge based on VITE_ADMIN_EMAILS check */}
            {showAdminBadge && (
              isAdmin ? (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 shrink-0 font-myanmar">
                  <Crown className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                  Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 shrink-0 font-myanmar">
                  <User className="w-2.5 h-2.5 text-emerald-600" />
                  User
                </span>
              )
            )}
          </div>
          {userEmail && (
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono block leading-tight truncate">
              {userEmail}
            </span>
          )}
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Quick Sign Out Button */}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="h-10 px-2.5 sm:px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 font-myanmar"
        title={language === 'my' ? 'အကောင့်မှ ထွက်မည်' : 'Sign out'}
        id="google-logout-btn"
      >
        {isSigningOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
        <span className="hidden md:inline">{language === 'my' ? 'ထွက်မည်' : 'Log Out'}</span>
      </button>

      {/* User Details Dropdown Menu */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-12 z-50 w-72 p-4 rounded-2xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName || 'User'}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                  {(userName || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-black dark:text-white comfort:text-[#231f1a] truncate">
                  {userName || 'Google User'}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                  {userEmail}
                </div>
              </div>
            </div>

            {/* Admin Verification Result */}
            <div className="my-3 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 comfort:bg-[#f2e9d8] border border-border-subtle dark:border-neutral-700/50">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 font-myanmar">
                  {language === 'my' ? 'အဆင့်အတန်း:' : 'Role Status:'}
                </span>
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-700 dark:text-amber-300">
                    <Crown className="w-3 h-3 text-amber-500" />
                    {language === 'my' ? 'အက်ဒမင် (Admin)' : 'Authorized Admin'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    <User className="w-3 h-3 text-emerald-500" />
                    {language === 'my' ? 'သာမန်အသုံးပြုသူ' : 'Standard User'}
                  </span>
                )}
              </div>

              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1.5 font-myanmar leading-relaxed">
                {isAdmin ? (
                  <div className="flex items-start gap-1 text-emerald-700 dark:text-emerald-400">
                    <Check className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>
                      {language === 'my'
                        ? 'VITE_ADMIN_EMAILS စာရင်းတွင် ပါဝင်သဖြင့် ပို့စ်တင်ခွင့်/ပြင်ဆင်ခွင့် အပြည့်အစုံ ရရှိထားပါသည်။'
                        : 'Verified in VITE_ADMIN_EMAILS. You have full upload and editing privileges.'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start gap-1 text-neutral-600 dark:text-neutral-400">
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5 text-amber-500" />
                    <span>
                      {language === 'my'
                        ? 'ဤအကောင့်သည် VITE_ADMIN_EMAILS တွင် မပါဝင်ပါ။ Admin ခွင့်ပြုချက်အတွက် wayh1360@gmail.com ဖြင့် ဝင်ရောက်ပါ။'
                        : 'This account is not in VITE_ADMIN_EMAILS. Admin buttons are hidden.'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sign Out Action inside Dropdown */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer font-myanmar"
            >
              {isSigningOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
              <span>{language === 'my' ? 'အကောင့်မှ ထွက်ခွာမည်' : 'Sign Out of Account'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginButton;
