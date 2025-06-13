'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';

interface SimpleContactFormProps {
  dictionary: any;
  locale: Locale;
}

export default function SimpleContactForm({ dictionary, locale }: SimpleContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const validateForm = () => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!message.trim() || message.length < 10) {
      setError('Please enter a message (at least 10 characters)');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send the form data to our API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (!response.ok) {
        throw new Error('Error submitting form. Please try again later.');
      }
      
      setIsSubmitted(true);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-primary/10 text-primary text-center p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-3">
          {dictionary?.contact?.thankYou || 'Thank You!'}
        </h3>
        <p>
          {dictionary?.contact?.successMessage || 'Your message has been received. We will get back to you shortly.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {dictionary?.contact?.title || 'Contact Us'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {dictionary?.contact?.name || 'Name'}*
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-accent/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {dictionary?.contact?.email || 'Email'}*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-accent/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {dictionary?.contact?.message || 'Message'}*
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border border-accent/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {dictionary?.contact?.submitting || 'Sending...'}
            </div>
          ) : (
            dictionary?.contact?.submit || 'Send Message'
          )}
        </button>
      </form>
    </div>
  );
} 