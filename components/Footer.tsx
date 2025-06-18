import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles only on client side
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-2xl font-bold gradient-text">PDF Note Taker</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Transform your PDF reading experience with AI-powered summaries. Save time, boost productivity, and focus on what truly matters.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover-underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'API Docs'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover-underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 text-center md:text-left">
            © 2024 AI PDF Note Taker. All rights reserved.
          </p>
          <p className="text-gray-400 text-center md:text-right mt-4 md:mt-0">
            Made with ❤️ for students and professionals
          </p>
        </motion.div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
