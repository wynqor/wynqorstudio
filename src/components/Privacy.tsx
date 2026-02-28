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

const Privacy: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
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
            <h1 className="text-4xl font-display font-bold">Privacy Policy</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">Your privacy matters. This policy explains how we handle data.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 grid lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1">
              <div className="sticky top-28 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-secondary mb-2">Contents</div>
                <ul className="space-y-2 text-sm">
                  <li><a href="#collection" className="hover:text-primary">Data Collection</a></li>
                  <li><a href="#usage" className="hover:text-primary">Usage</a></li>
                  <li><a href="#sharing" className="hover:text-primary">Sharing</a></li>
                  <li><a href="#security" className="hover:text-primary">Security</a></li>
                  <li><a href="#rights" className="hover:text-primary">Your Rights</a></li>
                </ul>
              </div>
            </aside>
            <div className="lg:col-span-3 space-y-8 text-slate-600">
              <div id="collection">
                <h2 className="text-xl font-bold text-secondary">Data Collection</h2>
                <p className="mt-2">We collect minimal data necessary to provide services, such as contact details and project information.</p>
              </div>
              <div id="usage">
                <h2 className="text-xl font-bold text-secondary">Usage</h2>
                <p className="mt-2">Data is used to improve experience, communicate updates, and deliver requested services.</p>
              </div>
              <div id="sharing">
                <h2 className="text-xl font-bold text-secondary">Sharing</h2>
                <p className="mt-2">We do not sell personal data. Data may be shared with service providers strictly to deliver services.</p>
              </div>
              <div id="security">
                <h2 className="text-xl font-bold text-secondary">Security</h2>
                <p className="mt-2">We use best practices to protect data in transit and at rest.</p>
              </div>
              <div id="rights">
                <h2 className="text-xl font-bold text-secondary">Your Rights</h2>
                <p className="mt-2">You can request access, correction, or deletion of your data by contacting support.</p>
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

export default Privacy;
