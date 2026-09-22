import React, { useState } from 'react';
import { 
  X, 
  LogOut, 
  ExternalLink, 
  Check, 
  Copy, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Mail,
  UserCheck,
  Crown,
  User
} from 'lucide-react';
import { useSupabaseUser, signInWithGoogle, signOutUser, getAdminEmails } from '../lib/supabaseAuth';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'my';
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const { user, userName, userEmail, userAvatar, isAdmin, loading } = useSupabaseUser();
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  // Supabase callback URL for this project
  const supabaseCallbackUrl = 'https://wdezdoqnbvfvwnsuysfn.supabase.co/auth/v1/callback';

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setErrorMessage('');
    const { error } = await signInWithGoogle();
    if (error) {
      console.error('Google sign-in error:', error);
      setErrorMessage(
        language === 'my'
          ? `Google ဖြင့် ဝင်ရောက်ရာတွင် အမှားဖြစ်ပေါ်ပါသည်: ${error}။ Supabase တွင် Google Provider ဖွင့်ထားခြင်း ရှိမရှိ စစ်ဆေးပါ။`
          : `Failed to sign in with Google: ${error}. Please ensure Google Provider is configured in Supabase.`
      );
      setSigningIn(false);
    }
    // Note: If successful, browser redirects to Google OAuth flow
  };

  const handleSignOut = async () => {
    setErrorMessage('');
    const { error } = await signOutUser();
    if (error) {
      setErrorMessage(error);
    }
  };

  const handleCopyCallback = () => {
    navigator.clipboard.writeText(supabaseCallbackUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] w-full max-w-lg rounded-3xl border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] flex items-center justify-center text-red-500 shadow-2xs">
              <Mail className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-black dark:text-white comfort:text-[#231f1a] font-myanmar">
                {language === 'my' ? 'Google အကောင့်ဖြင့် ဝင်ရောက်ခြင်း' : 'Google Account Sign In'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-myanmar">
                {language === 'my' 
                  ? 'Supabase Authentication မှတဆင့် Gmail ဖြင့် ဝင်ရောက်ပါ' 
                  : 'Authenticated via Supabase Google OAuth'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5 font-myanmar leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {user ? (
            /* Logged-in profile view with Admin vs User role status */
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border flex items-start sm:items-center gap-3.5 ${
                isAdmin 
                  ? 'bg-amber-500/10 dark:bg-amber-950/20 border-amber-500/30' 
                  : 'bg-emerald-500/10 dark:bg-emerald-950/20 border-emerald-500/20'
              }`}>
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName || 'User'} 
                    className={`w-12 h-12 rounded-full border-2 object-cover shrink-0 ${
                      isAdmin ? 'border-amber-500' : 'border-emerald-500'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-lg shrink-0 ${
                    isAdmin ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-sm sm:text-base text-black dark:text-white comfort:text-[#231f1a] truncate">
                      {userName || 'Authenticated User'}
                    </span>
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-400/20 border border-amber-500/30 px-2 py-0.5 rounded-full font-myanmar">
                        <Crown className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>{language === 'my' ? 'စနစ်စီမံခန့်ခွဲသူ (Admin)' : 'Administrator'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full font-myanmar">
                        <User className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{language === 'my' ? 'အသုံးပြုသူ (User Member)' : 'Standard User'}</span>
                      </span>
                    )}
                  </div>
                  
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate block mt-0.5 font-mono">
                    {userEmail}
                  </span>

                  <p className="mt-2 text-xs font-myanmar leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {isAdmin ? (
                      language === 'my' 
                        ? '✅ သင့် Gmail သည် Admin အဆင့်ဖြစ်သဖြင့် ပိုစ့်တင်ခြင်း၊ ဆေးကျမ်းများနှင့် ကဏ္ဍများ စီမံခွင့် အပြည့်အဝ ရရှိထားပါသည်။'
                        : '✅ Admin privileges verified: Full access to create/edit posts, herbal monographs, and directories.'
                    ) : (
                      language === 'my'
                        ? 'ℹ️ သင့် Gmail သည် ပုံမှန်အသုံးပြုသူအဆင့်ဖြစ်ပါသည်။ ကျန်းမာရေးဗဟုသုတများ ဖတ်ရှုနိုင်သော်လည်း ပိုစ့်တင်ရန် Admin Mail ဖြင့် ဝင်ရောက်ရန် လိုအပ်ပါသည်။'
                        : 'ℹ️ Standard user profile active. To access clinical posting and database controls, sign in with an authorized Admin email.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-2xl bg-neutral-100 hover:bg-red-50 hover:text-red-600 dark:bg-neutral-800 dark:hover:bg-red-950/40 text-neutral-700 dark:text-neutral-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-neutral-200 dark:border-neutral-700 font-myanmar"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{language === 'my' ? 'အကောင့်ထွက်မည် (Sign Out)' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login view */
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] font-myanmar leading-relaxed">
                {language === 'my'
                  ? 'သင့် Google (Gmail) အကောင့်ဖြင့် တိုက်ရိုက်ဝင်ရောက်ပြီး ကျန်းမာရေး သတင်းလွှာများ၊ ပို့စ်များနှင့် ကဏ္ဍများကို စီမံခန့်ခွဲနိုင်ပါသည်။'
                  : 'Sign in directly with your Google Gmail account to manage health bulletins, create dynamic posts, and update care modules.'}
              </p>

              {/* Official-style Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={signingIn || loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-neutral-800 comfort:bg-[#f2e9d8] hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 comfort:text-[#231f1a] font-bold text-sm flex items-center justify-center gap-3 transition shadow-sm border border-neutral-300 dark:border-neutral-700 comfort:border-[#ded4c1] cursor-pointer disabled:opacity-50"
              >
                {signingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-neutral-600" />
                    <span className="font-myanmar">{language === 'my' ? 'Google သို့ ချိတ်ဆက်နေသည်...' : 'Connecting to Google...'}</span>
                  </>
                ) : (
                  <>
                    {/* Multi-color Google SVG Icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span className="font-myanmar">
                      {language === 'my' ? 'Google (Gmail) ဖြင့် ဝင်ရောက်မည်' : 'Continue with Google'}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Supabase Configuration Guide Accordion */}
          <div className="pt-2 border-t border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
            <button
              type="button"
              onClick={() => setShowSetupGuide((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition py-1 cursor-pointer font-myanmar"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>{language === 'my' ? 'Supabase တွင် Google Login ချိတ်ဆက်နည်းလမ်းညွှန်' : 'What you need to do on Supabase (Step-by-step)'}</span>
              </div>
              {showSetupGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSetupGuide && (
              <div className="mt-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 comfort:bg-[#f2e9d8]/60 border border-neutral-200 dark:border-neutral-800 comfort:border-[#ded4c1] text-xs space-y-3 font-myanmar text-neutral-700 dark:text-neutral-300">
                <div className="font-bold text-black dark:text-white text-xs mb-1">
                  {language === 'my' ? 'Google Login အလုပ်လုပ်ရန် Supabase တွင် လုပ်ဆောင်ရန်များ:' : 'Follow these 3 quick steps in Supabase Dashboard:'}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-black dark:text-white">Authentication &gt; Providers &gt; Google:</strong>
                      <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                        {language === 'my' 
                          ? 'Supabase Dashboard တွင် "Authentication" &gt; "Providers" &gt; "Google" သို့သွားပြီး "Enable Google provider" ကို ဖွင့်ပါ။'
                          : 'In your Supabase Dashboard, go to "Authentication" > "Providers" > "Google" and toggle "Enable Google provider".'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-black dark:text-white">Callback URL in Google Cloud Console:</strong>
                      <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                        {language === 'my' 
                          ? 'Google Cloud Console &gt; Credentials ၏ "Authorized redirect URIs" တွင် အောက်ပါ Callback URL ကို ထည့်သွင်းပေးပါ:'
                          : 'In Google Cloud Console > Credentials, add this Callback URL under "Authorized redirect URIs":'}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                        <span className="truncate flex-1">{supabaseCallbackUrl}</span>
                        <button
                          type="button"
                          onClick={handleCopyCallback}
                          className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 font-sans text-[10px] font-bold flex items-center gap-1 transition shrink-0 cursor-pointer"
                        >
                          {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-black dark:text-white">Client ID &amp; Secret:</strong>
                      <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                        {language === 'my' 
                          ? 'Google Cloud မှ ရရှိသော "Client ID" နှင့် "Client Secret" ကို Supabase Google Provider ထဲသို့ ထည့်ပြီး "Save" နှိပ်ပါ။'
                          : 'Paste your Client ID and Client Secret from Google Cloud into the Supabase Google Provider settings and click "Save".'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 comfort:bg-[#f2e9d8]/50 border-t border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 font-myanmar">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{language === 'my' ? 'လုံခြုံသော Supabase OAuth ၂၅၆-ဘစ် စနစ်' : 'Secure Supabase OAuth 2.0'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer font-myanmar"
          >
            {language === 'my' ? 'ပိတ်မည်' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
