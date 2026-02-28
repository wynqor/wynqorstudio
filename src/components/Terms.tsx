import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onUserClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onBlogClick?: () => void;
  onHelpClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const Terms: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
      />
      <main className="w-full min-h-screen">
        <section className="bg-secondary text-white py-16 border-b border-slate-800">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <h1 className="text-4xl font-display font-bold">Terms of Service</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">Please read these terms carefully before using Wynqor.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 grid lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1">
              <div className="sticky top-28 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-secondary mb-2">Contents</div>
                <ul className="space-y-2 text-sm">
                  <li><a href="#use" className="hover:text-primary">Use of Service</a></li>
                  <li><a href="#payments" className="hover:text-primary">Payments</a></li>
                  <li><a href="#ip" className="hover:text-primary">Intellectual Property</a></li>
                  <li><a href="#liability" className="hover:text-primary">Liability</a></li>
                  <li><a href="#changes" className="hover:text-primary">Changes</a></li>
                </ul>
              </div>
            </aside>
            <div className="lg:col-span-3 space-y-8 text-slate-600">
              <div id="use">
                <h2 className="text-xl font-bold text-secondary">Use of Service</h2>
                <p className="mt-2">By using Wynqor, you agree to our policies and guidelines. You must not misuse the platform or attempt to access data you do not own.</p>
              </div>
              <div id="payments">
                <h2 className="text-xl font-bold text-secondary">Payments</h2>
                <p className="mt-2">Payments are processed securely. Refunds may be issued per policy depending on delivery status and scope.</p>
              </div>
              <div id="ip">
                <h2 className="text-xl font-bold text-secondary">Intellectual Property</h2>
                <p className="mt-2">All trademarks and content belong to their respective owners. Delivered assets may include specific usage rights documented in proposals.</p>
              </div>
              <div id="liability">
                <h2 className="text-xl font-bold text-secondary">Liability</h2>
                <p className="mt-2">Wynqor is not liable for indirect or consequential damages. Maximum liability is limited to fees paid.</p>
              </div>
              <div id="changes">
                <h2 className="text-xl font-bold text-secondary">Changes</h2>
                <p className="mt-2">We may update these terms from time to time. Continued use constitutes acceptance.</p>
              </div>
            </div>
          </div>
        </section>
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

export default Terms;
