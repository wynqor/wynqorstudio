import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">W</div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Wynqor</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              The world's leading creative & design studio platform. Connecting elite talent with global opportunity.
            </p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href="#">
                <span className="font-bold text-sm">in</span>
              </a>
              <a className="size-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href="#">
                <span className="font-bold text-sm">x</span>
              </a>
              <a className="size-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href="#">
                <span className="font-bold text-sm">ig</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">Graphic Design</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Web Development</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Video Editing</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Digital Marketing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
          <p>© 2024 Wynqor Inc. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

