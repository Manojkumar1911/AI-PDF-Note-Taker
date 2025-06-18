import { motion } from 'framer-motion';
import Image from 'next/image';

const pdfIcons = ['/pdf-icon.png', '/pdf-icon-2.png', '/ai-icon.png'];

const FloatingPDF = () => {
  // 3 floating icons, now larger (140x180px) and using all three icons
  const floatingIcons = [
    {
      icon: pdfIcons[0],
      style: { top: '5rem', left: '2.5rem', width: 140, height: 180 },
      animate: { y: [0, -20, 0], rotate: [0, 5, 0] },
      transition: { duration: 3, repeat: Infinity }
    },
    {
      icon: pdfIcons[1],
      style: { top: '8rem', right: '5rem', width: 140, height: 180 },
      animate: { y: [0, -15, 0], rotate: [0, -3, 0] },
      transition: { duration: 2.5, repeat: Infinity, delay: 0.5 }
    },
    {
      icon: pdfIcons[2],
      style: { bottom: '8rem', left: '25%', width: 140, height: 180 },
      animate: { y: [0, -25, 0], rotate: [0, 2, 0] },
      transition: { duration: 3.5, repeat: Infinity, delay: 1 }
    }
  ];

  return (
    <div className="w-full h-96 md:h-[500px] relative overflow-hidden rounded-3xl">
      {/* Floating PDF icons with animation */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center"
          style={{ ...item.style, zIndex: 2 }}
          animate={item.animate}
          transition={item.transition}
        >
          <Image src={item.icon} alt="Floating Icon" width={140} height={180} className="object-contain" />
        </motion.div>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={100 + i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
            zIndex: 3
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}

      {/* Central floating sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-400 rounded-full shadow-lg"
        style={{ transform: 'translate(-50%, -50%)', zIndex: 4 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      />
    </div>
  );
};

export default FloatingPDF;
