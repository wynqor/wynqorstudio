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
      const clientHtml = `
<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>
body{background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a}
.wrap{max-width:560px;margin:0 auto;padding:24px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px}
.title{font-size:18px;font-weight:800;margin-bottom:8px}
.meta{font-size:13px;color:#475569}
</style></head><body><div class="wrap"><div class="card">
<div class="title">Signed in to Wynqor</div>
<div class="meta">Hello ${user.name}</div>
<div class="meta">Time: ${submittedAt}</div>
</div></div></body></html>`.trim();
      const companyHtml = `
<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>
body{background:#0b1220;font-family:Inter,Arial,sans-serif;color:#e5e7eb;padding:24px}
.card{max-width:560px;margin:0 auto;background:#0f172a;border:1px solid #1f2937;border-radius:16px;padding:24px}
.title{font-size:18px;font-weight:800;margin-bottom:8px;color:#fff}
.meta{font-size:13px;color:#cbd5e1}
</style></head><body><div class="card">
<div class="title">User Login</div>
<div class="meta">Name: ${user.name}</div>
<div class="meta">Email: ${user.email}</div>
<div class="meta">Time: ${submittedAt}</div>
</div></body></html>`.trim();

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
    const days = data.cartItems.map(i => {
      const n = parseInt((i.duration || '').split(' ')[0]);
      return isNaN(n) ? 0 : n;
    });
    const maxDays = Math.max(1, ...days);
    const sumDays = days.reduce((a, b) => a + b, 0);
    const minDays = Math.max(1, maxDays);
    const suggested = new Date();
    suggested.setDate(suggested.getDate() + minDays);
    const suggestedDate = suggested.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const deadlineText = this.formatDeadline(data.deadline);
    return { minDays, maxDays: sumDays || minDays, suggestedDate, deadlineText };
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
If you have any questions, please contact us at: wynqor@gmail.com

