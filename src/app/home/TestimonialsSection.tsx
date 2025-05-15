"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/lib/i18n";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Default testimonials data
const defaultTestimonials = [
  {
    id: 1,
    quote: "The Panchakarma treatment completely transformed my health. After years of digestive issues, I finally found relief. The staff is exceptionally knowledgeable and caring.",
    author: "Rajesh Shah",
    location: "Mumbai, India",
  },
  {
    id: 2,
    quote: "I had chronic migraines for years. After just a month of Shirodhara treatments, the frequency and intensity have dramatically reduced. I'm incredibly grateful.",
    author: "Priya Patel",
    location: "Ahmedabad, India",
  },
  {
    id: 3,
    quote: "The Abhyanga massage not only relieved my muscle tension but also improved my sleep quality. The warm oil techniques they use are truly rejuvenating.",
    author: "Amit Sharma",
    location: "Delhi, India",
  },
];

interface TestimonialsSectionProps {
  dictionary: any;
  locale: Locale;
}

export function TestimonialsSection({ dictionary, locale }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Use dictionary testimonials if available
  useEffect(() => {
    if (dictionary.home?.testimonials?.items && Array.isArray(dictionary.home.testimonials.items)) {
      setTestimonials(dictionary.home.testimonials.items);
    }
  }, [dictionary]);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swiped left
      handleNext();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swiped right
      handlePrev();
    }
  };
  
  return (
    <section className="py-24 bg-gradient-to-br from-background to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 font-${locale}`}>
            {dictionary.home.testimonials?.title || "What Our Clients Say"}
          </h2>
          <motion.div
            className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-5xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left control for larger screens */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex absolute -left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-md items-center justify-center text-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          
          {/* The carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-neutral-100">
            <div className="absolute top-8 left-8 text-primary/10 z-0">
              <Quote size={60} strokeWidth={1} />
            </div>
            
            <div className="p-8 md:p-12">
              <div className="min-h-[320px] md:min-h-[250px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto"
                  >
                    <blockquote className={`text-lg md:text-xl text-neutral-700 italic mb-8 relative font-${locale}`}>
                      &ldquo;{testimonials[currentIndex]?.quote || defaultTestimonials[0].quote}&rdquo;
                    </blockquote>
                    
                    <motion.div 
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div className="flex flex-col items-center">
                        <p className={`font-medium text-primary text-lg font-${locale}`}>
                          {testimonials[currentIndex]?.author || defaultTestimonials[0].author}
                        </p>
                        <p className={`text-sm text-neutral-500 font-${locale}`}>
                          {testimonials[currentIndex]?.location || defaultTestimonials[0].location}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Bottom controls and indicators */}
            <div className="bg-neutral-50 py-4 px-8 flex items-center justify-between border-t border-neutral-100">
              {/* Mobile controls */}
              <button 
                onClick={handlePrev}
                className="md:hidden p-2 rounded-full bg-white shadow-sm text-primary border border-neutral-100 hover:bg-primary/5 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Dot indicators */}
              <div className="flex gap-2 mx-auto">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-primary scale-125" 
                        : "bg-primary/20 hover:bg-primary/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>
              
              {/* Mobile controls */}
              <button 
                onClick={handleNext}
                className="md:hidden p-2 rounded-full bg-white shadow-sm text-primary border border-neutral-100 hover:bg-primary/5 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Right control for larger screens */}
          <button 
            onClick={handleNext}
            className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-md items-center justify-center text-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
} 