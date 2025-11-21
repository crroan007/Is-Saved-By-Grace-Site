
import { motion } from 'framer-motion';
import { ScrollText, Send } from 'lucide-react';
import GameMenuButton from './GameMenuButton';

const Enlistment: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-void-black relative">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-alliance-gold/30 p-8 md:p-12 rounded-xl backdrop-blur-md"
                >
                    <div className="text-center mb-10">
                        <ScrollText className="w-12 h-12 text-alliance-gold mx-auto mb-4" />
                        <h2 className="text-4xl font-cinzel font-bold text-white mb-2">Enlistment</h2>
                        <p className="text-gray-400">Join the ranks of the faithful.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-alliance-gold font-cinzel mb-2">Character Name</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-alliance-gold font-cinzel mb-2">Class & Spec</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-alliance-gold font-cinzel mb-2">BattleTag / Discord</label>
                            <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none transition-colors" />
                        </div>

                        <div>
                            <label className="block text-alliance-gold font-cinzel mb-2">What does "Saved By Grace" mean to you?</label>
                            <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none transition-colors"></textarea>
                        </div>

                        <div className="text-center pt-4">
                            <GameMenuButton className="w-full md:w-auto justify-center">
                                <Send className="w-4 h-4" /> Submit Application
                            </GameMenuButton>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Enlistment;
