import React, { useState } from 'react';

interface HeroProps {
  onSearch?: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };
  return (
    <section className="relative bg-secondary min-h-[600px] flex items-center py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Creative Studio Background"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCopIK18XDvERR1Q6YndzkXEwZFuY1as38tdmx2ubC0Uq5twGTSdRy8ZtyXBBO4m18w_qKLDi0NLj0h-tHXWqMH1GBUfLGLPpV67ncY4DpbZqoqt8yj65KbJFgNkFyT6upVS_SnZgUt-eVjwYfwchmYfQ3Th71u8K3BTn_rENRQ8SKwm0NyUBBjSYRnNve1B-BhOUz0lDg-ecBwdxJCHMtPHVmJ322aXOYGH57pfwUl1J-P80L2sIOVak6YeGdxw4I4qUgmRIWhbJEc"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-primary/20"></div>
      </div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none mix-blend-soft-light"></div>
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg shadow-black/10">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
            Accepting New Projects for Q4
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8 font-display">
            Crafting Digital <br />
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-200">Excellence.</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
              </svg>
            </span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed border-l-2 border-primary/50 pl-6">
            Wynqor is a global creative collective. We blend strategy, design, and technology to build brands that matter. From affordable solutions to premium enterprise packages.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-96 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
              <form onSubmit={handleSearchSubmit} className="relative w-full h-14">
                <input
                  className="w-full h-14 pl-5 pr-14 rounded-xl bg-slate-900/90 text-white placeholder:text-slate-400 focus:ring-0 border border-white/10 shadow-2xl"
                  placeholder="What service do you need?"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">search</span>
                </button>
              </form>
            </div>
            <span className="hidden sm:block text-slate-500 font-serif italic px-2">or</span>
            <button className="px-8 py-4 bg-white hover:bg-slate-50 text-secondary rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-0.5">
              Get Custom Quote
            </button>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-500 text-sm font-medium">
            <span className="uppercase tracking-widest text-xs text-slate-600 mb-1 w-full block">Trusted by</span>
            <span className="hover:text-white transition-colors cursor-default">Adobe</span>
            <span className="hover:text-white transition-colors cursor-default">Figma</span>
            <span className="hover:text-white transition-colors cursor-default">Shopify</span>
            <span className="hover:text-white transition-colors cursor-default">Webflow</span>
            <span className="hover:text-white transition-colors cursor-default">Google</span>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              alt="Team collaborating"
              className="w-full h-auto object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLqKN7izwbiUmkazVuSykHcmS3fOEOaNinbCErc_SNB-txaJIqfE3U3HoGAoYp22h5Yab-DI6fI4lZGYYjZsEdu1z5_UEjfKNAPc69nUbX_ny8lNVvs97KRuAu9Ro-L9Ni_mMXm7lyf6Ui33rG1mzlQWENaKlfnkbuBbKh_psOdw1Mgfz5xxd8mWNqd3MzjOz-RKt-o1IqnL3mFTT5amF5y5U0XHQzxtVApouU5a17ZwYg4XE73Bd8hYQstVT7rqilZiyHpzjls_50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-serif italic text-lg opacity-90">"Design is intelligence made visible."</p>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-emerald-400 rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

