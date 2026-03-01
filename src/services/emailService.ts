import { CartItem } from '../context/CartContext';

export interface EmailData {
  // Client information
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  billingName?: string;
  billingAddress?: string;
  gstin?: string;

  // Project details
  description: string;
  deadline: string;
  budget: string;
  notes: string;
  files?: File[]; // Reference files attached (currently not uploaded)

  // Cart information
  cartItems: CartItem[];
  subtotal: number;
  serviceFee: number;
  total: number;

  // Request metadata
  requestId: string;
  submittedAt: string;
}

class EmailService {
  private readonly COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || 'wynqor@gmail.com';

  private brandHeader(title: string) {
    return `
      <div style="background:#0f172a;color:#fff;padding:24px 20px;border-bottom:4px solid #3b82f6;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
        <div style="max-width:800px;margin:0 auto">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:36px;height:36px;border-radius:8px;background:#3b82f6;box-shadow:0 8px 20px rgba(59,130,246,.25)"></div>
            <div style="font-size:22px;font-weight:800;letter-spacing:.2px">Wynqor</div>
          </div>
          <div style="margin-top:8px;font-size:14px;color:#cbd5e1">${title}</div>
        </div>
      </div>`;
  }

  private section(title: string, contentHtml: string) {
    return `
      <div style="margin-top:24px">
        <div style="font-weight:800;color:#0f172a">${title}</div>
        <div style="margin-top:8px;color:#334155;font-size:14px;line-height:1.6">${contentHtml}</div>
      </div>`;
  }

  private table(rows: Array<{ left: string; right: string }>) {
    const items = rows.map(r => `
      <tr>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a">${r.left}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;text-align:right">${r.right}</td>
      </tr>`).join('');
    return `
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">${items}</table>`;
  }

  private money(n: number) {
    return `₹${n.toFixed(2)}`;
  }

