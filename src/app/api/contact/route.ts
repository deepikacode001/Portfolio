import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Connect to database (if MongoDB URI is set)
    const dbConnection = await connectDB();

    // Save to database if connected, otherwise just log
    let savedContact = null;
    if (dbConnection) {
      try {
        savedContact = new Contact({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          read: false, // New messages are unread by default
        });
        await savedContact.save();
        console.log('✅ Contact saved to database:', savedContact._id);
      } catch (dbError: any) {
        console.error('❌ Error saving contact to database:', dbError);
        // Continue even if database save fails - still send email
        console.warn('⚠️ Contact form submission will continue without database save');
      }
    } else {
      // If MongoDB not configured, just log the data
      console.log('Form submission (MongoDB not configured):', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });
      console.warn('⚠️ MongoDB URI not set. Add MONGODB_URI to .env.local to save to database.');
    }

    // Send email notification using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Email to you (deepikaraj01999@gmail.com)
        // From: System email (verified) - always your system email
        // Reply-To: User's email - so when you click Reply, it goes directly to user
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>',
          to: 'deepikaraj01999@gmail.com',
          replyTo: email.trim(), // 🔥 User ka email - Reply button se directly user ko jayega
          subject: `New Contact Form Message from ${name.trim()}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #5682B1 0%, #739EC9 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                  .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                  .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #5682B1; }
                  .message-box { background: white; padding: 15px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
                  .reply-btn { display: inline-block; background: #5682B1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
                  .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>📧 New Contact Form Message</h2>
                  </div>
                  <div class="content">
                    <div class="info-box">
                      <p><strong>Name:</strong> ${name.trim()}</p>
                      <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
                      <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
                    </div>
                    <div class="message-box">
                      <h3>Message:</h3>
                      <p style="white-space: pre-wrap;">${message.trim().replace(/\n/g, '<br>')}</p>
                    </div>
                    <a href="mailto:${email.trim()}?subject=Re: Your message from Portfolio&body=Hi ${name.trim()},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A" class="reply-btn">Reply to ${name.trim()}</a>
                  </div>
                  <div class="footer">
                    <p>This email was sent from your portfolio contact form.</p>
                    ${savedContact ? `<p>Contact ID: ${savedContact._id}</p>` : ''}
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log('Email sent successfully to deepikaraj01999@gmail.com');
      } catch (emailError: any) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email fails, just log it
        // The form submission is still successful
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY not set. Email notification not sent.');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! I will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing form:', error);
    
    // Handle duplicate key errors or validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message || 'Validation error occurred' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
