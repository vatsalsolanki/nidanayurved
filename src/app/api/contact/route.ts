import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate phone number if provided (optional)
    if (data.phone && !/^[+\d\s-]{7,20}$/.test(data.phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    
    // Send email
    const emailResult = await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      message: data.message,
      treatmentInterest: data.treatmentInterest || '',
    });
    
    if (!emailResult.success) {
      throw new Error('Failed to send email');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process your request' },
      { status: 500 }
    );
  }
} 