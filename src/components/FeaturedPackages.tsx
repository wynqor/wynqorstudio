import React from 'react';
import { featuredPackages } from '../data/featuredPackages';

const FeaturedPackages: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-10 lg:p-14 ${pkg.tier === 'PREMIUM' ? 'bg-secondary text-white shadow-2xl' : 'bg-[#f1f5f2] text-secondary border border-primary/10 shadow-lg'} relative overflow-hidden flex flex-col justify-center group`}
            >
              {pkg.image && (
                <>
                  <img className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" src={pkg.image} />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent"></div>
                </>
              )}
              {pkg.tier === 'ENTERPRISE' && (
                <div className="absolute -right-20 -bottom-20 size-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
              )}
              <div className="relative z-10 max-w-sm">
                <span className={`inline-block px-3 py-1 rounded ${pkg.tier === 'PREMIUM' ? 'bg-white/10 border border-white/10 text-xs backdrop-blur-sm tracking-wider' : 'bg-primary/10 text-primary text-xs border border-primary/10 tracking-wider'} font-bold mb-4`}>
                  {pkg.tier}
                </span>
                <h3 className={`text-3xl font-serif mb-4 ${pkg.tier === 'ENTERPRISE' ? 'text-primary-dark' : ''}`}>{pkg.title}</h3>
                <p className={`${pkg.tier === 'PREMIUM' ? 'text-slate-300' : 'text-slate-600'} mb-8 leading-relaxed`}>{pkg.description}</p>
                <button className={`px-6 py-3 font-bold rounded-xl transition-colors ${pkg.tier === 'PREMIUM' ? 'bg-white text-secondary hover:bg-slate-200 shadow-lg' : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'}`}>
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;