© 2024 Wynqor Inc. All rights reserved.`.trim();
  }

  private generateClientEmailHtml(data: EmailData): string {
    const servicesList = this.formatServicesList(data.cartItems).split('\n').map(line => `<li>${line}</li>`).join('');
    const delivery = this.computeDelivery(data);
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Request Confirmation</title>
<style>
body{background:#f8fafc;margin:0;padding:0;font-family:Inter,Arial,sans-serif;color:#0f172a}
.container{max-width:640px;margin:0 auto;padding:24px}
.card{background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px}
.header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.logo{width:36px;height:36px;background:#2563eb;color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800}
.title{font-size:20px;font-weight:800;color:#0f172a}
.section-title{font-size:14px;font-weight:700;color:#334155;margin:16px 0 8px}
.row{display:flex;justify-content:space-between;font-size:13px;color:#475569}
.pill{display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:999px;padding:6px 10px;font-size:12px;color:#334155}
.list{margin:0;padding-left:18px}
.footer{font-size:12px;color:#64748b;margin-top:16px}
.divider{height:1px;background:#e2e8f0;margin:16px 0}
.amount{font-size:16px;font-weight:800;color:#0f172a}
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <div class="header">
      <div class="logo">W</div>
      <div class="title">Wynqor</div>
    </div>
    <div class="pill">Request ID: ${data.requestId}</div>
    <div class="section-title">Your Information</div>
    <div class="row"><div>Full Name</div><div>${data.fullName}</div></div>
    <div class="row"><div>Email</div><div>${data.email}</div></div>
    <div class="row"><div>Phone</div><div>${data.phone}</div></div>
    ${data.businessName ? `<div class="row"><div>Business</div><div>${data.businessName}</div></div>` : ''}
    <div class="section-title">Project Details</div>
    <div class="row"><div>Description</div><div>${data.description}</div></div>
    <div class="row"><div>Deadline</div><div>${this.formatDeadline(data.deadline)}</div></div>
    <div class="row"><div>Budget</div><div>${this.formatBudget(data.budget)}</div></div>
    <div class="section-title">Selected Services</div>
    <ul class="list">${servicesList}</ul>
    <div class="section-title">Estimated Delivery</div>
    <div class="row"><div>Window</div><div>${delivery.minDays}–${delivery.maxDays} days</div></div>
    <div class="row"><div>Suggested Date</div><div>${delivery.suggestedDate}</div></div>
    <div class="row"><div>Target Deadline</div><div>${delivery.deadlineText}</div></div>
    <div class="divider"></div>
    <div class="row"><div>Subtotal</div><div class="amount">₹${data.subtotal.toFixed(2)}</div></div>
    <div class="row"><div>Service Fee (5%)</div><div class="amount">₹${data.serviceFee.toFixed(2)}</div></div>
    <div class="row"><div>Total</div><div class="amount">₹${data.total.toFixed(2)}</div></div>
    ${data.notes ? `<div class="section-title">Notes</div><div>${data.notes}</div>` : ''}
    <div class="footer">Questions? Contact wynqor@gmail.com</div>
  </div>
</div>
</body>
</html>
`.trim();
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
    const servicesList = this.formatServicesList(data.cartItems).split('\n').map(line => `<li>${line}</li>`).join('');
    const delivery = this.computeDelivery(data);
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>New Service Request</title>
<style>
body{background:#0b1220;margin:0;padding:24px;font-family:Inter,Arial,sans-serif;color:#e5e7eb}
.container{max-width:720px;margin:0 auto}
.card{background:#0f172a;border:1px solid #1f2937;border-radius:16px;padding:24px}
.header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.logo{width:36px;height:36px;background:#2563eb;color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800}
.title{font-size:20px;font-weight:800;color:#fff}
.section-title{font-size:13px;font-weight:700;color:#93c5fd;margin:16px 0 8px;text-transform:uppercase;letter-spacing:.08em}
.row{display:flex;justify-content:space-between;font-size:13px;color:#cbd5e1}
.pill{display:inline-block;background:#111827;border:1px solid #374151;border-radius:999px;padding:6px 10px;font-size:12px;color:#93c5fd}
.list{margin:0;padding-left:18px}
.divider{height:1px;background:#1f2937;margin:16px 0}
.amount{font-size:16px;font-weight:800;color:#fff}
.footer{font-size:12px;color:#94a3b8;margin-top:16px}
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <div class="header">
      <div class="logo">W</div>
      <div class="title">New Service Request</div>
    </div>
    <div class="pill">Request ID: ${data.requestId}</div>
    <div class="section-title">Client</div>
    <div class="row"><div>Name</div><div>${data.fullName}</div></div>
    <div class="row"><div>Email</div><div>${data.email}</div></div>
    <div class="row"><div>Phone</div><div>${data.phone}</div></div>
    ${data.businessName ? `<div class="row"><div>Business</div><div>${data.businessName}</div></div>` : ''}
    <div class="section-title">Requirements</div>
    <div class="row"><div>Description</div><div>${data.description}</div></div>
    <div class="row"><div>Deadline</div><div>${this.formatDeadline(data.deadline)}</div></div>
    <div class="row"><div>Budget</div><div>${this.formatBudget(data.budget)}</div></div>
    ${data.notes ? `<div class="row"><div>Notes</div><div>${data.notes}</div></div>` : ''}
    <div class="section-title">Requested Services</div>
    <ul class="list">${servicesList}</ul>
    <div class="section-title">Estimated Delivery</div>
    <div class="row"><div>Window</div><div>${delivery.minDays}–${delivery.maxDays} days</div></div>
    <div class="row"><div>Suggested Date</div><div>${delivery.suggestedDate}</div></div>
    <div class="row"><div>Target Deadline</div><div>${delivery.deadlineText}</div></div>
    <div class="divider"></div>
    <div class="row"><div>Subtotal</div><div class="amount">₹${data.subtotal.toFixed(2)}</div></div>
    <div class="row"><div>Service Fee (5%)</div><div class="amount">₹${data.serviceFee.toFixed(2)}</div></div>
    <div class="row"><div>Total</div><div class="amount">₹${data.total.toFixed(2)}</div></div>
    <div class="footer">Respond directly to the client. Wynqor Service Request System</div>
  </div>
</div>
</body>
</html>
`.trim();
  }

}

export const emailService = new EmailService();
