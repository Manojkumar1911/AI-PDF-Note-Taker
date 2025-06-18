import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FloatingPDF from './FloatingPDF';

const HeroSection = () => {
  const [particles, setParticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Generate random particles only on client side
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                Your Smart
                <span className="gradient-text block">AI PDF Note</span>
                Assistant
              </h1>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Upload PDFs. Get summarized notes instantly. Focus on what matters.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-hero text-white rounded-full font-semibold text-base sm:text-lg shadow-2xl sparkle"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/sign-up')}
              >
                Get Started
              </motion.button>

              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(255, 255, 255, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mt-12 sm:mt-16 px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm sm:text-base">PDFs Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">95%</div>
                <div className="text-gray-400 text-sm sm:text-base">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">&lt; 30s</div>
                <div className="text-gray-400 text-sm sm:text-base">Processing Time</div>
              </div>
            </motion.div>
          </div>

          {/* Right side - 3D Animation */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <FloatingPDF />
            
            {/* Glowing orbs */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-0 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse delay-2000"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 sm:h-20 fill-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
