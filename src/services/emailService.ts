import { CartItem } from '../context/CartContext';

export interface EmailData {
  // Client information
  fullName: string;
  email: string;
  phone: string;
  businessName: string;

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

  private renderPlain(title: string, items: Array<[string, string]>, servicesList?: string): string {
    const header = `${title}`.trim();
    const lines = items.filter(([, v]) => v !== '' && v !== undefined && v !== null).map(([k, v]) => `${k}: ${v}`);
    const servicesBlock = servicesList ? `\nServices:\n${servicesList}\n` : '';
    return `${header}\n\n${lines.join('\n')}\n\n${servicesBlock}`.trim();
  }

  private renderHtml(title: string, items: Array<[string, string]>, servicesList?: string): string {
    const fields = items
      .filter(([, v]) => v !== '' && v !== undefined && v !== null)
      .map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`)
      .join('');
    const services = servicesList
      ? `<div style="margin-top:12px"><strong>Services:</strong><pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px;white-space:pre-wrap">${servicesList}</pre></div>`
      : '';
    return `<div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:20px">
      <h2 style="margin:0 0 12px;color:#0f172a">${title}</h2>
      <div style="color:#334155;font-size:14px;line-height:1.6">${fields}${services}</div>
    </div>`;
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
      const clientItems: Array<[string, string]> = [
        ['Application', app.area],
        ['Submitted', submittedAt]
      ];
      const companyItems: Array<[string, string]> = [
        ['Name', app.name],
        ['Email', app.email],
        ['Phone', app.phone || ''],
        ['Area', app.area],
        ['Portfolio', app.portfolio || ''],
        ['GitHub', app.github || ''],
        ['Notes', app.note || ''],
        ['Submitted', submittedAt]
      ];
      const clientBody = this.renderPlain('Application Received', clientItems);
      const companyBody = this.renderPlain('Career Application', companyItems);
      const clientHtml = this.renderHtml('Application Received', clientItems);
      const companyHtml = this.renderHtml('Career Application', companyItems);
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
      const clientItems: Array<[string, string]> = [
        ['Referrer', `${ref.referrerName}`],
        ['Candidate', `${ref.candidateName}`],
        ['Submitted', submittedAt]
      ];
      const companyItems: Array<[string, string]> = [
        ['Referrer', `${ref.referrerName} <${ref.referrerEmail}>`],
        ['Candidate', `${ref.candidateName} <${ref.candidateEmail}>`],
        ['Profile', ref.profileLink || ''],
        ['Relation', ref.relation || ''],
        ['Notes', ref.note || ''],
        ['Submitted', submittedAt]
      ];
      const clientBody = this.renderPlain('Referral Submitted', clientItems);
      const companyBody = this.renderPlain('Career Referral', companyItems);
      const clientHtml = this.renderHtml('Referral Submitted', clientItems);
      const companyHtml = this.renderHtml('Career Referral', companyItems);
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

      const servicesList = this.formatServicesList(emailData.cartItems);
      const delivery = this.computeDelivery(emailData);
      const clientItems: Array<[string, string]> = [
        ['Request ID', emailData.requestId],
        ['Submitted', emailData.submittedAt],
        ['Client', `${emailData.fullName} <${emailData.email}>`],
        ['Phone', emailData.phone],
        ['Business', emailData.businessName],
        ['Description', emailData.description],
        ['Deadline', this.formatDeadline(emailData.deadline)],
        ['Budget', this.formatBudget(emailData.budget)],
        ['Subtotal', `₹${emailData.subtotal.toFixed(2)}`],
        ['Service Fee', `₹${emailData.serviceFee.toFixed(2)}`],
        ['Total', `₹${emailData.total.toFixed(2)}`],
        ['Delivery Window', `${delivery.minDays}–${delivery.maxDays} days`],
        ['Suggested Date', delivery.suggestedDate]
      ];
      const companyItems: Array<[string, string]> = [
        ['Request ID', emailData.requestId],
        ['Submitted', emailData.submittedAt],
        ['Client', `${emailData.fullName} <${emailData.email}>`],
        ['Phone', emailData.phone],
        ['Business', emailData.businessName],
        ['Description', emailData.description],
        ['Deadline', this.formatDeadline(emailData.deadline)],
        ['Budget', this.formatBudget(emailData.budget)],
        ['Subtotal', `₹${emailData.subtotal.toFixed(2)}`],
        ['Service Fee', `₹${emailData.serviceFee.toFixed(2)}`],
        ['Total', `₹${emailData.total.toFixed(2)}`],
        ['Delivery Window', `${delivery.minDays}–${delivery.maxDays} days`],
        ['Suggested Date', delivery.suggestedDate],
        ['Notes', emailData.notes]
      ];
      const clientEmailContent = this.renderPlain('Request Received', clientItems, servicesList);
      const companyEmailContent = this.renderPlain('New Service Request', companyItems, servicesList);
      const clientHtml = this.renderHtml('Request Received', clientItems, servicesList);
      const companyHtml = this.renderHtml('New Service Request', companyItems, servicesList);

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
        clientSubject: `Request Received - ${emailData.requestId}`,
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
      const clientSubject = 'Newsletter Subscription Confirmed';
      const companySubject = 'New Newsletter Subscription';
      const clientItems: Array<[string, string]> = [
        ['Email', email],
        ['Subscribed', submittedAt]
      ];
      const companyItems: Array<[string, string]> = [
        ['Email', email],
        ['Subscribed', submittedAt]
      ];
      const clientBody = this.renderPlain('Subscription Confirmed', clientItems);
      const companyBody = this.renderPlain('Newsletter Subscription', companyItems);
      const clientHtml = this.renderHtml('Subscription Confirmed', clientItems);
      const companyHtml = this.renderHtml('Newsletter Subscription', companyItems);
      const payload = {
        clientTo: email,
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
      return { success: false, error: result?.error || 'Failed to subscribe.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to subscribe.' };
    }
  }

