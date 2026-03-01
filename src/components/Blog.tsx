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

const Blog: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
  const posts = [
    { title: 'Designing for Conversion', excerpt: 'Principles to improve UX and business outcomes.', category: 'Design', author: 'Team Wynqor', date: 'Feb 2026', read: '6 min' },
    { title: 'Brand Systems at Scale', excerpt: 'Building consistent brands across touchpoints.', category: 'Brand', author: 'Studio', date: 'Jan 2026', read: '5 min' },
    { title: 'Modern Frontend Performance', excerpt: 'Techniques to ship fast and delight users.', category: 'Engineering', author: 'Engineering', date: 'Dec 2025', read: '8 min' },
    { title: 'Go-to-Market for Startups', excerpt: 'From zero to one with speed.', category: 'Growth', author: 'Growth', date: 'Nov 2025', read: '7 min' },
    { title: 'Packaging That Sells', excerpt: 'Designing packaging for shelf impact and compliance.', category: 'Design', author: 'Brand', date: 'Oct 2025', read: '6 min' },
    { title: 'Naming Sprint Framework', excerpt: 'How we run fast naming/tagline sprints.', category: 'Brand', author: 'Strategy', date: 'Sep 2025', read: '4 min' },
  ];
  const categories = ['All', 'Design', 'Brand', 'Engineering', 'Growth'];
  const [activeCategory, setActiveCategory] = React.useState('All');
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
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
            <h1 className="text-4xl font-display font-bold">Blog</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">Insights on design, technology, and growth.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-3 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border ${activeCategory === c ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {filtered.map((p, idx) => (
                <article key={idx} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wide">{p.category}</span>
                  <h3 className="mt-1 text-lg font-bold text-secondary">{p.title}</h3>
                  <div className="mt-1 text-xs text-slate-500">{p.author} • {p.date} • {p.read}</div>
                  <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold">Read</button>
                    <button className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold">Share</button>
                  </div>
                </article>
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

export default Blog;