  async sendCareerApplication(app: {
    name: string;
    email: string;
    phone?: string;
    area: string;
    portfolio?: string;
    github?: string;
    note?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const clientSubject = 'Application Received - Wynqor Careers';
      const companySubject = `New Career Application - ${app.name} (${app.area})`;
      const clientBody =
        `👋 Hi ${app.name},

Thanks for applying to Wynqor!

We have received your application${app.area ? ` for ${app.area}` : ''}.
Submitted: ${submittedAt}

Our team will review your profile and reach out if there is a match.

© 2024 Wynqor Inc.`;
      const companyBody =
        `🧑‍💼 CAREER APPLICATION

Name: ${app.name}
Email: ${app.email}${app.phone ? `\nPhone: ${app.phone}` : ''}
Area: ${app.area}${app.portfolio ? `\nPortfolio: ${app.portfolio}` : ''}${app.github ? `\nGitHub: ${app.github}` : ''}${app.note ? `\nNotes: ${app.note}` : ''}

Submitted: ${submittedAt}
`;
      const clientHtml =
        this.brandHeader('Application Received') +
        `<div style="padding:24px 20px;background:#fff"><div style="max-width:800px;margin:0 auto">
        ${this.section('Thanks for applying!', `We have received your application${app.area ? ` for <strong>${app.area}</strong>` : ''}. Our team will review your profile and reach out if there is a match.`)}
        ${this.section('Submission', `Submitted: <strong>${submittedAt}</strong>`)}
        </div></div>`;
      const companyHtml =
        this.brandHeader('New Career Application') +
        `<div style="padding:24px 20px;background:#fff"><div style="max-width:800px;margin:0 auto">
        ${this.table([
          { left: 'Name', right: app.name },
          { left: 'Email', right: app.email },
          ...(app.phone ? [{ left: 'Phone', right: app.phone }] : []),
          { left: 'Area', right: app.area },
          ...(app.portfolio ? [{ left: 'Portfolio', right: app.portfolio }] : []),
          ...(app.github ? [{ left: 'GitHub', right: app.github }] : []),
          ...(app.note ? [{ left: 'Notes', right: app.note }] : []),
          { left: 'Submitted', right: submittedAt },
        ])}
        </div></div>`;
      const payload = {
        clientTo: app.email,
        clientSubject,
        clientBody,
        clientHtml,
        companyTo: this.COMPANY_EMAIL,
        companySubject,
        companyBody,
        companyHtml,
      };
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) return { success: true };
      return { success: false, error: result?.error || 'Failed to submit application.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to submit application.' };
    }
  }

  async sendCareerReferral(ref: {
    referrerName: string;
    referrerEmail: string;
    candidateName: string;
    candidateEmail: string;
    profileLink?: string;
    relation?: string;
    note?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const clientSubject = 'Referral Submitted - Wynqor Careers';
      const companySubject = `New Referral - ${ref.candidateName} (by ${ref.referrerName})`;
      const clientBody =
        `👋 Hi ${ref.referrerName},

Thanks for referring ${ref.candidateName} to Wynqor.
Submitted: ${submittedAt}

We will review their profile and reach out if there is a match.

© 2024 Wynqor Inc.`;
      const companyBody =
        `👥 CAREER REFERRAL

Referrer: ${ref.referrerName} <${ref.referrerEmail}>
Candidate: ${ref.candidateName} <${ref.candidateEmail}>${ref.profileLink ? `\nProfile: ${ref.profileLink}` : ''}${ref.relation ? `\nRelation: ${ref.relation}` : ''}${ref.note ? `\nNotes: ${ref.note}` : ''}

Submitted: ${submittedAt}
`;
      const clientHtml =
        this.brandHeader('Referral Submitted') +
        `<div style="padding:24px 20px;background:#fff"><div style="max-width:800px;margin:0 auto">
        ${this.section('Thanks for the referral!', `We have received your referral for <strong>${ref.candidateName}</strong>. We will review their profile and reach out if there is a match.`)}
        ${this.section('Submission', `Submitted: <strong>${submittedAt}</strong>`)}
        </div></div>`;
      const companyHtml =
        this.brandHeader('New Referral') +
        `<div style="padding:24px 20px;background:#fff"><div style="max-width:800px;margin:0 auto">
        ${this.table([
          { left: 'Referrer', right: `${ref.referrerName} <${ref.referrerEmail}>` },
          { left: 'Candidate', right: `${ref.candidateName} <${ref.candidateEmail}>` },
          ...(ref.profileLink ? [{ left: 'Profile', right: ref.profileLink }] : []),
          ...(ref.relation ? [{ left: 'Relation', right: ref.relation }] : []),
          ...(ref.note ? [{ left: 'Notes', right: ref.note }] : []),
          { left: 'Submitted', right: submittedAt },
        ])}
        </div></div>`;
      const payload = {
        clientTo: ref.referrerEmail,
        clientSubject,
        clientBody,
        clientHtml,
        companyTo: this.COMPANY_EMAIL,
        companySubject,
        companyBody,
        companyHtml,
      };
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) return { success: true };
      return { success: false, error: result?.error || 'Failed to submit referral.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to submit referral.' };
    }
  }

  async sendEmails(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      if (import.meta.env.DEV) {
        console.log('📧 Processing request...', emailData.requestId);
      }

      if (import.meta.env.DEV) {
        console.log('📧 Preparing email payload for API...', emailData.requestId);
      }

      const clientEmailContent = this.generateClientEmailContent(emailData);
      const companyEmailContent = this.generateCompanyEmailContent(emailData);
      const clientHtml = this.generateClientEmailHtml(emailData);
      const companyHtml = this.generateCompanyEmailHtml(emailData);

      const attachments =
        emailData.files && emailData.files.length > 0
          ? await Promise.all(
              emailData.files.map(
                (file) =>
                  new Promise<{ filename: string; content: string; contentType: string }>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const result = reader.result as string;
                      const base64 = result.split(',')[1] || '';
                      resolve({ filename: file.name, content: base64, contentType: file.type });
                    };
                    reader.onerror = () => {
                      resolve({ filename: file.name, content: '', contentType: file.type });
                    };
                    reader.readAsDataURL(file);
                  })
              )
            )
          : [];

      const payload: Record<string, any> = {
        clientTo: emailData.email,
        clientSubject: `Service Request Confirmation - ${emailData.requestId}`,
        clientBody: clientEmailContent,
        clientHtml,
        companyTo: this.COMPANY_EMAIL,
        companySubject: `New Service Request - ${emailData.requestId}`,
        companyBody: companyEmailContent,
        companyHtml,
      };
      if (attachments.length > 0) {
        payload.attachments = attachments;
      }

      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        if (import.meta.env.DEV) {
          console.log('✅ All emails sent successfully via API!');
        }
        return { success: true };
      }

      if (import.meta.env.DEV) {
        console.error('❌ Email sending failed via API:', result);
      }
      return {
        success: false,
        error: result?.error || 'Failed to send emails via API.',
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('❌ Email sending failed:', error);
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send emails. Please check your EmailJS configuration.'
      };
    }
  }

  async sendNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const clientSubject = 'Welcome to Wynqor Newsletter';
      const companySubject = 'New Newsletter Subscription';
      const clientBody =
        `🎉 Thanks for subscribing!\n\nYou're now part of the Wynqor newsletter.\n\nSubscribed: ${submittedAt}\n\nYou will receive updates on new services, offers and case studies.\n\n© 2024 Wynqor Inc.`;
      const companyBody =
        `🆕 Newsletter Subscription\n\nEmail: ${email}\nSubscribed: ${submittedAt}\n\n© 2024 Wynqor Inc.`;
      const payload = {
        clientTo: email,
        clientSubject,
        clientBody,
        companyTo: this.COMPANY_EMAIL,
        companySubject,
        companyBody,
      };
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) return { success: true };
      return { success: false, error: result?.error || 'Failed to subscribe.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to subscribe.' };
    }
  }

  async sendLoginNotification(user: { name: string; email: string }): Promise<{ success: boolean; error?: string }> {
    try {
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const clientSubject = `Welcome back, ${user.name}!`;
      const companySubject = `User Login - ${user.email}`;
      const clientBody =
        `👋 Hi ${user.name},

You're now signed in to Wynqor.

Signed in: ${submittedAt}

If this wasn't you, please reply to this email immediately.

© 2024 Wynqor Inc.`;
      const companyBody =
        `🔔 User Login Notification

User: ${user.name}
Email: ${user.email}
Time: ${submittedAt}

© 2024 Wynqor Inc.`;

      const payload = {
        clientTo: user.email,
        clientSubject,
        clientBody,
        companyTo: this.COMPANY_EMAIL,
        companySubject,
        companyBody,
      };

      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) return { success: true };
      return { success: false, error: result?.error || 'Failed to send login notification.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to send login notification.' };
    }
  }

  private formatServicesList(cartItems: CartItem[]): string {
    return cartItems.map(item =>
      `${item.title} (${item.category}) - ${item.price} × ${item.quantity}`
    ).join('\n');
  }

  private formatBudget(budget: string): string {
    const budgetOptions: { [key: string]: string } = {
      '1': 'Less than ₹500',
      '2': '₹500 - ₹1,000',
      '3': '₹1,000 - ₹2,500',
      '4': '₹2,500 - ₹5,000',
      '5': '₹5,000+'
    };
    return budgetOptions[budget] || 'Not specified';
  }

  private formatDeadline(deadline: string): string {
    if (!deadline) return 'Not specified';

    try {
      const date = new Date(deadline);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return deadline;
    }
  }

  private computeDelivery(data: EmailData) {
    const parseRange = (duration?: string): { min: number; max: number } => {
      const raw = (duration || '').split(' ')[0]; // "5–7" or "5"
      if (!raw) return { min: 0, max: 0 };
      const parts = raw.split('–');
      const min = parseInt(parts[0] || '0');
      const max = parts[1] ? parseInt(parts[1]) : min;
      return {
        min: isNaN(min) ? 0 : min,
        max: isNaN(max) ? (isNaN(min) ? 0 : min) : max
      };
    };

    const ranges = data.cartItems.map(i => parseRange(i.duration));
    const minDays = Math.max(1, ...ranges.map(r => r.min || 0));
    const sumUpper = ranges.reduce((acc, r) => acc + Math.max(0, r.max || 0), 0);
    const maxDays = Math.max(minDays, sumUpper || minDays);

    const suggested = new Date();
    suggested.setDate(suggested.getDate() + minDays);
    const suggestedDate = suggested.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const deadlineText = this.formatDeadline(data.deadline);
    return { minDays, maxDays, suggestedDate, deadlineText };
  }

  private generateClientEmailContent(data: EmailData): string {
    const servicesList = this.formatServicesList(data.cartItems);
    const delivery = this.computeDelivery(data);

    return `🎉 YOUR REQUEST HAS BEEN SUBMITTED!

Thank you for choosing Wynqor!

✅ SUCCESS: Your service request has been received and our team will review it shortly.

REQUEST ID: ${data.requestId}

📋 REQUEST DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Request ID: ${data.requestId}
Submitted: ${data.submittedAt}

👤 YOUR INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${data.fullName}
Email Address: ${data.email}
Phone Number: ${data.phone}${data.businessName ? `\nBusiness Name: ${data.businessName}` : ''}

📝 PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Description: ${data.description}
Deadline: ${this.formatDeadline(data.deadline)}
Budget Range: ${this.formatBudget(data.budget)}

🛒 SELECTED SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${servicesList}

⏱ ESTIMATED DELIVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Window: ${delivery.minDays}–${delivery.maxDays} days
Suggested Delivery Date: ${delivery.suggestedDate}
Target Deadline: ${delivery.deadlineText}

💰 PRICING BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ₹${data.subtotal.toFixed(2)}
Service Fee (5%): ₹${data.serviceFee.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL AMOUNT: ₹${data.total.toFixed(2)}

⏰ WHAT'S NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Our team will review your request within 24 hours
2. You'll receive a detailed proposal with timeline and pricing
3. Once approved, we'll begin working on your project
4. You'll receive regular updates throughout the process${data.notes ? `

📌 ADDITIONAL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If you have any questions, please contact us at: ${this.COMPANY_EMAIL}

© 2024 Wynqor Inc. All rights reserved.`.trim();
  }

  private generateClientEmailHtml(data: EmailData): string {
    const delivery = this.computeDelivery(data);
    const rows = data.cartItems.map(i => ({
      left: `${i.title} × ${i.quantity}`,
      right: i.price
    }));
    const subtotal = data.subtotal;
    const fee = data.serviceFee;
    const total = data.total;
    const billing = [
      ...(data.billingName ? [{ left: 'Billing Name', right: data.billingName }] : []),
      ...(data.billingAddress ? [{ left: 'Billing Address', right: data.billingAddress }] : []),
      ...(data.gstin ? [{ left: 'GSTIN', right: data.gstin }] : []),
    ];
    return this.brandHeader('Request Received') +
      `<div style="padding:24px 20px;background:#fff"><div style="max-width:800px;margin:0 auto">
      ${this.section('Request ID', `<strong>${data.requestId}</strong>`)}
      ${this.section('Your Information', this.table([
        { left: 'Name', right: data.fullName },
        { left: 'Email', right: data.email },
        ...(data.phone ? [{ left: 'Phone', right: data.phone }] : []),
        ...(data.businessName ? [{ left: 'Business', right: data.businessName }] : []),
        ...billing
      ]))}
      ${this.section('Selected Services', this.table(rows))}
      ${this.section('Estimated Delivery', `${delivery.minDays}–${delivery.maxDays} days • Suggested date: <strong>${delivery.suggestedDate}</strong>`)}
      ${this.section('Pricing', this.table([
        { left: 'Subtotal', right: this.money(subtotal) },
        { left: 'Service Fee (5%)', right: this.money(fee) },
        { left: 'Total', right: `<strong>${this.money(total)}</strong>` }
      ]))}
      ${data.description ? this.section('Project Description', data.description.replace(/\n/g, '<br/>')) : ''}
      ${data.notes ? this.section('Additional Notes', data.notes.replace(/\n/g, '<br/>')) : ''}
      <div style="margin-top:24px;font-size:12px;color:#64748b">We will review your request within 24 hours and share a proposal with secure payment options.</div>
      </div></div>`;
  }


  private generateCompanyEmailContent(data: EmailData): string {
    const servicesList = this.formatServicesList(data.cartItems);
    const delivery = this.computeDelivery(data);
    return `🚀 NEW SERVICE REQUEST RECEIVED
Action Required Within 24 Hours

⚡ URGENT: Please review this request within 24 hours and send a detailed proposal to the client.

REQUEST ID: ${data.requestId}

📋 REQUEST INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Request ID: ${data.requestId}
Submitted: ${data.submittedAt}

👤 CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${data.fullName}
Email Address: ${data.email}
Phone Number: ${data.phone}${data.businessName ? `\nBusiness Name: ${data.businessName}` : ''}

📝 PROJECT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Description: ${data.description}
Deadline: ${this.formatDeadline(data.deadline)}
Budget Range: ${this.formatBudget(data.budget)}${data.notes ? `\n\nAdditional Notes: ${data.notes}` : ''}

🛒 REQUESTED SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${servicesList}

⏱ ESTIMATED DELIVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Window: ${delivery.minDays}–${delivery.maxDays} days
Suggested Delivery Date: ${delivery.suggestedDate}
Target Deadline: ${delivery.deadlineText}

💰 FINANCIAL DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ₹${data.subtotal.toFixed(2)}
Service Fee (5%): ₹${data.serviceFee.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL ESTIMATE: ₹${data.total.toFixed(2)}

🎯 QUICK ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Send Proposal: ${data.email}
📞 Call Client: ${data.phone}

📋 NEXT STEPS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review the project requirements carefully
2. Prepare a detailed proposal with timeline and deliverables
3. Send the proposal to the client via email
4. Follow up if no response within 48 hours
5. Update the request status in your dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wynqor Service Request System
This is an automated notification. Please respond to the client directly.
© 2024 Wynqor Inc. All rights reserved.`.trim();
  }

  private generateCompanyEmailHtml(data: EmailData): string {
    const delivery = this.computeDelivery(data);
    const rows = data.cartItems.map(i => ({
      left: `${i.title} × ${i.quantity}`,
      right: i.price
    }));
    const billing = [
      ...(data.billingName ? [{ left: 'Billing Name', right: data.billingName }] : []),
      ...(data.billingAddress ? [{ left: 'Billing Address', right: data.billingAddress }] : []),
      ...(data.gstin ? [{ left: 'GSTIN', right: data.gstin }] : []),
    ];
    return this.brandHeader('New Service Request') +
      `<div style="padding:24px 20px;background:#fff"><div style="max-width:800px;margin:0 auto">
      ${this.section('Client', this.table([
        { left: 'Name', right: data.fullName },
        { left: 'Email', right: data.email },
        ...(data.phone ? [{ left: 'Phone', right: data.phone }] : []),
        ...(data.businessName ? [{ left: 'Business', right: data.businessName }] : []),
        ...billing
      ]))}
      ${this.section('Request Info', this.table([
        { left: 'Request ID', right: data.requestId },
        { left: 'Submitted', right: data.submittedAt },
        ...(data.deadline ? [{ left: 'Target Deadline', right: this.formatDeadline(data.deadline) }] : []),
        ...(data.budget ? [{ left: 'Budget', right: this.formatBudget(data.budget) }] : []),
      ]))}
      ${this.section('Requested Services', this.table(rows))}
      ${this.section('Estimated Delivery', `${delivery.minDays}–${delivery.maxDays} days • Suggested date: <strong>${delivery.suggestedDate}</strong>`)}
      ${this.section('Notes', (data.description || '').replace(/\n/g, '<br/>') + (data.notes ? `<br/>${data.notes.replace(/\n/g, '<br/>')}` : ''))}
      </div></div>`;
  }


}

export const emailService = new EmailService();
