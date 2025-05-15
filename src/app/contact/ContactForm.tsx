'use client';

import { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Locale } from '@/lib/i18n';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';

interface ContactFormProps {
  dictionary: any;
  locale: Locale;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isTreatmentQuery: boolean;
  treatmentInterest: string;
};

// Custom animated checkbox component
const AnimatedCheckbox = ({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) => {
  return (
    <div className="relative">
      <div
        className={`h-5 w-5 border rounded cursor-pointer flex items-center justify-center transition-colors duration-200 ${
          checked 
            ? 'border-primary bg-primary/10' 
            : 'border-accent/30 bg-transparent'
        }`}
        onClick={() => onChange(!checked)}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-primary"
          fill="none"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: checked ? 1 : 0, 
              opacity: checked ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </div>
      <input 
        type="checkbox"
        className="opacity-0 absolute h-0 w-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

export default function ContactForm({ dictionary, locale }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [treatments, setTreatments] = useState<Array<{slug: string, title: string}>>([]);
  const [query, setQuery] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    control,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      isTreatmentQuery: false,
      treatmentInterest: '',
    }
  });
  
  const isTreatmentQuery = watch('isTreatmentQuery');
  
  // Load treatments
  useEffect(() => {
    const loadTreatments = async () => {
      try {
        // Use dynamic import to load the treatment data based on locale
        const treatmentsModule = await import(`@/lib/treatments/${locale}.json`);
        const treatmentData = treatmentsModule.default || [];
        
        // Map to just what we need for the dropdown
        setTreatments(
          treatmentData.map((t: any) => ({
            slug: t.slug,
            title: t.title
          }))
        );
      } catch (error) {
        console.error('Error loading treatments:', error);
        // Fallback to empty array if there's an error
        setTreatments([]);
      }
    };
    
    loadTreatments();
  }, [locale]);
  
  // Filter treatments based on search query
  const filteredTreatments = query === ''
    ? treatments
    : treatments.filter((treatment) =>
        treatment.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Remove treatmentInterest if it's not a treatment query
      const formData = {
        ...data,
        treatmentInterest: data.isTreatmentQuery ? data.treatmentInterest : undefined
      };
      
      // Send the form data to our API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle validation errors from the server
        if (response.status === 400 && result.error) {
          // Check if the error is related to a specific field
          if (result.error.includes('name')) {
            setError('name', { type: 'server', message: result.error });
          } else if (result.error.includes('email')) {
            setError('email', { type: 'server', message: result.error });
          } else if (result.error.includes('phone')) {
            setError('phone', { type: 'server', message: result.error });
          } else if (result.error.includes('subject')) {
            setError('subject', { type: 'server', message: result.error });
          } else if (result.error.includes('message')) {
            setError('message', { type: 'server', message: result.error });
          } else if (result.error.includes('treatment')) {
            setError('treatmentInterest', { type: 'server', message: result.error });
          } else {
            throw new Error(result.error);
          }
          return;
        }
        
        throw new Error(result.error || 'Failed to submit form');
      }
      
      if (!result.success) {
        throw new Error('Failed to process your request');
      }
      
      setIsSubmitted(true);
      reset(); // Reset the form fields
    } catch (error: any) {
      setSubmitError(error.message || dictionary.contact.errorMessage || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClasses = "w-full border border-accent/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const errorClasses = "text-red-500 text-sm mt-1 ml-1";
  
  if (isSubmitted) {
    return (
      <div className="bg-primary/10 text-primary text-center p-8 rounded-lg shadow-md">
        <div className="w-16 h-16 bg-primary/20 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">{dictionary.contact.thankYou}</h3>
        <p className="text-primary/80">{dictionary.contact.successMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      {submitError && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              {dictionary.contact.name}*
            </label>
            <input
              id="name"
              type="text"
              className={`${inputClasses} ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('name', { 
                required: dictionary.contact.nameRequired || 'Name is required',
                minLength: { 
                  value: 2, 
                  message: dictionary.contact.nameMinLength || 'Name must be at least 2 characters' 
                }
              })}
            />
            {errors.name && (
              <p className={errorClasses}>{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              {dictionary.contact.email}*
            </label>
            <input
              id="email"
              type="email"
              className={`${inputClasses} ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('email', { 
                required: dictionary.contact.emailRequired || 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: dictionary.contact.emailInvalid || 'Please enter a valid email'
                }
              })}
            />
            {errors.email && (
              <p className={errorClasses}>{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
              {dictionary.contact.phone}
            </label>
            <input
              id="phone"
              type="tel"
              className={`${inputClasses} ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('phone', {
                pattern: {
                  value: /^[+\d\s-]{7,20}$/,
                  message: dictionary.contact.phoneInvalid || 'Please enter a valid phone number'
                }
              })}
            />
            {errors.phone && (
              <p className={errorClasses}>{errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-text mb-1">
              {dictionary.contact.subject}*
            </label>
            <input
              id="subject"
              type="text"
              className={`${inputClasses} ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('subject', { required: dictionary.contact.subjectRequired || 'Subject is required' })}
            />
            {errors.subject && (
              <p className={errorClasses}>{errors.subject.message}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
            {dictionary.contact.message}*
          </label>
          <textarea
            id="message"
            rows={6}
            className={`${inputClasses} ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
            {...register('message', { 
              required: dictionary.contact.messageRequired || 'Message is required',
              minLength: {
                value: 10,
                message: dictionary.contact.messageMinLength || 'Message must be at least 10 characters'
              }
            })}
          ></textarea>
          {errors.message && (
            <p className={errorClasses}>{errors.message.message}</p>
          )}
        </div>
        
        <div className="mt-4">
          <Controller
            control={control}
            name="isTreatmentQuery"
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center">
                <AnimatedCheckbox checked={value} onChange={onChange} />
                <label 
                  htmlFor="isTreatmentQuery" 
                  className="ml-2 block text-sm text-text cursor-pointer"
                  onClick={() => onChange(!value)}
                >
                  {dictionary.contact.treatmentQuery || "Query Regarding Treatments?"}
                </label>
              </div>
            )}
          />
        </div>
        
        {isTreatmentQuery && (
          <div className="mt-4">
            <label htmlFor="treatmentInterest" className="block text-sm font-medium text-text mb-1">
              {dictionary.contact.treatmentInterest || "Which treatment are you interested in?"}*
            </label>
            
            <Controller
              control={control}
              name="treatmentInterest"
              rules={{ 
                required: isTreatmentQuery ? (dictionary.contact.treatmentRequired || 'Please select a treatment') : false 
              }}
              render={({ field }) => (
                <div className="relative">
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <div className="relative w-full">
                      <div className={`
                        relative w-full cursor-default overflow-hidden rounded-md text-left
                        ${errors.treatmentInterest ? 'border border-red-500' : 'border border-accent/30'}
                      `}>
                        <Combobox.Input
                          className={`
                            w-full py-3 pl-4 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary
                            ${errors.treatmentInterest ? 'focus:ring-red-500' : ''}
                          `}
                          onChange={(event) => {
                            setQuery(event.target.value);
                            // Don't update form value while typing
                          }}
                          displayValue={(value: string) => value}
                          placeholder={dictionary.contact.selectTreatment || "Select a treatment"}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredTreatments.length === 0 && query !== '' ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            {dictionary.contact.noTreatmentsFound || "No treatments found."}
                          </div>
                        ) : (
                          filteredTreatments.map((treatment) => (
                            <Combobox.Option
                              key={treatment.slug}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-primary text-white' : 'text-gray-900'
                                }`
                              }
                              value={treatment.title}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {treatment.title}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-primary'
                                      }`}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </div>
                    
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => {
                          field.onChange('');
                          setQuery('');
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-8 text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
                  </Combobox>
                </div>
              )}
            />
            
            {errors.treatmentInterest && (
              <p className={errorClasses}>{errors.treatmentInterest.message}</p>
            )}
          </div>
        )}
        
        <div className="mt-8">
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
                {dictionary.contact.submitting || 'Submitting...'}
              </div>
            ) : (
              dictionary.contact.submit
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 