import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="bg-primary rounded-[2.5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 font-display tracking-tight">
              Ready to transform your brand?
            </h2>
            <p className="text-emerald-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of successful businesses using Wynqor for their creative needs. Stop waiting, start creating.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-4 bg-white text-primary text-lg font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Get Started Now
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white text-lg font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
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

