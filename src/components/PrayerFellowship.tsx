import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, HandHeart } from 'lucide-react';
import GameMenuButton from './GameMenuButton';

const PrayerFellowship: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-[url('/assets/grid-pattern.png')] bg-fixed relative">
            <div className="absolute inset-0 bg-cyber-purple/5 backdrop-blur-sm" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <HandHeart className="w-16 h-16 text-cyber-purple mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6">
                        Prayer & Fellowship
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                        "Carry each other’s burdens, and in this way you will fulfill the law of Christ." - Galatians 6:2
                        <br /><br />
                        We believe in the power of prayer. Whether you are a guild member or a visitor, we want to stand with you in faith.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <GameMenuButton>
                            <MessageCircle className="w-5 h-5" /> Submit Prayer Request
                        </GameMenuButton>
                        <GameMenuButton>
                            Join Discord Fellowship
                        </GameMenuButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PrayerFellowship;