  async sendLoginNotification(user: { name: string; email: string }): Promise<{ success: boolean; error?: string }> {
    try {
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const clientSubject = `Sign-in Confirmed - ${user.name}`;
      const companySubject = `User Login - ${user.email}`;
      const clientItems: Array<[string, string]> = [
        ['User', user.name],
        ['Email', user.email],
        ['Time', submittedAt]
      ];
      const companyItems: Array<[string, string]> = [
        ['User', user.name],
        ['Email', user.email],
        ['Time', submittedAt]
      ];
      const clientBody = this.renderPlain('Sign-in Confirmed', clientItems);
      const companyBody = this.renderPlain('User Login', companyItems);
      const clientHtml = this.renderHtml('Sign-in Confirmed', clientItems);
      const companyHtml = this.renderHtml('User Login', companyItems);

      const payload = {
        clientTo: user.email,
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




  async sendPaymentReceipt(info: {
    requestId: string;
    paymentId: string;
    amount: number;
    method: string;
    email: string;
    name?: string;
    cartItems?: CartItem[];
    submittedAt?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const servicesList = (info.cartItems || [])
        .map(item => `${item.title} (${item.category}) - ${item.price} × ${item.quantity}`)
        .join('\n');
      const clientSubject = `Payment Received - ${info.requestId}`;
      const companySubject = `Payment Success - ${info.requestId}`;
      const clientBody =
        `✅ PAYMENT SUCCESSFUL

Request ID: ${info.requestId}
Payment ID: ${info.paymentId}
Method: ${info.method}
Amount: ₹${info.amount.toFixed(2)}
Time: ${when}

${servicesList ? `Services:\n${servicesList}\n` : ''}`.trim();

      const companyBody =
        `💰 PAYMENT RECEIVED

Request ID: ${info.requestId}
Client: ${info.name || ''} <${info.email}>
Payment ID: ${info.paymentId}
Method: ${info.method}
Amount: ₹${info.amount.toFixed(2)}
Time: ${when}

${servicesList ? `Services:\n${servicesList}\n` : ''}`.trim();

      const clientHtml =
        `<div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:20px">
          <h2 style="margin:0 0 12px;color:#0f172a">Payment Successful</h2>
          <div style="color:#334155;font-size:14px;line-height:1.6">
            <div><strong>Request ID:</strong> ${info.requestId}</div>
            <div><strong>Payment ID:</strong> ${info.paymentId}</div>
            <div><strong>Method:</strong> ${info.method}</div>
            <div><strong>Amount:</strong> ₹${info.amount.toFixed(2)}</div>
            <div><strong>Time:</strong> ${when}</div>
            ${servicesList ? `<div style="margin-top:12px"><strong>Services:</strong><pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px">${servicesList}</pre></div>` : ''}
          </div>
        </div>`;

      const companyHtml =
        `<div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:20px">
          <h2 style="margin:0 0 12px;color:#0f172a">Payment Received</h2>
          <div style="color:#334155;font-size:14px;line-height:1.6">
            <div><strong>Request ID:</strong> ${info.requestId}</div>
            <div><strong>Client:</strong> ${info.name || ''} &lt;${info.email}&gt;</div>
            <div><strong>Payment ID:</strong> ${info.paymentId}</div>
            <div><strong>Method:</strong> ${info.method}</div>
            <div><strong>Amount:</strong> ₹${info.amount.toFixed(2)}</div>
            <div><strong>Time:</strong> ${when}</div>
            ${servicesList ? `<div style="margin-top:12px"><strong>Services:</strong><pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px">${servicesList}</pre></div>` : ''}
          </div>
        </div>`;

      const payload = {
        clientTo: info.email,
        clientSubject,
        clientBody,
        clientHtml,
        companyTo: this.COMPANY_EMAIL,
        companySubject,
        companyBody,
        companyHtml
      };

      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) return { success: true };
      return { success: false, error: result?.error || 'Failed to send receipt emails.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to send receipt emails.' };
    }
  }

}

export const emailService = new EmailService();
