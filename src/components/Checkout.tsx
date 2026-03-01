import { Fragment, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { emailService, EmailData } from '../services/emailService';

interface CheckoutProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onBackToCart?: () => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onProviderClick?: () => void;
  onUserClick?: () => void;
  onSubmitSuccess?: (requestId?: string | null, error?: string) => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onBlogClick?: () => void;
  onHelpClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  billingName: string;
  billingAddress: string;
  gstin: string;
  description: string;
  deadline: string;
  budget: string;
  notes: string;
}

const Checkout = ({
  onHomeClick,
  onLoginClick,
  onBackToCart,
  onSearch,
  onCartClick,
  onUserClick,
  onSubmitSuccess,
  onAboutClick,
  onCareersClick,
  onBlogClick,
  onHelpClick,
  onTermsClick,
  onPrivacyClick
}: CheckoutProps) => {
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    billingName: '',
    billingAddress: '',
    gstin: '',
    description: '',
    deadline: '',
    budget: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_TOTAL_UPLOAD_MB = 4.5;

  // Auto-fill user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email
      }));
    }
  }, [isAuthenticated, user]);

  // Calculate totals (same as Cart component)
  const subtotal = cartItems.reduce((sum, item) => {
    const cleanPrice = item.price.replace('₹', '').replace(/,/g, '');
    return sum + (parseFloat(cleanPrice) * item.quantity);
  }, 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const breadcrumbItems = [
    { label: 'Home', href: '#', onClick: onHomeClick },
    { label: 'Services', href: '#', onClick: () => {} },
    { label: 'Cart', href: '#', onClick: onBackToCart },
    { label: 'Request Form', href: '#', current: true }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    // Filter valid file types and sizes
    const validFiles = newFiles.filter(file => {
      const isValidType = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    // Check for duplicates by name and size
    const uniqueFiles = validFiles.filter(newFile =>
      !files.some(existingFile =>
        existingFile.name === newFile.name && existingFile.size === newFile.size
      )
    );

    setFiles(prev => [...prev, ...uniqueFiles]);
  };

  const totalRawBytes = files.reduce((sum, f) => sum + f.size, 0);
  const totalRawMB = totalRawBytes / 1024 / 1024;
  const estimatedPayloadMB = (totalRawBytes * 4 / 3) / 1024 / 1024;
  const isOverUploadLimit = estimatedPayloadMB > MAX_TOTAL_UPLOAD_MB;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate unique request ID
      const requestId = `REQ-${Date.now().toString().slice(-6).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      // Prepare email data
      const emailData: EmailData = {
        // Client information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        billingName: formData.billingName,
        billingAddress: formData.billingAddress,
        gstin: formData.gstin,

        // Project details
        description: formData.description,
        deadline: formData.deadline,
        budget: formData.budget,
        notes: formData.notes,
        files: files, // Include attached files

        // Cart information
        cartItems,
        subtotal,
        serviceFee,
        total,

        // Request metadata
        requestId,
        submittedAt: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      // Send emails
      const emailResult = await emailService.sendEmails(emailData);

      if (emailResult.success) {
        sessionStorage.setItem('lastRequestId', requestId);
        const historyItem = {
          requestId,
          submittedAt: new Date().toISOString(),
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          cartItems,
          subtotal,
          serviceFee,
          total,
        };
        try {
          const key = user?.email ? `wynqor-requests:${user.email}` : 'wynqor-requests';
          const existing = localStorage.getItem(key);
          const arr = existing ? JSON.parse(existing) : [];
          arr.unshift(historyItem);
          localStorage.setItem(key, JSON.stringify(arr));
        } catch {
          try {
            const key = user?.email ? `wynqor-requests:${user.email}` : 'wynqor-requests';
            localStorage.setItem(key, JSON.stringify([historyItem]));
          } catch {
            try {
              const key = user?.email ? `wynqor-requests:${user.email}` : 'wynqor-requests';
              localStorage.removeItem(key);
            } catch { void 0; }
          }
        }
        clearCart();
        onSubmitSuccess?.(requestId);
      } else {
        throw new Error(emailResult.error || 'Failed to send emails');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      onSubmitSuccess?.(null, error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.description && !isOverUploadLimit;

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-40">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex items-center h-14 text-sm text-slate-500">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pr-4">
              {breadcrumbItems.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
                  )}
                  {item.current ? (
                    <span className="text-slate-900 font-semibold">{item.label}</span>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="w-full min-h-screen pb-24 pt-12">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <nav className="flex text-sm text-slate-500 mb-2">
                <button onClick={onHomeClick} className="hover:text-primary transition-colors">Home</button>
                <span className="mx-2 text-slate-300">/</span>
                <span className="hover:text-primary transition-colors">Services</span>
                <span className="mx-2 text-slate-300">/</span>
                <button onClick={onBackToCart} className="hover:text-primary transition-colors">Cart</button>
                <span className="mx-2 text-slate-300">/</span>
                <span className="text-primary font-medium">Request Form</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">Submit Your Service Request</h1>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs">1</span>
              <span className="text-primary font-bold">Cart Review</span>
              <span className="w-8 h-px bg-primary/30"></span>
              <span className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs">2</span>
              <span className="text-primary font-bold">Details & Specs</span>
              <span className="w-8 h-px bg-slate-200"></span>
              <span className="flex items-center justify-center size-6 rounded-full bg-slate-200 text-slate-500 text-xs">3</span>
              <span>Confirmation</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
            <div className="lg:col-span-8 space-y-8">
              {/* Client Information */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  <h2 className="text-lg font-bold text-secondary">Client Information</h2>
                </div>
                <div className="p-6 lg:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="billingName">
                        Billing Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="billingName"
                        name="billingName"
                        placeholder="e.g. Company Pvt Ltd"
                        type="text"
                        value={formData.billingName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="gstin">
                        GSTIN (Optional)
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="gstin"
                        name="gstin"
                        placeholder="e.g. 22AAAAA0000A1Z5"
                        type="text"
                        value={formData.gstin}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="billingAddress">
                        Billing Address
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="billingAddress"
                        name="billingAddress"
                        placeholder="Street, City, State, PIN"
                        type="text"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="fullName"
                        name="fullName"
                        placeholder="e.g. Alex Johnson"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="email"
                        name="email"
                        placeholder="e.g. alex@company.com"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="businessName">
                        Business Name <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                      </label>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 px-4 py-3"
                        id="businessName"
                        name="businessName"
                        placeholder="e.g. Wynqor Studios"
                        type="text"
                        value={formData.businessName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">description</span>
                  <h2 className="text-lg font-bold text-secondary">Project Details</h2>
                </div>
                <div className="p-6 lg:p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="description">
                      Project Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 resize-none px-4 py-3"
                      id="description"
                      name="description"
                      placeholder="Please describe your project goals, target audience, style preferences, and any specific requirements for the selected services..."
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      maxLength={2000}
                      required
                    />
                    <p className="text-xs text-slate-400 mt-2 text-right">
                      {formData.description.length}/2000 characters
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="deadline">
                        Ideal Delivery Deadline
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-600 px-4 py-3"
                          id="deadline"
                          name="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="budget">
                        Total Budget Range
                      </label>
                      <select
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-600 px-4 py-3"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="1">Less than ₹500</option>
                        <option value="2">₹500 - ₹1,000</option>
                        <option value="3">₹1,000 - ₹2,500</option>
                        <option value="4">₹2,500 - ₹5,000</option>
                        <option value="5">₹5,000+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Files & Notes */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">folder_open</span>
                  <h2 className="text-lg font-bold text-secondary">Reference Files & Notes</h2>
                </div>
                <div className="p-6 lg:p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Upload Reference Files
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                        isDragOver
                          ? 'border-primary bg-primary/5 bg-slate-100'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-primary/50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        multiple
                        accept=".svg,.png,.jpg,.jpeg,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                        </div>
                        <p className="text-sm font-medium text-slate-700">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG, or PDF (max. 10MB each)</p>
                      </label>
                    </div>

                    {/* Selected Files List */}
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-slate-700">Selected Files ({files.length})</p>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {files.map((file, index) => (
                            <div
                              key={`${file.name}-${file.size}-${index}`}
                              className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="material-symbols-outlined text-slate-400 text-base flex-shrink-0">
                                  {file.type.startsWith('image/') ? 'image' : 'description'}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-slate-700 font-medium truncate" title={file.name}>
                                    {file.name}
                                  </p>
                                  <p className="text-slate-400 text-xs">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setFiles(prev => prev.filter((_, i) => i !== index));
                                }}
                                className="text-slate-400 hover:text-rose-500 transition-colors p-1 flex-shrink-0"
                                title="Remove file"
                              >
                                <span className="material-symbols-outlined text-base">close</span>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div
                          className="mt-3 rounded-lg border px-3 py-2 text-xs flex items-start gap-2"
                          style={{ borderColor: isOverUploadLimit ? '#fecaca' : '#d1fae5', backgroundColor: isOverUploadLimit ? '#fff1f2' : '#f0fdf4', color: isOverUploadLimit ? '#b91c1c' : '#065f46' }}
                        >
                          <span className="material-symbols-outlined text-base flex-shrink-0">
                            {isOverUploadLimit ? 'warning' : 'check_circle'}
                          </span>
                          <div className="leading-relaxed">
                            <div>
                              Total size: {totalRawMB.toFixed(2)} MB • Estimated payload: {estimatedPayloadMB.toFixed(2)} MB • Limit: {MAX_TOTAL_UPLOAD_MB.toFixed(1)} MB
                            </div>
                            {isOverUploadLimit && (
                              <div>
                                Reduce files or size to enable submission. Tip: compress images/PDFs or upload fewer files.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="notes">
                      Additional Notes <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 resize-none px-4 py-3"
                      id="notes"
                      name="notes"
                      placeholder="Any other details we should know about?"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={onBackToCart}
                  className="w-full sm:w-auto py-3.5 px-8 bg-transparent border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-sm font-bold group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full sm:w-auto py-4 px-10 bg-primary hover:bg-primary-dark disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:shadow-none transition-all transform active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-sm font-bold animate-spin">refresh</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {isOverUploadLimit ? 'Reduce Files to Submit' : 'Submit Request'}
                      <span className="material-symbols-outlined text-sm font-bold">send</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/80">
                    <h2 className="text-lg font-bold text-secondary font-display">Selected Services</h2>
                    <p className="text-xs text-slate-500 mt-1">These services will be included in your request.</p>
                  </div>
                  <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="size-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                          <img
                            alt={item.title}
                            className="w-full h-full object-cover"
                            src={item.image}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
                          <p className="text-xs text-slate-500 mb-1">{item.category} • {item.duration}</p>
                          <p className="text-sm font-bold text-primary">
                            {item.price}{item.quantity > 1 && ` × ${item.quantity}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 p-6 border-t border-slate-200">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Estimated Service Fees</span>
                        <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end pt-3 border-t border-slate-200/50">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Estimate</span>
                      <span className="text-2xl font-black text-secondary">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 flex gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submitting this request does not charge your card immediately. Our team will review your specifications and send a final invoice and contract within 24 hours.
                  </p>
                </div>
              </div>
            </div>
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

export default Checkout;
