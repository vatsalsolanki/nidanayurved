import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  treatmentInterest?: string;
}

export const sendContactEmail = async (data: EmailData) => {
  const { name, email, phone, subject, message, treatmentInterest } = data;

  try {
    let transporter;
    let isDevelopment = process.env.NODE_ENV === 'development';
    
    // If we're in development and missing SMTP credentials, use a test account
    if (isDevelopment && !process.env.EMAIL_HOST) {
      console.log('Using test account for email in development environment');
      
      // Log the email content for development
      console.log('----------------------------------------');
      console.log('Email would be sent with the following information:');
      console.log(`From: Nidan Ayurved Website <noreply@nidanayurved.com>`);
      console.log(`To: Website Admin`);
      console.log(`Reply-To: ${email}`);
      console.log(`Subject: Contact Form: ${subject}`);
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone || 'Not provided'}`);
      console.log(`Treatment Interest: ${treatmentInterest || 'None'}`);
      console.log(`Message: ${message}`);
      console.log('----------------------------------------');
      
      // Return success in development even without sending
      return { success: true, messageId: 'dev-mode' };
    }
    
    // Use real SMTP for production or if credentials are provided
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #618C03; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #618C03; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${phone || 'Not provided'}
            </div>
            <div class="field">
              <span class="label">Subject:</span> ${subject}
            </div>
            ${treatmentInterest ? `
            <div class="field">
              <span class="label">Treatment Interest:</span> ${treatmentInterest}
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Message:</span>
              <p>${message}</p>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the contact form on Nidan Ayurved website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"Nidan Ayurved Website" <${process.env.EMAIL_USER || 'noreply@nidanayurved.com'}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER || 'admin@nidanayurved.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: htmlContent,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n${treatmentInterest ? `Treatment Interest: ${treatmentInterest}\n` : ''}Message: ${message}`,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 