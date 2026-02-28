import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { jobs } from '../data/jobs';

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

const Careers: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
  const roles = jobs;
  const types = ['All', 'Full-time', 'Contract'];
  const [activeType, setActiveType] = React.useState<string>('All');
  const filtered = activeType === 'All' ? roles : roles.filter(r => r.type === activeType);
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
            <h1 className="text-4xl font-display font-bold">Careers</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">Join Wynqor and build world-class products and brands.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Perks</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Remote-first culture</li>
                  <li>Flexible hours</li>
                  <li>Learning budget</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Process</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Application review</li>
                  <li>Portfolio discussion</li>
                  <li>Final interview</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">What We Value</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Craft and speed</li>
                  <li>Ownership</li>
                  <li>Customer impact</li>
                </ul>
              </div>
            </div>
            <h2 className="mt-10 text-2xl font-bold text-secondary font-display">Open Roles</h2>
            <div className="mt-4 flex items-center gap-3">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold border ${activeType === t ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              {filtered.map((r) => (
                <div key={r.id} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-secondary">{r.title}</h3>
                  <div className="mt-2 text-sm text-slate-500">{r.location} • {r.type}</div>
                  {r.description && <p className="mt-2 text-sm text-slate-600">{r.description}</p>}
                  <button className="mt-4 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark font-bold">Apply</button>
                </div>
              ))}
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

export default Careers;
