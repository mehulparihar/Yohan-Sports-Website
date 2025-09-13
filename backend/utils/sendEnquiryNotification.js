import sgMail from '@sendgrid/mail';
import Enquiry from '../models/enquiry.model.js';  
// Initialise SendGrid only if a key exists
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}


export async function sendEnquiryNotification(enquiryOrDoc, options = {}) {
  if (!process.env.SENDGRID_API_KEY) return;

  // Resolve to an Enquiry document
  const e = enquiryOrDoc._id
    ? enquiryOrDoc
    : await Enquiry.findById(enquiryOrDoc);
  if (!e) return;

  const adminTo = process.env.ENQUIRY_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;
  const subject = options.reply
    ? `Reply sent to enquiry #${e._id}`
    : `New enquiry received: ${e.type}`;

  const bodyAdmin = `
New enquiry received:
Name: ${e.name}
Email: ${e.email || '-'}
Phone: ${e.phone || '-'}
Type: ${e.type}
Program: ${e.programId || '-'}
Message: ${e.message}
Created at: ${e.createdAt}
  `;

  const messages = [
    {
      to: adminTo,
      from: process.env.FROM_EMAIL || adminTo,
      subject,
      text: bodyAdmin,
    },
  ];

  // Optional user reply email
  if (options.reply && e.email) {
    messages.push({
      to: e.email,
      from: process.env.FROM_EMAIL || adminTo,
      subject: `Response to your enquiry at ${process.env.SITE_NAME || 'Our Site'}`,
      text: `Hi ${e.name},\n\n${options.reply}\n\n— Team`,
    });
  }

  await sgMail.send(messages);
}
