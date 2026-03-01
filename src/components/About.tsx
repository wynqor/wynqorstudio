import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { metrics } from '../data/metrics';

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

const About: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
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
            <h1 className="text-4xl font-display font-bold">About Us</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">We build brand systems, digital products, and content that drive measurable growth.</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-black">{m.value}</div>
                  <div className="text-sm text-slate-300">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-primary mb-2">Our Customers</div>
              <p className="text-slate-600 text-sm">Startups, SMBs, and enterprises across ecommerce, fintech, education, hospitality, and healthcare. Engagements range from rapid turnarounds to long-term retainers.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <span className="px-3 py-1 rounded-full bg-slate-100">Ecommerce</span>
                <span className="px-3 py-1 rounded-full bg-slate-100">Fintech</span>
                <span className="px-3 py-1 rounded-full bg-slate-100">Education</span>
                <span className="px-3 py-1 rounded-full bg-slate-100">Hospitality</span>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-primary mb-2">Founding Story</div>
              <p className="text-slate-600 text-sm">Wynqor started as a distributed studio with a singular focus: blend strategy, design, and engineering to deliver outcomes. Today we operate globally with a remote-first team and on-ground partners.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Outcome-focused delivery</li>
                <li>Transparent execution</li>
                <li>Scalable systems and processes</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-primary mb-2">Trust & Reliability</div>
              <p className="text-slate-600 text-sm">Structured SOWs, clear timelines, and regular progress updates. Secure handling of assets and data per industry-standard practices.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Milestone-based workflows</li>
                <li>Versioned design and code handoffs</li>
                <li>Asset backups and encryption in transit</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-secondary font-display">Our Story</h2>
              <p className="text-slate-600">Wynqor started as a small design studio and evolved into a full-stack creative partner. We combine strategy, design, and engineering to ship outcomes, not just deliverables.</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-sm font-bold text-primary mb-2">Strategy</div>
                  <p className="text-slate-600 text-sm">Positioning, messaging, and roadmaps aligned to growth.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-sm font-bold text-primary mb-2">Design</div>
                  <p className="text-slate-600 text-sm">Brand systems and UI/UX with craft and speed.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-sm font-bold text-primary mb-2">Build</div>
                  <p className="text-slate-600 text-sm">Websites, apps, content, and campaigns that convert.</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary font-display">Principles</h3>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="p-4 rounded-lg bg-slate-50 border border-slate-200">Outcome over output</li>
                <li className="p-4 rounded-lg bg-slate-50 border border-slate-200">Clarity over complexity</li>
                <li className="p-4 rounded-lg bg-slate-50 border border-slate-200">Speed with rigor</li>
                <li className="p-4 rounded-lg bg-slate-50 border border-slate-200">Ownership and transparency</li>
              </ul>
            </div>
            <aside className="space-y-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="font-bold text-secondary mb-2">Leadership</div>
                <p className="text-slate-600 text-sm">Experienced designers, engineers, and strategists leading cross-functional teams.</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="font-bold text-secondary mb-2">Locations</div>
                <p className="text-slate-600 text-sm">Remote-first with a global footprint.</p>
              </div>
            </aside>
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

export default About;
