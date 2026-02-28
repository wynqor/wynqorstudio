import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="bg-gradient-to-br from-secondary to-primary rounded-[2.5rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(1000px_500px_at_20%_20%,rgba(255,255,255,0.2),transparent_60%)]"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(800px_400px_at_80%_80%,rgba(0,0,0,0.4),transparent_60%)]"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 font-display tracking-tight">
              Ready to transform your brand?
            </h2>
            <p className="text-slate-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of successful businesses using Wynqor for their creative needs. Stop waiting, start creating.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary text-lg font-bold rounded-xl hover:bg-slate-50 transition-all shadow-md hover:shadow-lg">
                Get Started Now
              </button>
              <button className="px-8 py-4 bg-white/10 border border-white/20 hover:border-white/40 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

