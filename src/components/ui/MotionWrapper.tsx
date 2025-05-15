"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import framer-motion to avoid SSR issues
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => {
    // Extract the motion.div component
    const { motion } = mod;
    return motion.div;
  }),
  { 
    ssr: false,
    // Use a simple div as fallback while loading
    // Only pass safe DOM props to the div to avoid React warnings
    loading: ({ className, children }) => (
      <div className={className}>{children}</div>
    )
  }
);

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function MotionWrapper({ children, className, ...props }: MotionWrapperProps) {
  return (
    <MotionDiv className={className} {...props}>
      {children}
    </MotionDiv>
  );
}

export default MotionWrapper; 