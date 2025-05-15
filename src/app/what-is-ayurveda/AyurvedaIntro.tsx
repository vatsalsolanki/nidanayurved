import { motion } from 'framer-motion';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';

interface AyurvedaIntroProps {
  dictionary: any;
  locale: Locale;
}

export default function AyurvedaIntro({ dictionary, locale }: AyurvedaIntroProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {dictionary.ayurveda.title}
            </h1>
            <p className="text-lg md:text-xl text-text/80 mb-12">
              {dictionary.ayurveda.subtitle}
            </p>
          </motion.div>
          
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-xl mx-auto max-w-5xl h-[300px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Image
              src="/images/ayurveda-hero.jpg"
              alt={dictionary.ayurveda.heroImageAlt}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col lg:flex-row gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Left column - Text content */}
            <motion.div className="lg:w-1/2" variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                {dictionary.ayurveda.introTitle}
              </h2>
              
              <div className="space-y-4 text-text/80">
                <p>{dictionary.ayurveda.introPara1}</p>
                <p>{dictionary.ayurveda.introPara2}</p>
                <p>{dictionary.ayurveda.introPara3}</p>
              </div>
            </motion.div>
            
            {/* Right column - Image */}
            <motion.div className="lg:w-1/2" variants={itemVariants}>
              <div className="relative rounded-lg overflow-hidden shadow-md h-[350px] md:h-[400px]">
                <Image
                  src="/images/ayurveda-principles.jpg"
                  alt={dictionary.ayurveda.principlesImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Doshas Section */}
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
              {dictionary.ayurveda.doshasTitle}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-text/80">
              {dictionary.ayurveda.doshasSubtitle}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {dictionary.ayurveda.doshas.map((dosha: any, index: number) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 mb-4 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-primary font-semibold">{dosha.symbol}</span>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3 text-center">{dosha.name}</h3>
                <p className="text-text/70 mb-4">{dosha.description}</p>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">{dictionary.ayurveda.elementsLabel}:</h4>
                  <p className="text-text/80">{dosha.elements}</p>
                </div>
                
                <div className="mt-3">
                  <h4 className="font-semibold text-primary mb-2">{dictionary.ayurveda.qualitiesLabel}:</h4>
                  <p className="text-text/80">{dosha.qualities}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
              {dictionary.ayurveda.benefitsTitle}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-text/80">
              {dictionary.ayurveda.benefitsSubtitle}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {dictionary.ayurveda.benefits.map((benefit: any, index: number) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl text-primary">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-text/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
} 