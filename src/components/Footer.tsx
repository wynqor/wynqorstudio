import React, { useState } from 'react';
import { emailService } from '../services/emailService';
import { site } from '../data/site';
import logo from '../images/logo1.jpeg';
import { useToast } from './ToastProvider';

interface FooterProps {
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onBlogClick?: () => void;
  onHelpClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="pr-8">
            <div className="flex items-center gap-3 mb-8">
              <img src={logo} alt="Wynqor" className="size-10 rounded-xl shadow-lg shadow-primary/20 object-cover" />
              <h2 className="text-3xl font-bold text-white tracking-tight">Wynqor</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              The world's leading creative & design studio platform. Connecting elite talent with global opportunity.
            </p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href={site.socials.linkedin}>
                <span className="font-bold text-sm">in</span>
              </a>
              <a className="size-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href={site.socials.x}>
                <span className="font-bold text-sm">x</span>
              </a>
              <a className="size-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href={site.socials.instagram}>
                <span className="font-bold text-sm">ig</span>
              </a>
            </div>
            <div className="mt-8">
              <span className="block text-slate-300 text-sm font-semibold mb-3">Subscribe to our newsletter</span>
              <NewsletterForm />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><button onClick={onAboutClick} className="hover:text-primary transition-colors bg-transparent border-0 p-0 text-left">About Us</button></li>
              <li><button onClick={onCareersClick} className="hover:text-primary transition-colors bg-transparent border-0 p-0 text-left">Careers</button></li>
              <li><button onClick={onBlogClick} className="hover:text-primary transition-colors bg-transparent border-0 p-0 text-left">Blog</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><button onClick={onHelpClick} className="hover:text-primary transition-colors bg-transparent border-0 p-0 text-left">Help Center</button></li>
              <li><button onClick={onTermsClick} className="hover:text-primary transition-colors bg-transparent border-0 p-0 text-left">Terms of Service</button></li>
              <li><button onClick={onPrivacyClick} className="hover:text-primary transition-colors bg-transparent border-0 p-0 text-left">Privacy Policy</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-500 text-base">mail</span>
                <a className="hover:text-primary transition-colors" href={`mailto:${site.companyEmail}`}>{site.companyEmail}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-500 text-base">call</span>
                <a className="hover:text-primary transition-colors" href={`tel:${site.phone.replace(/\\s/g, '')}`}>{site.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-slate-500 text-base">location_on</span>
                <span>{site.location}</span>
              </li>
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
 
const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      addToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }
    setLoading(true);
    const res = await emailService.sendNewsletter(email.trim());
    setLoading(false);
    if (res.success) {
      addToast({ type: 'success', title: 'Subscribed', message: 'Check your email for confirmation.' });
      setEmail('');
    } else {
      addToast({ type: 'error', title: 'Subscription Failed', message: res.error || 'Please try again later.' });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <div className="flex gap-3">
        <input
          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Your email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2.5 rounded-lg ${loading ? 'bg-slate-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} text-white font-bold transition-colors`}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      
    </form>
  );
};

