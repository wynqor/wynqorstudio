import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { emailService } from '../services/emailService';
import { useToast } from './ToastProvider';

interface BecomeProviderProps {
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

const BecomeProvider = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }: BecomeProviderProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const MAX_TOTAL_UPLOAD_MB = 4.5;
  const totalRawBytes = files.reduce((sum, f) => sum + f.size, 0);
  const totalRawMB = totalRawBytes / 1024 / 1024;
  const estimatedPayloadMB = (totalRawBytes * 4 / 3) / 1024 / 1024;
  const isOverUploadLimit = estimatedPayloadMB > MAX_TOTAL_UPLOAD_MB;
  const isFormValid = fullName && email && skills && !isOverUploadLimit;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f =>
        ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(f.type) &&
        f.size <= 10 * 1024 * 1024
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    try {
      const res = await emailService.sendProviderApplication({
        fullName,
        email,
        phone,
        country,
        skills,
        portfolio,
        notes,
        files
      });
      if (res.success) {
        addToast({ type: 'success', title: 'Application Submitted', message: 'We have received your provider application.' });
        // Reset full form
        setFullName('');
        setEmail('');
        setPhone('');
        setSkills('');
        setPortfolio('');
        setCountry('');
        setNotes('');
        setFiles([]);
      } else {
        addToast({ type: 'error', title: 'Submission Failed', message: res.error || 'Please try again.' });
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Submission Failed', message: 'Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header onHomeClick={onHomeClick} onLoginClick={onLoginClick} onSearch={onSearch} onCartClick={onCartClick} onUserClick={onUserClick} />
      <main className="w-full min-h-screen pb-24 pt-12">
        <div className="max-w-[960px] mx-auto px-4 lg:px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">Become a Provider</h1>
          <p className="text-slate-600 mb-8">Apply to join Wynqor’s global network of vetted creatives.</p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Full Name</span>
                <input className="form-input rounded-lg border border-slate-300 bg-slate-50 h-11 px-4" value={fullName} onChange={e=>setFullName(e.target.value)} required />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input type="email" className="form-input rounded-lg border border-slate-300 bg-slate-50 h-11 px-4" value={email} onChange={e=>setEmail(e.target.value)} required />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Phone</span>
                <input className="form-input rounded-lg border border-slate-300 bg-slate-50 h-11 px-4" value={phone} onChange={e=>setPhone(e.target.value)} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Country</span>
                <input className="form-input rounded-lg border border-slate-300 bg-slate-50 h-11 px-4" value={country} onChange={e=>setCountry(e.target.value)} />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">Skills (comma-separated)</span>
              <input className="form-input rounded-lg border border-slate-300 bg-slate-50 h-11 px-4" value={skills} onChange={e=>setSkills(e.target.value)} required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">Portfolio Link</span>
              <input className="form-input rounded-lg border border-slate-300 bg-slate-50 h-11 px-4" value={portfolio} onChange={e=>setPortfolio(e.target.value)} placeholder="https://..." />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">Notes (optional)</span>
              <textarea className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3" rows={4} value={notes} onChange={e=>setNotes(e.target.value)} />
            </label>
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Upload Resume/Work Samples (PDF/Images, max 10MB each)</span>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg" multiple onChange={handleFileChange} />
              <div className="text-xs text-slate-600">
                Total: {totalRawMB.toFixed(2)} MB • Estimated payload: {estimatedPayloadMB.toFixed(2)} MB • Limit: {MAX_TOTAL_UPLOAD_MB.toFixed(1)} MB
                {isOverUploadLimit && <span className="text-rose-600 ml-2">Reduce files to submit.</span>}
              </div>
            </div>
            <button type="submit" disabled={!isFormValid || isSubmitting}
                    className="py-3 px-6 bg-primary text-white rounded-lg font-bold disabled:bg-slate-400">
              {isSubmitting ? 'Submitting...' : (isOverUploadLimit ? 'Reduce Files to Submit' : 'Submit Application')}
            </button>
          </form>
        </div>
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

export default BecomeProvider;
