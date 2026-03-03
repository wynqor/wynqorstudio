import { CartItem } from '../context/CartContext';
import { site } from '../data/site'; 

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
  private readonly COMPANY_NAME = site.name || 'Wynqor';
  private readonly COMPANY_PHONE = site.phone || '';
  private readonly COMPANY_SITE = (import.meta as any).env?.VITE_COMPANY_SITE || '';
  private readonly LOGO_URL = (import.meta as any).env?.VITE_COMPANY_LOGO_URL || '';
  private readonly PRIMARY_COLOR = (import.meta as any).env?.VITE_PRIMARY_COLOR || '#456a48';

  private renderPlainSections(
    title: string,
    intro: string,
    sections: Array<{ heading: string; rows: Array<[string, string]> }>,
    servicesList?: string,
    footer?: string
  ): string {
    const header = `${title}`.trim();
    const introBlock = intro ? `${intro}\n` : '';
    const secBlocks = sections
      .map((sec) => {
        const rows = sec.rows
          .filter(([, v]) => v !== '' && v !== undefined && v !== null)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
        if (!rows) return '';
        return `${sec.heading}\n${'─'.repeat(Math.max(8, sec.heading.length))}\n${rows}`;
      })
      .filter(Boolean)
      .join('\n\n');
    const servicesBlock = servicesList ? `\n\nSelected Services\n──────────────────\n${servicesList}` : '';
    const lines = [`Regards,`, `${this.COMPANY_NAME} Team`, this.COMPANY_EMAIL];
    if (this.COMPANY_PHONE) lines.push(this.COMPANY_PHONE);
    if (this.COMPANY_SITE) lines.push(this.COMPANY_SITE);
    const signatureBlock = `\n\n${lines.join('\n')}`;
    const footerBlock = footer ? `\n\n${footer}` : '';
    return `${header}\n\n${introBlock}${secBlocks}${servicesBlock}${signatureBlock}${footerBlock}`.trim();
  }

  private renderHtmlSections(
    title: string,
    intro: string,
    sections: Array<{ heading: string; rows: Array<[string, string]> }>,
    servicesList?: string,
    footer?: string
  ): string {
    const secBlocks = sections
      .map((sec) => {
        const rows = sec.rows
          .filter(([, v]) => v !== '' && v !== undefined && v !== null)
          .map(
            ([k, v]) =>
              `<div style="margin:2px 0"><span style="color:#0f172a;font-weight:600">${k}:</span> <span style="color:#334155">${v}</span></div>`
          )
          .join('');
        if (!rows) return '';
        return `<div style="margin:16px 0">
          <div style="color:#0f172a;font-weight:700;margin:0 0 8px">${sec.heading}</div>
          <div style="border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#ffffff">${rows}</div>
        </div>`;
      })
      .filter(Boolean)
      .join('');
    const introBlock = intro ? `<p style="color:#334155;line-height:1.6;margin:0 0 16px">${intro}</p>` : '';
    const services = servicesList
      ? `<div style="margin:16px 0">
          <div style="color:#0f172a;font-weight:700;margin:0 0 8px">Selected Services</div>
          <pre style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:12px;white-space:pre-wrap;color:#334155;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace">${servicesList}</pre>
        </div>`
      : '';
    const computedFooter =
      footer ||
      `This is an automated message from Wynqor. For assistance, contact us at ${this.COMPANY_EMAIL}.`;
    const year = new Date().getFullYear();
    const preheader = intro
      ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;visibility:hidden">${intro}</div>`
      : '';
    const logoTag =
      this.LOGO_URL
        ? `<img src="${this.LOGO_URL}" alt="${this.COMPANY_NAME}" width="36" height="36" style="display:block;border-radius:8px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none" />`
        : `<img src="cid:brand-logo" alt="${this.COMPANY_NAME}" width="36" height="36" style="display:block;border-radius:8px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none" />`;
    const brandContent =
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto">
            <tr>
              <td style="padding-right:10px;vertical-align:middle">
                ${logoTag}
              </td>
              <td style="vertical-align:middle">
                <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:.2px">${this.COMPANY_NAME}</div>
              </td>
            </tr>
         </table>`;
    const brand = this.COMPANY_SITE
      ? `<a href="${this.COMPANY_SITE}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit">${brandContent}</a>`
      : brandContent;
    const cta = this.COMPANY_SITE
      ? `<tr>
            <td style="padding-top:12px">
              <a href="${this.COMPANY_SITE}" target="_blank" rel="noopener" style="display:inline-block;background:${this.PRIMARY_COLOR};color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-weight:600;">Visit ${this.COMPANY_NAME}</a>
            </td>
         </tr>`
      : '';
    const phoneLine = this.COMPANY_PHONE
      ? `<div style="margin:2px 0;">Phone: <a href="tel:${this.COMPANY_PHONE.replace(/\\s+/g,'')}" style="color:#2563eb;text-decoration:none">${this.COMPANY_PHONE}</a></div>`
      : '';
    const siteLine = this.COMPANY_SITE
      ? `<div style="margin:2px 0;">Website: <a href="${this.COMPANY_SITE}" style="color:#2563eb;text-decoration:none">${this.COMPANY_SITE}</a></div>`
      : '';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - ${this.COMPANY_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f9fc;">
  ${preheader}
  <center style="width:100%;background:#f6f9fc;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f6f9fc;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:100%;">
            <tr>
              <td style="padding:8px 0 16px 0;text-align:center;">
                ${brand}
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:${this.PRIMARY_COLOR};border-radius:999px;"></td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
                <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
                  <h1 style="margin:0 0 12px 0;font-size:20px;line-height:1.4;color:#0f172a;">${title}</h1>
                  ${introBlock}
                  ${secBlocks}
                  ${services}
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    ${cta}
                    <tr>
                      <td style="padding-top:16px">
                        <div style="color:#334155;line-height:1.6;">
                          Regards,<br>
                          <strong>${this.COMPANY_NAME} Team</strong>
                          <div style="margin:6px 0;"><a href="mailto:${this.COMPANY_EMAIL}" style="color:${this.PRIMARY_COLOR};text-decoration:none">${this.COMPANY_EMAIL}</a></div>
                          ${phoneLine}
                          ${siteLine}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;text-align:center;color:#64748b;font-size:12px;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                <div style="margin:4px 0;">${computedFooter}</div>
                <div style="margin:4px 0;">© ${year} ${this.COMPANY_NAME}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
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
      const clientBody = this.renderPlainSections(
        'Application Received',
        `Thank you for applying to Wynqor. We have received your application.`,
        [
          { heading: 'Application', rows: [['Role/Area', app.area], ['Submitted', submittedAt]] }
        ]
      );
      const companyBody = this.renderPlainSections(
        'Career Application',
        '',
        [
          { heading: 'Candidate', rows: [['Name', app.name], ['Email', app.email], ['Phone', app.phone || '']] },
          { heading: 'Details', rows: [['Area', app.area], ['Portfolio', app.portfolio || ''], ['GitHub', app.github || ''], ['Notes', app.note || '']] },
          { heading: 'Meta', rows: [['Submitted', submittedAt]] }
        ]
      );
      const clientHtml = this.renderHtmlSections('Application Received', `Thank you for applying to Wynqor. We have received your application.`, [{ heading: 'Application', rows: [['Role/Area', app.area], ['Submitted', submittedAt]] }]);
      const companyHtml = this.renderHtmlSections('Career Application', '', [
        { heading: 'Candidate', rows: [['Name', app.name], ['Email', app.email], ['Phone', app.phone || '']] },
        { heading: 'Details', rows: [['Area', app.area], ['Portfolio', app.portfolio || ''], ['GitHub', app.github || ''], ['Notes', app.note || '']] },
        { heading: 'Meta', rows: [['Submitted', submittedAt]] }
      ]);
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
      const clientBody = this.renderPlainSections(
        'Referral Submitted',
        `Thank you for referring ${ref.candidateName} to Wynqor. We have received your referral.`,
        [{ heading: 'Summary', rows: [['Referrer', ref.referrerName], ['Candidate', ref.candidateName], ['Submitted', submittedAt]] }]
      );
      const companyBody = this.renderPlainSections(
        'Career Referral',
        '',
        [
          { heading: 'Referrer', rows: [['Name', ref.referrerName], ['Email', ref.referrerEmail]] },
          { heading: 'Candidate', rows: [['Name', ref.candidateName], ['Email', ref.candidateEmail], ['Profile', ref.profileLink || '']] },
          { heading: 'Notes', rows: [['Relation', ref.relation || ''], ['Notes', ref.note || '']] },
          { heading: 'Meta', rows: [['Submitted', submittedAt]] }
        ]
      );
      const clientHtml = this.renderHtmlSections('Referral Submitted', `Thank you for referring ${ref.candidateName} to Wynqor. We have received your referral.`, [{ heading: 'Summary', rows: [['Referrer', ref.referrerName], ['Candidate', ref.candidateName], ['Submitted', submittedAt]] }]);
      const companyHtml = this.renderHtmlSections('Career Referral', '', [
        { heading: 'Referrer', rows: [['Name', ref.referrerName], ['Email', ref.referrerEmail]] },
        { heading: 'Candidate', rows: [['Name', ref.candidateName], ['Email', ref.candidateEmail], ['Profile', ref.profileLink || '']] },
        { heading: 'Notes', rows: [['Relation', ref.relation || ''], ['Notes', ref.note || '']] },
        { heading: 'Meta', rows: [['Submitted', submittedAt]] }
      ]);
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
      const clientEmailContent = this.renderPlainSections(
        'Request Received',
        'Thank you for contacting Wynqor. We have received your request and will get back to you shortly.',
        [
          { heading: 'Request Details', rows: [['Request ID', emailData.requestId], ['Submitted', emailData.submittedAt]] },
          { heading: 'Your Information', rows: [['Full Name', emailData.fullName], ['Email', emailData.email], ['Phone', emailData.phone], ['Business', emailData.businessName]] },
          { heading: 'Project Details', rows: [['Description', emailData.description], ['Deadline', this.formatDeadline(emailData.deadline)], ['Budget', this.formatBudget(emailData.budget)], ['Notes', emailData.notes]] },
          { heading: 'Delivery & Timeline', rows: [['Delivery Window', this.formatWindow(delivery.minDays, delivery.maxDays)], ['Suggested Date', delivery.suggestedDate]] },
          { heading: 'Pricing Breakdown', rows: [['Subtotal', `₹${emailData.subtotal.toFixed(2)}`], ['Service Fee', `₹${emailData.serviceFee.toFixed(2)}`], ['Total', `₹${emailData.total.toFixed(2)}`]] }
        ],
        servicesList,
        `If you have questions, reply to this email or contact us at ${this.COMPANY_EMAIL}.`
      );
      const companyEmailContent = this.renderPlainSections(
        'New Service Request',
        'A new client request has been submitted. Please review and respond within 24 hours.',
        [
          { heading: 'Request Details', rows: [['Request ID', emailData.requestId], ['Submitted', emailData.submittedAt]] },
          { heading: 'Client', rows: [['Name', emailData.fullName], ['Email', emailData.email], ['Phone', emailData.phone], ['Business', emailData.businessName]] },
          { heading: 'Project', rows: [['Description', emailData.description], ['Deadline', this.formatDeadline(emailData.deadline)], ['Budget', this.formatBudget(emailData.budget)], ['Notes', emailData.notes]] },
          { heading: 'Delivery', rows: [['Window', this.formatWindow(delivery.minDays, delivery.maxDays)], ['Suggested Date', delivery.suggestedDate]] },
          { heading: 'Pricing', rows: [['Subtotal', `₹${emailData.subtotal.toFixed(2)}`], ['Service Fee', `₹${emailData.serviceFee.toFixed(2)}`], ['Total', `₹${emailData.total.toFixed(2)}`]] }
        ],
        servicesList
      );
      const clientHtml = this.renderHtmlSections(
        'Request Received',
        'Thank you for contacting Wynqor. We have received your request and will get back to you shortly.',
        [
          { heading: 'Request Details', rows: [['Request ID', emailData.requestId], ['Submitted', emailData.submittedAt]] },
          { heading: 'Your Information', rows: [['Full Name', emailData.fullName], ['Email', emailData.email], ['Phone', emailData.phone], ['Business', emailData.businessName]] },
          { heading: 'Project Details', rows: [['Description', emailData.description], ['Deadline', this.formatDeadline(emailData.deadline)], ['Budget', this.formatBudget(emailData.budget)], ['Notes', emailData.notes]] },
          { heading: 'Delivery & Timeline', rows: [['Delivery Window', this.formatWindow(delivery.minDays, delivery.maxDays)], ['Suggested Date', delivery.suggestedDate]] },
          { heading: 'Pricing Breakdown', rows: [['Subtotal', `₹${emailData.subtotal.toFixed(2)}`], ['Service Fee', `₹${emailData.serviceFee.toFixed(2)}`], ['Total', `₹${emailData.total.toFixed(2)}`]] }
        ],
        servicesList,
        `If you have questions, reply to this email or contact us at ${this.COMPANY_EMAIL}.`
      );
      const companyHtml = this.renderHtmlSections(
        'New Service Request',
        'A new client request has been submitted. Please review and respond within 24 hours.',
        [
          { heading: 'Request Details', rows: [['Request ID', emailData.requestId], ['Submitted', emailData.submittedAt]] },
          { heading: 'Client', rows: [['Name', emailData.fullName], ['Email', emailData.email], ['Phone', emailData.phone], ['Business', emailData.businessName]] },
          { heading: 'Project', rows: [['Description', emailData.description], ['Deadline', this.formatDeadline(emailData.deadline)], ['Budget', this.formatBudget(emailData.budget)], ['Notes', emailData.notes]] },
          { heading: 'Delivery', rows: [['Window', this.formatWindow(delivery.minDays, delivery.maxDays)], ['Suggested Date', delivery.suggestedDate]] },
          { heading: 'Pricing', rows: [['Subtotal', `₹${emailData.subtotal.toFixed(2)}`], ['Service Fee', `₹${emailData.serviceFee.toFixed(2)}`], ['Total', `₹${emailData.total.toFixed(2)}`]] }
        ],
        servicesList
      );

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
      const clientSubject = 'Subscription Confirmed';
      const companySubject = 'New Newsletter Subscription';
      const clientBody = this.renderPlainSections('Subscription Confirmed', 'You are now subscribed to Wynqor updates. You will receive news on services, offers, and case studies.', [{ heading: 'Details', rows: [['Email', email], ['Subscribed', submittedAt]] }]);
      const companyBody = this.renderPlainSections('Newsletter Subscription', '', [{ heading: 'Details', rows: [['Email', email], ['Subscribed', submittedAt]] }]);
      const clientHtml = this.renderHtmlSections('Subscription Confirmed', 'You are now subscribed to Wynqor updates. You will receive news on services, offers, and case studies.', [{ heading: 'Details', rows: [['Email', email], ['Subscribed', submittedAt]] }]);
      const companyHtml = this.renderHtmlSections('Newsletter Subscription', '', [{ heading: 'Details', rows: [['Email', email], ['Subscribed', submittedAt]] }]);
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
      const clientSubject = `Sign-in Confirmed`;
      const companySubject = `User Login - ${user.email}`;
      const clientBody = this.renderPlainSections('Sign-in Confirmed', 'A sign-in to your Wynqor account was detected. If this was not you, please contact support immediately.', [{ heading: 'Details', rows: [['User', user.name], ['Email', user.email], ['Time', submittedAt]] }]);
      const companyBody = this.renderPlainSections('User Login', '', [{ heading: 'Details', rows: [['User', user.name], ['Email', user.email], ['Time', submittedAt]] }]);
      const clientHtml = this.renderHtmlSections('Sign-in Confirmed', 'A sign-in to your Wynqor account was detected. If this was not you, please contact support immediately.', [{ heading: 'Details', rows: [['User', user.name], ['Email', user.email], ['Time', submittedAt]] }]);
      const companyHtml = this.renderHtmlSections('User Login', '', [{ heading: 'Details', rows: [['User', user.name], ['Email', user.email], ['Time', submittedAt]] }]);

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
      const raw = (duration || '').trim();
      if (!raw) return { min: 0, max: 0 };
      const nums = raw.match(/\d+/g) || [];
      if (nums.length === 0) return { min: 0, max: 0 };
      const a = parseInt(nums[0] || '0', 10);
      const b = nums.length >= 2 ? parseInt(nums[1] || '0', 10) : a;
      const min = isNaN(a) ? 0 : a;
      const max = isNaN(b) ? min : b;
      return { min, max: Math.max(min, max) };
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

  private formatWindow(minDays: number, maxDays: number): string {
    if (minDays === maxDays) {
      return `${minDays} ${minDays === 1 ? 'Day' : 'Days'}`;
    }
    return `${minDays}–${maxDays} Days`;
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
      const clientBody = this.renderPlainSections(
        'Payment Successful',
        'We have received your payment. Please find the summary below.',
        [{ heading: 'Payment Summary', rows: [['Request ID', info.requestId], ['Payment ID', info.paymentId], ['Method', info.method], ['Amount', `₹${info.amount.toFixed(2)}`], ['Time', when]] }],
        servicesList
      );
      const companyBody = this.renderPlainSections(
        'Payment Received',
        '',
        [{ heading: 'Payment Summary', rows: [['Request ID', info.requestId], ['Client', `${info.name || ''} <${info.email}>`], ['Payment ID', info.paymentId], ['Method', info.method], ['Amount', `₹${info.amount.toFixed(2)}`], ['Time', when]] }],
        servicesList
      );
      const clientHtml = this.renderHtmlSections('Payment Successful', 'We have received your payment. Please find the summary below.', [{ heading: 'Payment Summary', rows: [['Request ID', info.requestId], ['Payment ID', info.paymentId], ['Method', info.method], ['Amount', `₹${info.amount.toFixed(2)}`], ['Time', when]] }], servicesList);
      const companyHtml = this.renderHtmlSections('Payment Received', '', [{ heading: 'Payment Summary', rows: [['Request ID', info.requestId], ['Client', `${info.name || ''} <${info.email}>`], ['Payment ID', info.paymentId], ['Method', info.method], ['Amount', `₹${info.amount.toFixed(2)}`], ['Time', when]] }], servicesList);

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
