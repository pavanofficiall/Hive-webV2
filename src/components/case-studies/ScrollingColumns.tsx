'use client';

import { motion } from 'framer-motion';

const MOCK_LOGOS = [
  'https://cdn.prod.website-files.com/680d056250b560d204945e76/68e0b3abcabcac6829e7d778_colored-logo%20(2).avif',
  'https://cdn.prod.website-files.com/680d056250b560d204945e76/68e0b1d700060b17ea5a2a7b_colored-logo%20(1).avif',
  'https://cdn.prod.website-files.com/680d056250b560d204945e76/68dd4ac7b439fcfacef3f36f_colored-logo.avif',
  'https://cdn.prod.website-files.com/680d056250b560d204945e76/68d192645c223fd20073ee88_62e94e850f9f1f40575f8d13_Logo-airops-white.svg',
  'https://cdn.prod.website-files.com/680d056250b560d204945e76/68dd4ecb6f66f761d0a0abcb_6351b4250723e64b964380f0_keragon-logo-white.svg',
  'https://cdn.prod.website-files.com/680d056250b560d204945e76/6903af5d75b619e78a440183_6901e79be6fc1a2d17f94643_aircall%20logo%20white%20(2).png'
];

// Duplicate logos to create a seamless loop
const LOGOS_LIST = [...MOCK_LOGOS, ...MOCK_LOGOS, ...MOCK_LOGOS];

export function ScrollingColumns() {
  return (
    <div className="relative h-[600px] w-full max-w-[600px] overflow-hidden rounded-3xl bg-white/[0.01] p-4 border border-white/10 backdrop-blur-sm mx-auto shadow-2xl flex gap-6">
      {/* Top and Bottom Fade Masks */}
      <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#030611] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#030611] to-transparent pointer-events-none" />

      {/* Column 1 - Scrolling Up */}
      <div className="flex-1 overflow-hidden relative h-full">
        <motion.div
          animate={{
            y: ['0%', '-50%'],
          }}
          transition={{
            y: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          className="flex flex-col gap-6 w-full"
        >
          {LOGOS_LIST.map((logo, index) => (
            <div
              key={`col1-${index}`}
              className="w-full aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-8 hover:bg-white/[0.04] transition-colors shadow-lg"
            >
              <img src={logo} alt="Client Logo" className="max-w-[80%] max-h-[80%] object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Column 2 - Scrolling Down */}
      <div className="flex-1 overflow-hidden relative h-full mt-[-10%]">
        <motion.div
          animate={{
            y: ['-50%', '0%'],
          }}
          transition={{
            y: {
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          className="flex flex-col gap-6 w-full"
        >
          {LOGOS_LIST.map((logo, index) => (
            <div
              key={`col2-${index}`}
              className="w-full aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-8 hover:bg-white/[0.04] transition-colors shadow-lg"
            >
              <img src={logo} alt="Client Logo" className="max-w-[80%] max-h-[80%] object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
