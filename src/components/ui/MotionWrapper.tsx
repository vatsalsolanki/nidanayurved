"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Create a motion component wrapper that supports className properly
export interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function MotionWrapper({ children, ...props }: MotionWrapperProps) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
}

export default MotionWrapper; 