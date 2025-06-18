import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2 sm:space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-lg">AI</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-lg sm:text-xl font-bold gradient-text hidden sm:block">PDF Note Taker</span>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 glass rounded-full px-4 sm:px-6 py-2 sm:py-3">
          <a href="#" className="text-white hover:text-purple-200 hover-underline font-medium transition-colors duration-300 text-sm sm:text-base">Home</a>
          <a href="#features" className="text-white hover:text-purple-200 hover-underline font-medium transition-colors duration-300 text-sm sm:text-base">Features</a>
          <a href="#" className="text-white hover:text-purple-200 hover-underline font-medium transition-colors duration-300 text-sm sm:text-base">About</a>
          <a href="#" className="text-white hover:text-purple-200 hover-underline font-medium transition-colors duration-300 text-sm sm:text-base">Contact</a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
          <motion.button
            className="text-white font-medium hover:text-purple-200 hover-underline transition-colors duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/sign-in')}
          >
            Login
          </motion.button>
          
          <motion.button
            className="relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-hero text-white rounded-full font-medium shadow-lg overflow-hidden text-sm sm:text-base"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => router.push('/sign-up')}
          >
            <span className="relative z-10">Sign Up</span>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              <a href="#" className="block text-white hover:text-purple-200 font-medium transition-colors duration-300">Home</a>
              <a href="#features" className="block text-white hover:text-purple-200 font-medium transition-colors duration-300">Features</a>
              <a href="#" className="block text-white hover:text-purple-200 font-medium transition-colors duration-300">About</a>
              <a href="#" className="block text-white hover:text-purple-200 font-medium transition-colors duration-300">Contact</a>
              
              <div className="pt-4 border-t border-white/20 space-y-3">
                <motion.button
                  className="w-full text-white font-medium hover:text-purple-200 transition-colors duration-300 text-left"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    router.push('/sign-in');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </motion.button>
                
                <motion.button
                  className="w-full px-4 py-2 bg-gradient-hero text-white rounded-full font-medium shadow-lg"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    router.push('/sign-up');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
