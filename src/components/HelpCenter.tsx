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

const HelpCenter: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
  const faqs = [
    { q: 'How do I request a service?', a: 'Browse services, add to cart, and checkout. You will receive a confirmation email.' },
    { q: 'Can I get a custom quote?', a: 'Yes. Use the Get Custom Quote option or contact support.' },
    { q: 'What payment methods are supported?', a: 'Cards and bank transfers are supported in upcoming releases.' },
    { q: 'How can I track my request?', a: 'You will receive email updates. Dashboard tracking is coming soon.' },
  ];
  const [query, setQuery] = React.useState('');
  const filteredFaqs = faqs.filter(f => (f.q + ' ' + f.a).toLowerCase().includes(query.toLowerCase()));
  const categories = [
    { title: 'Account', desc: 'Login, profile, security' },
    { title: 'Orders', desc: 'Requests, delivery, updates' },
    { title: 'Payments', desc: 'Billing, invoices, refunds' },
    { title: 'Services', desc: 'Scope, packages, add-ons' },
  ];
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
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
            <h1 className="text-4xl font-display font-bold">Help Center</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">Answers to common questions and helpful resources.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="flex gap-3">
              <input
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Search help topics"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="px-4 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark">Search</button>
            </div>
            <div className="mt-8 grid md:grid-cols-4 gap-6">
              {categories.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-sm font-bold text-secondary">{c.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Contact Support</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Email: support@wynqor.com</li>
                  <li>Phone: +91-00000-00000</li>
                  <li>Hours: Mon–Sat, 10:00–18:00 IST</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Order & Billing</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Invoices and GST details</li>
                  <li>Payment methods and refunds</li>
                  <li>Service scope and add-ons</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Project Delivery</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Milestones and timelines</li>
                  <li>Asset handoff formats</li>
                  <li>Revisions and approvals</li>
                </ul>
              </div>
            </div>
            <h2 className="mt-10 text-2xl font-bold text-secondary font-display">FAQs</h2>
            <div className="mt-6 space-y-4">
              {filteredFaqs.map((f, idx) => (
                <div key={idx} className="rounded-xl bg-white border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-sm font-bold text-secondary">{f.q}</span>
                    <span className="material-symbols-outlined text-slate-500">{openIndex === idx ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {openIndex === idx && (
                    <div className="px-4 pb-4 text-sm text-slate-600">{f.a}</div>
                  )}
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

export default HelpCenter;
