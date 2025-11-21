
import { motion } from 'framer-motion';
import { Sword, Calendar, Clock, AlertTriangle } from 'lucide-react';

const TheCrusade: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-void-black to-alliance-blue/10 relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-left border-l-4 border-alliance-blue pl-6"
                >
                    <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-2">
                        The Crusade
                    </h2>
                    <p className="text-alliance-blue text-xl font-bold tracking-widest uppercase">
                        Raid Team & Expectations
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Schedule Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-void-black/80 border border-alliance-blue/30 p-8 rounded-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Calendar className="w-32 h-32 text-alliance-blue" />
                        </div>

                        <h3 className="text-2xl font-cinzel font-bold text-white mb-6 flex items-center gap-3">
                            <Clock className="text-alliance-blue" /> Raid Schedule
                        </h3>

                        <div className="space-y-4 text-gray-300">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="font-bold">Tuesday</span>
                                <span className="text-alliance-gold">8:00 PM - 11:00 PM EST</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="font-bold">Thursday</span>
                                <span className="text-alliance-gold">8:00 PM - 11:00 PM EST</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 italic">
                                *Invites go out 15 minutes prior. Be repaired and ready.*
                            </p>
                        </div>
                    </motion.div>

                    {/* Code of Conduct */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-void-black/80 border border-alliance-gold/30 p-8 rounded-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sword className="w-32 h-32 text-alliance-gold" />
                        </div>

                        <h3 className="text-2xl font-cinzel font-bold text-white mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-alliance-gold" /> Code of Conduct
                        </h3>

                        <ul className="space-y-4 text-gray-300 list-disc list-inside">
                            <li>
                                <span className="text-white font-bold">Zero Toxicity:</span> We build each other up, never tear down.
                            </li>
                            <li>
                                <span className="text-white font-bold">Family Friendly:</span> Keep comms clean. We have members of all ages.
                            </li>
                            <li>
                                <span className="text-white font-bold">Commitment:</span> If you sign up, show up. Respect your team's time.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TheCrusade;
