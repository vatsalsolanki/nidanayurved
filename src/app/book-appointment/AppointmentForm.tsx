'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';

interface AppointmentFormProps {
  dictionary: any;
  locale: Locale;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  treatment: string;
  message: string;
};

export default function AppointmentForm({ dictionary, locale }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [treatments, setTreatments] = useState<any[]>([]);
  
  useEffect(() => {
    // Load treatments for the select dropdown
    const loadTreatments = async () => {
      try {
        const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
          (module) => module.default
        ).catch(() => {
          // Fallback to English if locale-specific treatments not found
          return import('@/lib/treatments/en.json').then((module) => module.default);
        });
        
        setTreatments(treatmentsData);
      } catch (error) {
        console.error('Failed to load treatments:', error);
      }
    };
    
    loadTreatments();
  }, [locale]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Here you would normally send the form data to your backend
      // For demonstration purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(dictionary.appointment.errorMessage || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClasses = "w-full border border-accent/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const errorClasses = "text-red-500 text-sm mt-1 ml-1";
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      slots.push(`${formattedHour}:00 ${ampm}`);
      if (hour !== 18) {
        slots.push(`${formattedHour}:30 ${ampm}`);
      }
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          backgroundColor: 'rgba(var(--color-primary), 0.1)',
          color: 'var(--color-primary)',
          textAlign: 'center',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="w-16 h-16 bg-primary/20 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">{dictionary.appointment.thankYou}</h3>
        <p className="text-primary/80">{dictionary.appointment.successMessage}</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: 'white',
        padding: '1.5rem 2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
    >
      {submitError && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              {dictionary.appointment.name}*
            </label>
            <input
              id="name"
              type="text"
              className={`${inputClasses} ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('name', { required: dictionary.appointment.nameRequired })}
            />
            {errors.name && (
              <p className={errorClasses}>{errors.name.message}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              {dictionary.appointment.email}*
            </label>
            <input
              id="email"
              type="email"
              className={`${inputClasses} ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('email', { 
                required: dictionary.appointment.emailRequired,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: dictionary.appointment.emailInvalid
                }
              })}
            />
            {errors.email && (
              <p className={errorClasses}>{errors.email.message}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
              {dictionary.appointment.phone}*
            </label>
            <input
              id="phone"
              type="tel"
              className={`${inputClasses} ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('phone', { required: dictionary.appointment.phoneRequired })}
            />
            {errors.phone && (
              <p className={errorClasses}>{errors.phone.message}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="treatment" className="block text-sm font-medium text-text mb-1">
              {dictionary.appointment.treatment}*
            </label>
            <select
              id="treatment"
              className={`${inputClasses} ${errors.treatment ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('treatment', { required: dictionary.appointment.treatmentRequired })}
            >
              <option value="">{dictionary.appointment.selectTreatment}</option>
              <option value="consultation">{dictionary.appointment.initialConsultation}</option>
              {treatments.map((treatment) => (
                <option key={treatment.slug} value={treatment.slug}>
                  {treatment.title}
                </option>
              ))}
            </select>
            {errors.treatment && (
              <p className={errorClasses}>{errors.treatment.message}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="date" className="block text-sm font-medium text-text mb-1">
              {dictionary.appointment.date}*
            </label>
            <input
              id="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={`${inputClasses} ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('date', { required: dictionary.appointment.dateRequired })}
            />
            {errors.date && (
              <p className={errorClasses}>{errors.date.message}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="time" className="block text-sm font-medium text-text mb-1">
              {dictionary.appointment.time}*
            </label>
            <select
              id="time"
              className={`${inputClasses} ${errors.time ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('time', { required: dictionary.appointment.timeRequired })}
            >
              <option value="">{dictionary.appointment.selectTime}</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className={errorClasses}>{errors.time.message}</p>
            )}
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} style={{ marginTop: '1.5rem' }}>
          <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
            {dictionary.appointment.message}
          </label>
          <textarea
            id="message"
            rows={4}
            className={inputClasses}
            {...register('message')}
            placeholder={dictionary.appointment.messagePlaceholder}
          ></textarea>
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ marginTop: '2rem' }}>
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
                {dictionary.appointment.submitting}
              </div>
            ) : (
              dictionary.appointment.submit
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
} 