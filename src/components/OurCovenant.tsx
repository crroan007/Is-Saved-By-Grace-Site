import React from 'react';
import { motion } from 'framer-motion';

const OurCovenant: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-void-black/90 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-alliance-gold to-transparent opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Statement of Faith - Open Bible Design */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Open Bible Container */}
                    <div className="relative bg-gradient-to-b from-[#2a2520] to-[#1a1510] border-2 border-[#3a3530]/40 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.6)] p-8 md:p-12">
                        {/* Center Crease/Spine */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-black/30 to-transparent -translate-x-1/2" />

                        {/* Subtle Page Texture */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGFwZXIiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjAuNSIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4wMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXBlcikiLz48L3N2Zz4=')] opacity-30 pointer-events-none rounded-lg" />

                        {/* Left Page Shadow */}
                        <div className="absolute left-0 top-4 bottom-4 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

                        {/* Right Page Shadow */}
                        <div className="absolute right-0 top-4 bottom-4 w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-almendra italic text-alliance-gold mb-8 text-center drop-shadow-[0_0_20px_rgba(255,209,0,0.6)]">
                                Our Beliefs
                            </h3>

                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 font-rajdhani text-lg">
                                <p className="font-bold text-white text-xl">
                                    We recognize God as our authority in every area of life. We also acknowledge that we will answer to Him for every action we take. He has given us the privilege to reach many people, and as recipients of God’s grace, He will judge our obedience to Him.
                                </p>

                                <ul className="columns-1 md:columns-2 gap-6 list-none pl-0 space-y-6 md:space-y-0">
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe the Bible to be inspired, the only infallible Word of God.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe that there is one God, eternally existent in three Persons: Father, Son, and Holy Spirit.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe in the deity of Christ, in His virgin birth, in His sinless life, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father and His personal return in power and glory.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe that for the salvation of lost and sinful man, regeneration by the Holy Spirit is essential.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe in the resurrection of both the saved and the lost – those who are saved unto the resurrection of life or lost unto the resurrection of damnation.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe in the spiritual unity of believers in Christ.</span>
                                    </li>
                                    <li className="flex gap-3 break-inside-avoid mb-0 md:mb-6">
                                        <img src="/assets/Guild Logo Transparent.png" alt="Cross" className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_0_5px_rgba(255,209,0,0.8)] mt-1" />
                                        <span>We believe in the biblical design for family, upholding marriage as a sacred covenant between one man and one woman, and affirming God's created order for gender and family structure as revealed in Scripture.</span>
                                    </li>
                                </ul>

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={{
                                        hidden: { opacity: 0, filter: "blur(10px)" },
                                        visible: {
                                            opacity: [0, 1, 0.2, 1, 0.5, 1],
                                            filter: ["blur(10px)", "blur(0px)", "blur(5px)", "blur(0px)", "blur(2px)", "blur(0px)"],
                                            transition: {
                                                duration: 1.2,
                                                times: [0, 0.1, 0.3, 0.5, 0.8, 1],
                                                ease: "easeInOut"
                                            }
                                        }
                                    }}
                                    className="mt-12 p-8 bg-[#1a1510] border-2 border-alliance-gold/60 rounded-xl relative overflow-hidden shadow-[0_0_30px_rgba(255,209,0,0.15)]"
                                >
                                    {/* Parchment Texture */}
                                    <div className="absolute inset-0 bg-[url('/assets/texture-noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

                                    {/* Inner Border */}
                                    <div className="absolute inset-2 border border-alliance-gold/30 rounded-lg pointer-events-none" />

                                    {/* Corner Accents */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-alliance-gold opacity-80" />
                                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-alliance-gold opacity-80" />
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-alliance-gold opacity-80" />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-alliance-gold opacity-80" />

                                    <p className="font-almendra italic text-xl md:text-2xl tracking-wide text-alliance-gold drop-shadow-[0_0_5px_rgba(255,209,0,0.6)] relative z-10 text-center leading-relaxed">
                                        "We hold to the conviction that the Bible is God's unchanging Word, maintaining a traditional interpretation of Scripture. We stand firm in these beliefs, and our community is best suited for those who share these values."
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OurCovenant;
