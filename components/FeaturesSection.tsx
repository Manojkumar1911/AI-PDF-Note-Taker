import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Summaries",
      description: "Our advanced AI analyzes your PDFs and creates intelligent, contextual summaries that capture the key points and insights.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Fast & Accurate",
      description: "Process documents in seconds with 95% accuracy. Our AI has been trained on millions of documents to ensure reliable results.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "User-Friendly Interface",
      description: "Simple drag-and-drop interface designed for students and professionals. No technical knowledge required to get started.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">Powerful Features</span>
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of document processing with our cutting-edge AI technology designed to revolutionize how you work with PDFs.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-hero text-white rounded-full font-semibold text-base sm:text-lg shadow-2xl sparkle"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Try It Now - It's Free!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
