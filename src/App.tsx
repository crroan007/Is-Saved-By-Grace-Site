import { motion } from 'framer-motion';
import { Scroll, LogIn } from 'lucide-react';
import VideoBackground from './components/VideoBackground';
import GameMenuButton from './components/GameMenuButton';
import OurCovenant from './components/OurCovenant';
import VolumeController from './components/VolumeController';
import RecruitmentFunnel from './components/RecruitmentFunnel';

function App() {
  return (
    <div className="min-h-screen text-white font-rajdhani overflow-x-hidden">
      <VideoBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-void-black/90 to-transparent">
        <div className="flex items-center gap-4">
          {/* Logo and Title removed as requested */}
        </div>
        <div className="flex gap-4">
          <GameMenuButton
            className="hidden md:flex"
            onClick={() => document.getElementById('our-beliefs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <Scroll className="w-4 h-4" /> About
          </GameMenuButton>
          <GameMenuButton
            onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <LogIn className="w-4 h-4" /> Apply
          </GameMenuButton>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-start text-center px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="/assets/Guild Logo Transparent.png"
            alt="Is Saved By Grace Guild Logo"
            className="w-full max-w-2xl h-auto drop-shadow-[0_0_35px_rgba(255,209,0,0.6)] hover:drop-shadow-[0_0_50px_rgba(0,116,224,0.8)] transition-all duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative mb-12 max-w-4xl mx-auto group"
          >
            {/* Glowing Container - Fantasy Style */}
            <div className="relative bg-void-black/80 backdrop-blur-xl border-4 border-double border-alliance-gold/60 rounded-xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,209,0,0.15)] hover:shadow-[0_0_80px_rgba(255,209,0,0.3)] transition-all duration-500">

              {/* Parchment/Magic Texture Overlay */}
              <div className="absolute inset-0 bg-[url('/assets/texture-noise.png')] opacity-10 pointer-events-none rounded-xl mix-blend-overlay" />

              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,209,0,0.05),transparent_70%)] pointer-events-none" />

              {/* Ornate Corners */}
              {/* Top Left */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-alliance-gold rounded-tl-lg drop-shadow-[0_0_5px_rgba(255,209,0,0.8)]" />
              {/* Top Right */}
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-alliance-gold rounded-tr-lg drop-shadow-[0_0_5px_rgba(255,209,0,0.8)]" />
              {/* Bottom Left */}
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-alliance-gold rounded-bl-lg drop-shadow-[0_0_5px_rgba(255,209,0,0.8)]" />
              {/* Bottom Right */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-alliance-gold rounded-br-lg drop-shadow-[0_0_5px_rgba(255,209,0,0.8)]" />

              {/* Decorative Center Top Element */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-alliance-gold shadow-[0_0_10px_rgba(255,209,0,0.8)]" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-alliance-gold rotate-45 shadow-[0_0_10px_rgba(255,209,0,0.8)]" />

              {/* Decorative Center Bottom Element */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-alliance-gold shadow-[0_0_10px_rgba(255,209,0,0.8)]" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-alliance-gold rotate-45 shadow-[0_0_10px_rgba(255,209,0,0.8)]" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-2xl md:text-3xl font-cinzel font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
                >
                  Are you a Christian seeking a family-friendly WoW guild?
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-lg md:text-xl text-yellow-100/90 font-rajdhani leading-relaxed"
                >
                  <ul className="space-y-4 max-w-2xl mx-auto">
                    <li className="flex gap-4 items-start">
                      <img src="/assets/Guild Logo Transparent.png" alt="" className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                      <span>Race towards AOTC with our progression team</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <img src="/assets/Guild Logo Transparent.png" alt="" className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                      <span>Take a steadier pace through Normal and Heroic</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <img src="/assets/Guild Logo Transparent.png" alt="" className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                      <span>Push Mythic+ keys to new heights</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <img src="/assets/Guild Logo Transparent.png" alt="" className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                      <span>Test your mettle in PvP arenas and battlegrounds</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <img src="/assets/Guild Logo Transparent.png" alt="" className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                      <span>Decorate your plot and build community spaces</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <img src="/assets/Guild Logo Transparent.png" alt="" className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                      <span>Or just want believers to fellowship with...</span>
                    </li>
                  </ul>
                  <span className="block mt-6 text-xl md:text-2xl text-white font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] text-center">we have a seat at the table for you!</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-xl md:text-2xl font-cinzel text-alliance-gold font-bold drop-shadow-[0_0_20px_rgba(255,209,0,1)] pt-4 border-t border-alliance-gold/30"
                >
                  Set your hearthstone with us if you are Saved By Grace.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-sm md:text-base font-rajdhani italic text-yellow-200/80 pt-2"
                >
                  "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved." - Romans 10:9-10
                </motion.p>
              </div>
            </div>
          </motion.div>


        </motion.div>
      </main>

      {/* Content Sections */}
      <div id="our-beliefs">
        <OurCovenant />
      </div>
      <div id="recruitment">
        <RecruitmentFunnel />
      </div>


      {/* Background Music */}
      <audio
        id="bg-music"
        autoPlay
        loop
        muted
        ref={(audio) => {
          if (audio) {
            audio.volume = 0.05;
          }
        }}
      >
        <source src="/northshire-music.mp4" type="audio/mp4" />
      </audio>

      {/* Volume Controller */}
      <VolumeController audioElementId="bg-music" initialVolume={0.05} />

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm bg-void-black/80 backdrop-blur-md border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Is Saved By Grace. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
