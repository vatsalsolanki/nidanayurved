"use client";

import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineProps {
  dictionary: any;
  locale: Locale;
}

const MotionPath = motion.path;
const MotionEllipse = motion.ellipse;
const MotionDiv = motion.div;

export default function Timeline({ dictionary, locale }: TimelineProps) {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  
  // Font class based on locale
  const fontClass = locale === 'hi' ? 'font-hi' : locale === 'gu' ? 'font-gu' : 'font-en';
  
  // Get milestones from dictionary
  const milestones = dictionary.about.milestones || [];
  
  // Handle image error
  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  // Generate image fallback
  const renderImageFallback = (year: string) => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary">{year}</div>
      </div>
    </div>
  );

  // Animation variants
  const treeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: 'beforeChildren'
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut" 
      }
    }
  };

  const leafVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-20 bg-accent/5 overflow-hidden">
      <style jsx global>{`
        @keyframes growUp {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        
        @keyframes growWidth {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes growLeaves {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .trunk-animation {
          animation: growUp 0.8s ease-in-out forwards;
          transform-origin: bottom;
        }
        
        .branch-animation-left {
          animation: growWidth 0.3s ease-out forwards;
          transform-origin: left;
          transform: scaleX(0);
        }
        
        .branch-animation-right {
          animation: growWidth 0.3s ease-out forwards;
          transform-origin: right;
          transform: scaleX(0);
        }
        
        .leaves-animation {
          animation: growLeaves 0.4s ease-out forwards;
          transform-origin: center;
          opacity: 0;
          transform: scale(0);
        }
        
        @keyframes spreadRoots {
          0% { 
            transform: scaleX(0);
            opacity: 0;
          }
          100% { 
            transform: scaleX(1);
            opacity: 1;
          }
        }
        
        .root-spread-left {
          animation: spreadRoots 1s ease-out forwards 0.6s;
          transform-origin: right;
          opacity: 0;
        }
        
        .root-spread-right {
          animation: spreadRoots 1s ease-out forwards 0.6s;
          transform-origin: left;
          opacity: 0;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("text-3xl md:text-4xl font-bold text-primary mb-3", fontClass)}>
              {dictionary.about.timelineTitle}
            </h2>
            <p className={cn("text-lg max-w-3xl mx-auto text-text/80", fontClass)}>
              {dictionary.about.timelineSubtitle}
            </p>
          </MotionWrapper>
        </div>

        {/* Desktop organic tree timeline (visible on md and up) */}
        <div className="hidden md:block relative">
          <div className="w-full h-[700px] relative">
            <MotionWrapper
              variants={treeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Tree SVG with Y-shaped trunk and branches */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 800" /* Extended viewBox height to 800 to include roots */
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Main trunk */}
                <MotionPath
                  d="M600 700 L600 400"
                  stroke="#8B5E3C"
                  strokeWidth="30"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Left branch */}
                <MotionPath
                  d="M600 400 Q450 280, 300 250"
                  stroke="#8B5E3C"
                  strokeWidth="20"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Right branch */}
                <MotionPath
                  d="M600 400 Q750 280, 900 250"
                  stroke="#8B5E3C"
                  strokeWidth="20"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Left subbranch top */}
                <MotionPath
                  d="M400 275 Q350 200, 280 180"
                  stroke="#8B5E3C"
                  strokeWidth="15"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Left subbranch bottom */}
                <MotionPath
                  d="M450 310 Q400 350, 320 380"
                  stroke="#8B5E3C"
                  strokeWidth="15"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Right subbranch top */}
                <MotionPath
                  d="M800 275 Q850 200, 920 180"
                  stroke="#8B5E3C"
                  strokeWidth="15"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Right subbranch bottom */}
                <MotionPath
                  d="M750 310 Q800 350, 880 380"
                  stroke="#8B5E3C"
                  strokeWidth="15"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Top center leaves */}
                <MotionEllipse
                  cx="600" 
                  cy="380"
                  rx="25" 
                  ry="20"
                  fill="#4CAF50"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="580" 
                  cy="365"
                  rx="20" 
                  ry="15"
                  fill="#81C784"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="620" 
                  cy="365"
                  rx="20" 
                  ry="15"
                  fill="#81C784"
                  variants={leafVariants}
                />
                
                {/* Top left leaves */}
                <MotionEllipse
                  cx="280" 
                  cy="160"
                  rx="20" 
                  ry="16"
                  fill="#4CAF50"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="300" 
                  cy="145"
                  rx="18" 
                  ry="14"
                  fill="#81C784"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="270" 
                  cy="140"
                  rx="15" 
                  ry="12"
                  fill="#A5D6A7"
                  variants={leafVariants}
                />
                
                {/* Bottom left leaves */}
                <MotionEllipse
                  cx="320" 
                  cy="360"
                  rx="20" 
                  ry="16"
                  fill="#4CAF50"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="340" 
                  cy="345"
                  rx="18" 
                  ry="14"
                  fill="#81C784"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="310" 
                  cy="340"
                  rx="15" 
                  ry="12"
                  fill="#A5D6A7"
                  variants={leafVariants}
                />
                
                {/* Top right leaves */}
                <MotionEllipse
                  cx="920" 
                  cy="160"
                  rx="20" 
                  ry="16"
                  fill="#4CAF50"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="900" 
                  cy="145"
                  rx="18" 
                  ry="14"
                  fill="#81C784"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="930" 
                  cy="140"
                  rx="15" 
                  ry="12"
                  fill="#A5D6A7"
                  variants={leafVariants}
                />
                
                {/* Bottom right leaves */}
                <MotionEllipse
                  cx="880" 
                  cy="360"
                  rx="20" 
                  ry="16"
                  fill="#4CAF50"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="860" 
                  cy="345"
                  rx="18" 
                  ry="14"
                  fill="#81C784"
                  variants={leafVariants}
                />
                
                <MotionEllipse
                  cx="890" 
                  cy="340"
                  rx="15" 
                  ry="12"
                  fill="#A5D6A7"
                  variants={leafVariants}
                />
                
                {/* Extended roots that spread toward "Meet Our Expert Team" */}
                <MotionPath
                  d="M600 700 Q500 750, 350 770"
                  stroke="#8B5E3C"
                  strokeWidth="18"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                <MotionPath
                  d="M600 700 Q700 750, 850 770"
                  stroke="#8B5E3C"
                  strokeWidth="18"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                {/* Additional smaller roots spreading wider */}
                <MotionPath
                  d="M350 770 Q250 780, 150 790" 
                  stroke="#8B5E3C"
                  strokeWidth="12"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                <MotionPath
                  d="M350 770 Q300 790, 220 800"
                  stroke="#8B5E3C"
                  strokeWidth="10"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                <MotionPath
                  d="M850 770 Q950 780, 1050 790"
                  stroke="#8B5E3C"
                  strokeWidth="12"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
                
                <MotionPath
                  d="M850 770 Q900 790, 980 800"
                  stroke="#8B5E3C"
                  strokeWidth="10"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
              </svg>

              {/* Year badge 2018 - Top Left */}
              <div className="absolute top-[120px] left-[220px] bg-[#4B6F2E] text-white font-bold px-4 py-2 rounded-lg shadow-md z-10">
                {milestones[2].year}
              </div>

              {/* Year badge 2023 - Top Right */}
              <div className="absolute top-[120px] right-[220px] bg-[#4B6F2E] text-white font-bold px-4 py-2 rounded-lg shadow-md z-10">
                {milestones[3].year}
              </div>

              {/* Milestone Cards Positioned on Tree */}
              {/* Milestone Top Row - Left (2018) */}
              <div className="absolute top-[170px] left-[130px] w-[400px] h-[180px]">
                <MotionWrapper variants={cardVariants}>
                  <div className="bg-[#EFF3EA] rounded-xl shadow-md h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">2018</h3>
                      <p className="text-sm text-text/80">
                        {milestones[1]?.description || "Expanded our clinic to include specialized Panchakarma therapy rooms."}
                      </p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-2 text-xs font-semibold text-primary w-fit">
                      {milestones[1]?.label || "Growth"}
                    </div>
                  </div>
                </MotionWrapper>
              </div>

              {/* Milestone Top Row - Right (2023) */}
              <div className="absolute top-[170px] right-[130px] w-[400px] h-[180px]">
                <MotionWrapper variants={cardVariants}>
                  <div className="bg-[#EFF3EA] rounded-xl shadow-md h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className={cn("text-[40px] font-bold text-[#4B6F2E] mb-1", fontClass)}>
                        {milestones[3].year}
                      </h3>
                      <h4 className={cn("text-xl font-bold text-[#4B6F2E] mb-2", fontClass)}>
                        {milestones[3].title}
                      </h4>
                    </div>
                    <p className={cn("text-text/80 text-sm", fontClass)}>
                      {milestones[3].description}
                    </p>
                  </div>
                </MotionWrapper>
              </div>

              {/* Year badge 2010 - Bottom Left */}
              <div className="absolute top-[380px] left-[260px] bg-[#4B6F2E] text-white font-bold px-4 py-2 rounded-lg shadow-md z-10">
                {milestones[0].year}
              </div>

              {/* Year badge 2015 - Bottom Right */}
              <div className="absolute top-[380px] right-[260px] bg-[#4B6F2E] text-white font-bold px-4 py-2 rounded-lg shadow-md z-10">
                {milestones[1].year}
              </div>

              {/* Milestone Bottom Row - Left (2010) */}
              <div className="absolute top-[430px] left-[130px] w-[400px] h-[180px]">
                <MotionWrapper variants={cardVariants}>
                  <div className="bg-[#EFF3EA] rounded-xl shadow-md h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className={cn("text-[40px] font-bold text-[#4B6F2E] mb-1", fontClass)}>
                        {milestones[0].year}
                      </h3>
                      <h4 className={cn("text-xl font-bold text-[#4B6F2E] mb-2", fontClass)}>
                        {milestones[0].title}
                      </h4>
                    </div>
                    <p className={cn("text-text/80 text-sm", fontClass)}>
                      {milestones[0].description}
                    </p>
                  </div>
                </MotionWrapper>
              </div>

              {/* Milestone Bottom Row - Right (2015) */}
              <div className="absolute top-[430px] right-[130px] w-[400px] h-[180px]">
                <MotionWrapper variants={cardVariants}>
                  <div className="bg-[#EFF3EA] rounded-xl shadow-md h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className={cn("text-[40px] font-bold text-[#4B6F2E] mb-1", fontClass)}>
                        {milestones[1].year}
                      </h3>
                      <h4 className={cn("text-xl font-bold text-[#4B6F2E] mb-2", fontClass)}>
                        {milestones[1].title}
                      </h4>
                    </div>
                    <p className={cn("text-text/80 text-sm", fontClass)}>
                      {milestones[1].description}
                    </p>
                  </div>
                </MotionWrapper>
              </div>
            </MotionWrapper>
            
            {/* Extended root system that goes beyond the tree SVG */}
            <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden">
              <div className="relative w-full h-full">
                {/* Left side spreading roots */}
                <div className="absolute left-0 bottom-0 w-1/3 h-12 root-spread-left">
                  <svg width="100%" height="100%" viewBox="0 0 400 30" fill="none" preserveAspectRatio="none">
                    <path d="M400 5 Q350 10, 300 5 Q250 0, 200 10 Q150 20, 100 15 Q50 10, 0 20" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                    <path d="M400 15 Q320 25, 240 20 Q160 15, 80 25 Q40 30, 0 25" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                
                {/* Right side spreading roots */}
                <div className="absolute right-0 bottom-0 w-1/3 h-12 root-spread-right">
                  <svg width="100%" height="100%" viewBox="0 0 400 30" fill="none" preserveAspectRatio="none">
                    <path d="M0 5 Q50 10, 100 5 Q150 0, 200 10 Q250 20, 300 15 Q350 10, 400 20" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                    <path d="M0 15 Q80 25, 160 20 Q240 15, 320 25 Q360 30, 400 25" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                
                {/* Center roots connecting to "Meet Our Expert Team" */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1/2 max-w-lg h-28">
                  <svg width="100%" height="100%" viewBox="0 0 500 70" fill="none" preserveAspectRatio="none">
                    <path d="M250 0 L250 70" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
                    <path d="M250 40 Q200 50, 150 60" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" />
                    <path d="M250 40 Q300 50, 350 60" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" />
                    <path d="M250 60 Q220 65, 180 70" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" />
                    <path d="M250 60 Q280 65, 320 70" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile timeline with simplified vertical design (md:hidden) */}
        <div className="md:hidden pt-8 pb-20">
          <div className="relative">
            {/* Vertical trunk */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-3 bg-[#8B5E3C] rounded-full"></div>
            
            <div className="space-y-32">
              {milestones.map((milestone: any, index: number) => (
                <div key={index} className="relative pt-6">
                  {/* Year marker */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#4B6F2E] text-white rounded-lg flex items-center justify-center z-10">
                    <span className="font-bold">{milestone.year}</span>
                  </div>
                  
                  {/* Card */}
                  <div className="mt-16 mx-auto w-4/5 bg-[#EFF3EA] rounded-xl shadow-md p-4">
                    <h3 className={cn("text-xl font-bold text-[#4B6F2E] mb-2", fontClass)}>
                      {milestone.title}
                    </h3>
                    <p className={cn("text-text/80 text-sm", fontClass)}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 