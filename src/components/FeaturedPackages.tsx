import React from 'react';

const FeaturedPackages: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-10 lg:p-14 bg-secondary text-white relative overflow-hidden flex flex-col justify-center shadow-2xl group">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS2pay7_G5FbVSwFqT59q3veJlgFN-Z5RIsHyHQ8RtB-CwcDSyK8zkQ69AU7kDHpnzh292XMzhKtsb2f_QlWY9Ec0wSDgqh2BxdyXDmsCKwbmQbIsPqA8StlmqOGhUp_dw6xnQ4DSL2Hx0Wb8WeNTW8AKxLjDdg0etN1JpgTMnmYCe_aPdl89HzzETJPK6DbAN1dWTl0KXy6yM6PSAY-sv4eGetav2HxK_RAJqVBWI3LNLjJhar69Mav75vva4llB4IjJTOsAZ1HOX"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent"></div>

            <div className="relative z-10 max-w-sm">
              <span className="inline-block px-3 py-1 rounded bg-white/10 text-xs font-bold mb-4 border border-white/10 backdrop-blur-sm tracking-wider">
                PREMIUM
              </span>
              <h3 className="text-3xl font-serif mb-4">Identity & Branding</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Comprehensive identity creation for Series A startups. Includes logo system, guidelines, and pitch deck.
              </p>
              <button className="px-6 py-3 bg-white text-secondary font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg">
                View Package
              </button>
            </div>
          </div>

          <div className="rounded-3xl p-10 lg:p-14 bg-[#f1f5f2] text-secondary relative overflow-hidden flex flex-col justify-center border border-primary/10 shadow-lg group">
            <div className="absolute -right-20 -bottom-20 size-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 max-w-sm">
              <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/10 tracking-wider">
                ENTERPRISE
              </span>
              <h3 className="text-3xl font-serif mb-4 text-primary-dark">Enterprise Web Solutions</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Scale your digital presence instantly. Full-stack development squads integrated into your workflow.
              </p>
              <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;

