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
      const payload = {
        clientTo: app.email,
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
      const payload = {
        clientTo: ref.referrerEmail,
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
        companyTo: this.COMPANY_EMAIL,
        companySubject: `New Service Request - ${emailData.requestId}`,
        companyBody: companyEmailContent,
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


  private generateCompanyEmailContent(data: EmailData): string {
    const servicesList = this.formatServicesList(data.cartItems);
    const delivery = this.computeDelivery(data);
    return `🚀 NEW SERVICE REQUEST RECEIVED

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


}

export const emailService = new EmailService();
