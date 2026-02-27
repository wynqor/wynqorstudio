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

      const payload = {
        clientTo: emailData.email,
        clientSubject: `Service Request Confirmation - ${emailData.requestId}`,
        clientBody: clientEmailContent,
        companyTo: this.COMPANY_EMAIL,
        companySubject: `New Service Request - ${emailData.requestId}`,
        companyBody: companyEmailContent,
      };

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

  private generateClientEmailContent(data: EmailData): string {
    const servicesList = this.formatServicesList(data.cartItems);

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

  private generateCompanyEmailContent(data: EmailData): string {
    const servicesList = this.formatServicesList(data.cartItems);

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
