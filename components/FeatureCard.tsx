
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
    >
      <div className="relative p-8 rounded-3xl glass backdrop-blur-xl border border-white/20 shadow-2xl h-full overflow-hidden">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        />
        
        {/* Glowing border on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316) border-box',
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'subtract',
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 mb-6 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {/* Sparkle effect */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
        </div>

        {/* Animated gradient line at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-hero transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ width: '100%' }}
        />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
