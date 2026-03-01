import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { jobs } from '../data/jobs';
import { emailService } from '../services/emailService';

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

const Careers: React.FC<PageProps> = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onUserClick, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }) => {
  const roles = jobs;
  const types = ['All', 'Full-time', 'Contract'];
  const [activeType, setActiveType] = React.useState<string>('All');
  const filtered = activeType === 'All' ? roles : roles.filter(r => r.type === activeType);
  const [showApply, setShowApply] = React.useState(false);
  const [showReferral, setShowReferral] = React.useState(false);
  const [applyData, setApplyData] = React.useState({ name: '', email: '', phone: '', area: 'Design', portfolio: '', github: '', note: '' });
  const [refData, setRefData] = React.useState({ referrerName: '', referrerEmail: '', candidateName: '', candidateEmail: '', profileLink: '', relation: '', note: '' });
  const [submitState, setSubmitState] = React.useState<{ ok?: boolean; err?: string }>({});
  const hiringOpen = false;

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState({});
    if (!applyData.name || !applyData.email) {
      setSubmitState({ err: 'Name and email are required.' });
      return;
    }
    const res = await emailService.sendCareerApplication({
      name: applyData.name,
      email: applyData.email,
      phone: applyData.phone,
      area: applyData.area,
      portfolio: applyData.portfolio,
      github: applyData.github,
      note: applyData.note,
    });
    setSubmitState(res.success ? { ok: true } : { err: res.error || 'Failed to submit.' });
    if (res.success) {
      setApplyData({ name: '', email: '', phone: '', area: 'Design', portfolio: '', github: '', note: '' });
      setShowApply(false);
    }
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState({});
    if (!refData.referrerName || !refData.referrerEmail || !refData.candidateName || !refData.candidateEmail) {
      setSubmitState({ err: 'Fill required fields.' });
      return;
    }
    const res = await emailService.sendCareerReferral({
      referrerName: refData.referrerName,
      referrerEmail: refData.referrerEmail,
      candidateName: refData.candidateName,
      candidateEmail: refData.candidateEmail,
      profileLink: refData.profileLink,
      relation: refData.relation,
      note: refData.note,
    });
    setSubmitState(res.success ? { ok: true } : { err: res.error || 'Failed to submit.' });
    if (res.success) {
      setRefData({ referrerName: '', referrerEmail: '', candidateName: '', candidateEmail: '', profileLink: '', relation: '', note: '' });
      setShowReferral(false);
    }
  };
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
            <h1 className="text-4xl font-display font-bold">Careers</h1>
            <p className="mt-3 text-slate-300 max-w-2xl">Join Wynqor and build world-class products and brands.</p>
          </div>
        </section>
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-primary mb-2">Benefits</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Remote-first with flexible hours</li>
                <li>Annual learning and conference budget</li>
                <li>Equipment stipend</li>
                <li>Paid time off and wellness days</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-primary mb-2">Hiring Process</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Application and profile review</li>
                <li>Portfolio or code walkthrough</li>
                <li>Role-fit conversation</li>
                <li>Offer and onboarding</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-primary mb-2">How to Apply</div>
              <p className="text-slate-600 text-sm">Share your portfolio, GitHub, and a short note about an outcome you shipped. We value craft, speed, and ownership.</p>
              <div className="mt-3 flex gap-3">
                <button onClick={() => setShowApply(true)} className="px-4 py-2 rounded-lg bg-primary text-white font-bold">Apply Now</button>
                <button onClick={() => setShowReferral(true)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold">Refer a Friend</button>
              </div>
            </div>
          </div>
        </section>
        {(showApply || showReferral) && (
          <section className="py-6">
            <div className="max-w-[900px] mx-auto px-4 lg:px-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-secondary font-display">{showApply ? 'General Application' : 'Referral'}</h2>
                  <button onClick={() => { setShowApply(false); setShowReferral(false); }} className="text-slate-500 hover:text-primary">Close</button>
                </div>
                {showApply && (
                  <form onSubmit={handleApplySubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Full Name*" value={applyData.name} onChange={e => setApplyData({ ...applyData, name: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Email*" type="email" value={applyData.email} onChange={e => setApplyData({ ...applyData, email: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Phone" value={applyData.phone} onChange={e => setApplyData({ ...applyData, phone: e.target.value })} />
                    <select className="px-3 py-2 rounded-lg border border-slate-200" value={applyData.area} onChange={e => setApplyData({ ...applyData, area: e.target.value })}>
                      <option>Design</option>
                      <option>Engineering</option>
                      <option>Brand</option>
                      <option>Content</option>
                      <option>Marketing</option>
                    </select>
                    <input className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2" placeholder="Portfolio URL" value={applyData.portfolio} onChange={e => setApplyData({ ...applyData, portfolio: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2" placeholder="GitHub (optional)" value={applyData.github} onChange={e => setApplyData({ ...applyData, github: e.target.value })} />
                    <textarea className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2" placeholder="Notes" rows={4} value={applyData.note} onChange={e => setApplyData({ ...applyData, note: e.target.value })} />
                    <div className="md:col-span-2 flex gap-3">
                      <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white font-bold">Submit Application</button>
                      <button type="button" onClick={() => setShowApply(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold">Cancel</button>
                    </div>
                  </form>
                )}
                {showReferral && (
                  <form onSubmit={handleReferralSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Your Name*" value={refData.referrerName} onChange={e => setRefData({ ...refData, referrerName: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Your Email*" type="email" value={refData.referrerEmail} onChange={e => setRefData({ ...refData, referrerEmail: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Candidate Name*" value={refData.candidateName} onChange={e => setRefData({ ...refData, candidateName: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200" placeholder="Candidate Email*" type="email" value={refData.candidateEmail} onChange={e => setRefData({ ...refData, candidateEmail: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2" placeholder="Profile/Portfolio URL" value={refData.profileLink} onChange={e => setRefData({ ...refData, profileLink: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2" placeholder="Relation (e.g., ex-teammate)" value={refData.relation} onChange={e => setRefData({ ...refData, relation: e.target.value })} />
                    <textarea className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2" placeholder="Notes" rows={4} value={refData.note} onChange={e => setRefData({ ...refData, note: e.target.value })} />
                    <div className="md:col-span-2 flex gap-3">
                      <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white font-bold">Submit Referral</button>
                      <button type="button" onClick={() => setShowReferral(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold">Cancel</button>
                    </div>
                  </form>
                )}
                {submitState.err && <div className="mt-3 text-sm text-rose-600">{submitState.err}</div>}
                {submitState.ok && <div className="mt-3 text-sm text-emerald-600">Submitted successfully.</div>}
              </div>
            </div>
          </section>
        )}
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Perks</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Remote-first culture</li>
                  <li>Flexible hours</li>
                  <li>Learning budget</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">Process</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Application review</li>
                  <li>Portfolio discussion</li>
                  <li>Final interview</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-primary mb-2">What We Value</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Craft and speed</li>
                  <li>Ownership</li>
                  <li>Customer impact</li>
                </ul>
              </div>
            </div>
            <h2 className="mt-10 text-2xl font-bold text-secondary font-display">Open Roles</h2>
            <div className="mt-4 flex items-center gap-3">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold border ${activeType === t ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {!hiringOpen ? (
              <div className="mt-6 p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                We’re not actively hiring right now. Share your profile via “Apply Now” or refer someone — we’ll reach out when there’s a match.
              </div>
            ) : (
              <div className="mt-6 grid md:grid-cols-2 gap-8">
                {filtered.map((r) => (
                  <div key={r.id} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-secondary">{r.title}</h3>
                    <div className="mt-2 text-sm text-slate-500">{r.location} • {r.type}</div>
                    {r.description && <p className="mt-2 text-sm text-slate-600">{r.description}</p>}
                    <button onClick={() => setShowApply(true)} className="mt-4 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark font-bold">Apply</button>
                  </div>
                ))}
              </div>
            )}
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

export default Careers;
