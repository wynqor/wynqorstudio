import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface FailedProps {
  errorCode?: string;
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onSearch?: (query: string) => void;
  onTryAgain?: () => void;
  onContactSupport?: () => void;
  onCartClick?: () => void;
  onProviderClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onBlogClick?: () => void;
  onHelpClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const Failed: React.FC<FailedProps> = ({
  errorCode = 'ERR_REQ_TIMEOUT_504',
  onHomeClick,
  onLoginClick,
  onSearch,
  onTryAgain,
  onContactSupport,
  onCartClick,
  onAboutClick,
  onCareersClick,
  onBlogClick,
  onHelpClick,
  onTermsClick,
  onPrivacyClick
}) => {
  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark flex flex-col min-h-screen">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
      />

      <main className="w-full grow flex items-center justify-center py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative">
              <div className="h-2 w-full bg-rose-500"></div>
              <div className="p-8 md:p-14 text-center">
                <div className="mx-auto size-20 md:size-24 rounded-full bg-rose-50 flex items-center justify-center mb-8 ring-8 ring-rose-50/50 animate-pulse">
                  <span className="material-symbols-outlined text-rose-500 text-5xl md:text-6xl fill">cancel</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">Your Request Could Not Be Submitted</h1>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-10">
                  There was an issue processing your request. Please check your internet connection or the details you provided and try again.
                </p>
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-4">
                  <button
                    onClick={onContactSupport}
                    className="py-3.5 px-8 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-xl text-slate-500 group-hover:text-slate-700">support_agent</span>
                    Contact Support
                  </button>
                  <button
                    onClick={onTryAgain}
                    className="py-3.5 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-xl">refresh</span>
                    Try Again
                  </button>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-400">
                    Error Code: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">{errorCode}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Need immediate assistance? <button onClick={onContactSupport} className="text-primary font-bold hover:underline">Chat with an Agent</button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onBlogClick={onBlogClick}
        onHelpClick={onHelpClick}
        onTermsClick={onTermsClick}
        onPrivacyClick={onPrivacyClick}
      />
    </div>
  );
};

export default Failed;

