import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface SuccessProps {
  requestId: string;
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onSearch?: (query: string) => void;
  onExploreServices?: () => void;
  onCartClick?: () => void;
  onDashboardClick?: () => void;
  onProviderClick?: () => void;
  onUserClick?: () => void;
}

const Success: React.FC<SuccessProps> = ({
  requestId,
  onHomeClick,
  onLoginClick,
  onSearch,
  onExploreServices,
  onCartClick,
  onDashboardClick
  ,
  onUserClick
}) => {
  const [copiedId, setCopiedId] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(requestId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark flex flex-col min-h-screen">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
      />

      <main className="w-full flex-grow flex items-center justify-center py-12 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-light via-primary to-primary-dark"></div>
              <div className="absolute -top-24 -right-24 size-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 size-64 bg-emerald-50 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center size-24 rounded-full bg-emerald-50 text-primary mb-8 animate-[bounce_1s_ease-out_1]">
                  <span className="material-symbols-outlined fill text-[56px]">check_circle</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4 leading-tight">
                  Your Request Has Been <br/> Successfully Submitted!
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                  Thank you for choosing Wynqor. We've received your request and our team will review it shortly. You'll receive updates via email and on your dashboard.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 md:p-6 mb-10 border border-slate-100 inline-block w-full max-w-md">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Request ID</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-mono font-bold text-secondary tracking-widest">{requestId}</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-slate-400 hover:text-primary transition-colors"
                      title="Copy ID"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {copiedId ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  {copiedId && (
                    <p className="text-xs text-emerald-600 mt-1 font-medium">Copied to clipboard!</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <button
                    onClick={onDashboardClick}
                    className="w-full sm:w-auto py-4 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    Go to Dashboard
                  </button>
                  <button
                    onClick={onExploreServices}
                    className="w-full sm:w-auto py-4 px-8 bg-transparent border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 hover:bg-slate-50"
                  >
                    Explore More Services
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                    Check your email for confirmation
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">support_agent</span>
                    Need help? Contact Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;

