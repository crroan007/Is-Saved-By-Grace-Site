import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Sword, Shield, Users, ArrowRight, ChevronLeft, Send, Cross } from 'lucide-react';
import GameMenuButton from './GameMenuButton';

type FunnelStep = 'intro' | 'path-selection' | 'character-info' | 'faith-check' | 'summary';

interface FormData {
  path: string;
  subPath: string;
  characterName: string;
  battleTag: string;
  class: string;
  primarySpec: string;
  secondarySpec: string;
  faithStatement: string;
  discordHandle: string;
  vanguardRank: number;      // AOTC Racing
  steadfastRank: number;     // Steady Normal → Heroic progression
  dungeoneerRank: number;    // M+ and Delves
  gladiatorRank: number;     // PVP
  fellowshipRank: number;    // Social
}

// WoW Classes and their specs
const WOW_CLASSES = [
  'Death Knight', 'Demon Hunter', 'Druid', 'Evoker', 'Hunter',
  'Mage', 'Monk', 'Paladin', 'Priest', 'Rogue',
  'Shaman', 'Warlock', 'Warrior'
] as const;

const CLASS_SPECS: Record<string, string[]> = {
  'Death Knight': ['Blood', 'Frost', 'Unholy'],
  'Demon Hunter': ['Havoc', 'Vengeance'],
  'Druid': ['Balance', 'Feral', 'Guardian', 'Restoration'],
  'Evoker': ['Devastation', 'Preservation', 'Augmentation'],
  'Hunter': ['Beast Mastery', 'Marksmanship', 'Survival'],
  'Mage': ['Arcane', 'Fire', 'Frost'],
  'Monk': ['Brewmaster', 'Mistweaver', 'Windwalker'],
  'Paladin': ['Holy', 'Protection', 'Retribution'],
  'Priest': ['Discipline', 'Holy', 'Shadow'],
  'Rogue': ['Assassination', 'Outlaw', 'Subtlety'],
  'Shaman': ['Elemental', 'Enhancement', 'Restoration'],
  'Warlock': ['Affliction', 'Demonology', 'Destruction'],
  'Warrior': ['Arms', 'Fury', 'Protection']
};

const slideVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
};

const RecruitmentFunnel: React.FC = () => {
  const [step, setStep] = useState<FunnelStep>('intro');
  const [animationState, setAnimationState] = useState<'idle' | 'completed'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    path: '',
    subPath: '',
    characterName: '',
    battleTag: '',
    class: '',
    primarySpec: '',
    secondarySpec: '',
    faithStatement: '',
    discordHandle: '',
    vanguardRank: 0,
    steadfastRank: 0,
    dungeoneerRank: 0,
    gladiatorRank: 0,
    fellowshipRank: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // If class changes, reset both specs
    if (name === 'class') {
      setFormData({ ...formData, class: value, primarySpec: '', secondarySpec: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = (target: FunnelStep) => setStep(target);
  const prevStep = (target: FunnelStep) => {
    setStep(target);
    if (target === 'intro') {
      setAnimationState('idle');
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);

    // Construct ranked activities list
    const activities = [
      { name: 'AOTC Racing (The Vanguard)', rank: formData.vanguardRank },
      { name: 'Steady Progression (The Steadfast)', rank: formData.steadfastRank },
      { name: 'M+ & Delves (The Dungeoneer)', rank: formData.dungeoneerRank },
      { name: 'PvP (The Gladiator)', rank: formData.gladiatorRank },
      { name: 'Social/Fellowship', rank: formData.fellowshipRank }
    ].filter(a => a.rank > 0).sort((a, b) => a.rank - b.rank);

    const activityList = activities.map(a => `#${a.rank} ${a.name}`).join('\n') || 'No activities selected';

    // Construct clean data for email and Google Sheets
    const applicationData = {
      _subject: `New Application: ${formData.characterName}`,
      "Character Name": formData.characterName,
      "Battle.net Tag": formData.battleTag,
      "Class": formData.class,
      "Primary Spec": formData.primarySpec,
      "Secondary Spec": formData.secondarySpec || "None",
      "Discord Username": formData.discordHandle,
      "Activity Priorities": activityList,
      "Faith Statement": formData.faithStatement,
    };

    try {
      // Use the secure serverless API endpoint for all environments
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${response.status}`);
      }

      setStep('summary');
    } catch (error: any) {
      console.error("Error sending application:", error);
      alert(`Failed to send application: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Northshire Abbey Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/northshire-abbey.png)' }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* ANIMATION CONTAINER */}
        <div className="relative w-full h-full flex items-center justify-center min-h-[600px]">

          {/* INTRO SECTION */}
          <AnimatePresence>
            {step === 'intro' && animationState === 'idle' && (
              <motion.div
                key="intro"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                className="text-center relative z-10"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-almendra italic text-alliance-gold mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_20px_rgba(255,209,0,0.6)]">
                  "Join our fellowship of believers! Share your faith by the hearth, then gear up for adventure!"
                </p>
                <GameMenuButton
                  onClick={() => {
                    // Play enter world sound
                    const audio = new Audio('/iEnterWorldA.ogg');
                    audio.volume = 0.1;
                    audio.play().catch(err => console.warn('Audio playback failed:', err));

                    // Fade out and transition
                    setAnimationState('completed');
                    setTimeout(() => {
                      setStep('path-selection');
                    }, 600);
                  }}
                  className="text-xl px-12 py-4 mx-auto relative z-20"
                >
                  Enter World <ArrowRight className="ml-2 w-5 h-5" />
                </GameMenuButton>
              </motion.div>
            )}
          </AnimatePresence>


          {/* PATH SELECTION */}
          {step === 'path-selection' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full bg-gradient-to-br from-black/80 via-void-black/90 to-black/80 border-2 border-alliance-gold/30 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(255,209,0,0.15)]"
            >
              {/* Thrall Quest Giver */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl font-bold text-alliance-gold animate-[subtle-bounce_2s_ease-in-out_infinite] drop-shadow-[0_0_25px_rgba(255,209,0,0.9)] z-10">
                    !
                  </div>
                  <img
                    src="/thrall-quest-giver.png"
                    alt="Thrall Quest Giver"
                    className="w-[480px] h-[480px] object-contain drop-shadow-[0_10px_40px_rgba(180,0,0,0.6)]"
                  />
                </div>
              </div>

              <h3 className="text-5xl md:text-6xl lg:text-7xl font-almendra italic text-alliance-gold mb-4 text-center drop-shadow-[0_0_30px_rgba(255,209,0,0.8)]">Choose your Destiny</h3>
              <p className="text-center text-gray-300 mb-10 text-lg">Select your quests! Rank your desired activities so we can guide you to the perfect group for your adventures. Unmarked paths will remain as side quests.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* The Vanguard - AOTC Racing */}
                <button
                  onClick={() => {
                    const currentRanks = [formData.vanguardRank, formData.steadfastRank, formData.dungeoneerRank, formData.gladiatorRank, formData.fellowshipRank].filter(r => r > 0);
                    const nextRank = formData.vanguardRank === 0 ? (currentRanks.length + 1) : 0;
                    setFormData({ ...formData, vanguardRank: nextRank });
                  }}
                  className={`group p-8 bg-black/60 border-2 rounded-xl transition-all text-left relative overflow-hidden ${formData.vanguardRank > 0
                    ? 'border-alliance-gold bg-alliance-gold/10 shadow-[0_0_20px_rgba(255,209,0,0.3)]'
                    : 'border-white/10 hover:border-alliance-gold/50'
                    }`}
                >
                  {formData.vanguardRank > 0 && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-alliance-gold rounded-full flex items-center justify-center font-bold text-2xl text-black shadow-[0_0_15px_rgba(255,209,0,0.8)] animate-pulse">
                      {formData.vanguardRank}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sword className="w-24 h-24" />
                  </div>
                  <Sword className="w-10 h-10 text-alliance-gold mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2 font-cinzel">The Vanguard</h4>
                  <p className="text-gray-400 text-sm">Race for AOTC & Cutting Edge</p>
                </button>

                {/* The Steadfast - Steady Progression */}
                <button
                  onClick={() => {
                    const currentRanks = [formData.vanguardRank, formData.steadfastRank, formData.dungeoneerRank, formData.gladiatorRank, formData.fellowshipRank].filter(r => r > 0);
                    const nextRank = formData.steadfastRank === 0 ? (currentRanks.length + 1) : 0;
                    setFormData({ ...formData, steadfastRank: nextRank });
                  }}
                  className={`group p-8 bg-black/60 border-2 rounded-xl transition-all text-left relative overflow-hidden ${formData.steadfastRank > 0
                    ? 'border-alliance-blue bg-alliance-blue/10 shadow-[0_0_20px_rgba(0,116,224,0.3)]'
                    : 'border-white/10 hover:border-alliance-blue/50'
                    }`}
                >
                  {formData.steadfastRank > 0 && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-alliance-blue rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_15px_rgba(0,116,224,0.8)] animate-pulse">
                      {formData.steadfastRank}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield className="w-24 h-24" />
                  </div>
                  <Shield className="w-10 h-10 text-alliance-blue mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2 font-cinzel">The Steadfast</h4>
                  <p className="text-gray-400 text-sm">Steady Normal → Heroic Progression</p>
                </button>

                {/* The Dungeoneer - M+ and Delves */}
                <button
                  onClick={() => {
                    const currentRanks = [formData.vanguardRank, formData.steadfastRank, formData.dungeoneerRank, formData.gladiatorRank, formData.fellowshipRank].filter(r => r > 0);
                    const nextRank = formData.dungeoneerRank === 0 ? (currentRanks.length + 1) : 0;
                    setFormData({ ...formData, dungeoneerRank: nextRank });
                  }}
                  className={`group p-8 bg-black/60 border-2 rounded-xl transition-all text-left relative overflow-hidden ${formData.dungeoneerRank > 0
                    ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'border-white/10 hover:border-green-500/50'
                    }`}
                >
                  {formData.dungeoneerRank > 0 && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse">
                      {formData.dungeoneerRank}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Cross className="w-24 h-24" />
                  </div>
                  <Cross className="w-10 h-10 text-green-500 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2 font-cinzel">The Dungeoneer</h4>
                  <p className="text-gray-400 text-sm">Mythic+ Keystones & Delves</p>
                </button>

                {/* The Gladiator - PvP */}
                <button
                  onClick={() => {
                    const currentRanks = [formData.vanguardRank, formData.steadfastRank, formData.dungeoneerRank, formData.gladiatorRank, formData.fellowshipRank].filter(r => r > 0);
                    const nextRank = formData.gladiatorRank === 0 ? (currentRanks.length + 1) : 0;
                    setFormData({ ...formData, gladiatorRank: nextRank });
                  }}
                  className={`group p-8 bg-black/60 border-2 rounded-xl transition-all text-left relative overflow-hidden ${formData.gladiatorRank > 0
                    ? 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : 'border-white/10 hover:border-red-500/50'
                    }`}
                >
                  {formData.gladiatorRank > 0 && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse">
                      {formData.gladiatorRank}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sword className="w-24 h-24 rotate-45" />
                  </div>
                  <Sword className="w-10 h-10 text-red-500 mb-4 rotate-45" />
                  <h4 className="text-xl font-bold text-white mb-2 font-cinzel">The Gladiator</h4>
                  <p className="text-gray-400 text-sm">PvP: Arenas & Battlegrounds</p>
                </button>

                {/* The Fellowship - Social */}
                <button
                  onClick={() => {
                    const currentRanks = [formData.vanguardRank, formData.steadfastRank, formData.dungeoneerRank, formData.gladiatorRank, formData.fellowshipRank].filter(r => r > 0);
                    const nextRank = formData.fellowshipRank === 0 ? (currentRanks.length + 1) : 0;
                    setFormData({ ...formData, fellowshipRank: nextRank });
                  }}
                  className={`group p-8 bg-black/60 border-2 rounded-xl transition-all text-left relative overflow-hidden ${formData.fellowshipRank > 0
                    ? 'border-cyber-purple bg-cyber-purple/10 shadow-[0_0_20px_rgba(138,43,226,0.3)]'
                    : 'border-white/10 hover:border-cyber-purple/50'
                    }`}
                >
                  {formData.fellowshipRank > 0 && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-cyber-purple rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_15px_rgba(138,43,226,0.8)] animate-pulse">
                      {formData.fellowshipRank}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users className="w-24 h-24" />
                  </div>
                  <Users className="w-10 h-10 text-cyber-purple mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2 font-cinzel">The Fellowship</h4>
                  <p className="text-gray-400 text-sm">Social: Housing, Events, Community</p>
                </button>
              </div>

              <div className="mt-10 flex justify-between items-center">
                <button onClick={() => prevStep('intro')} className="text-gray-500 hover:text-white flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <GameMenuButton
                  onClick={() => {
                    // Play invite sound
                    const audio = new Audio('/iPlayerInviteA.ogg');
                    audio.volume = 0.1;
                    audio.play().catch(err => console.warn('Audio playback failed:', err));

                    setStep('character-info');
                  }}
                  disabled={[formData.vanguardRank, formData.steadfastRank, formData.dungeoneerRank, formData.gladiatorRank, formData.fellowshipRank].every(r => r === 0)}
                  className="px-8 py-3"
                >
                  Accept <ArrowRight className="ml-2 w-5 h-5" />
                </GameMenuButton>
              </div>
            </motion.div>
          )}

          {/* CHARACTER INFO FORM */}
          {step === 'character-info' && (
            <motion.div
              key="character-info"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl mx-auto bg-gradient-to-br from-black/80 via-void-black/90 to-black/80 border-2 border-alliance-gold/30 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(255,209,0,0.15)]"
            >
              <h3 className="text-3xl font-almendra italic text-alliance-gold mb-6 text-center drop-shadow-[0_0_15px_rgba(255,209,0,0.6)]">Who Are You?</h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-alliance-gold font-cinzel mb-2 text-sm">Character Name</label>
                    <input
                      type="text"
                      name="characterName"
                      value={formData.characterName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="block text-alliance-gold font-cinzel mb-2 text-sm">Battle.net Tag</label>
                    <input
                      type="text"
                      name="battleTag"
                      value={formData.battleTag}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none"
                      placeholder="Username#1234"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-alliance-gold font-cinzel mb-2 text-sm">Class</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleSelectChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none"
                  >
                    <option value="">Select Class</option>
                    {WOW_CLASSES.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-alliance-gold font-cinzel mb-2 text-sm">Primary Specialization</label>
                    <select
                      name="primarySpec"
                      value={formData.primarySpec}
                      onChange={handleSelectChange}
                      required
                      disabled={!formData.class}
                      className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Primary Spec</option>
                      {formData.class && CLASS_SPECS[formData.class]?.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-alliance-gold font-cinzel mb-2 text-sm">Secondary Specialization</label>
                    <select
                      name="secondarySpec"
                      value={formData.secondarySpec}
                      onChange={handleSelectChange}
                      disabled={!formData.class}
                      className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Secondary Spec (Optional)</option>
                      {formData.class && CLASS_SPECS[formData.class]?.filter(spec => spec !== formData.primarySpec).map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-alliance-gold font-cinzel mb-2 text-sm">Discord Username</label>
                  <input
                    type="text"
                    name="discordHandle"
                    value={formData.discordHandle}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none"
                    placeholder="username"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => prevStep('path-selection')} className="text-gray-500 hover:text-white flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <GameMenuButton
                    onClick={() => nextStep('faith-check')}
                    className="px-8"
                    disabled={!formData.characterName || !formData.battleTag || !formData.class || !formData.primarySpec || !formData.discordHandle}
                  >
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                  </GameMenuButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* FAITH CHECK */}
          {step === 'faith-check' && (
            <motion.div
              key="faith-check"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl mx-auto bg-gradient-to-br from-black/80 via-void-black/90 to-black/80 border-2 border-alliance-gold/30 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(255,209,0,0.15)]"
            >
              <h3 className="text-6xl md:text-7xl lg:text-8xl font-almendra italic text-alliance-gold mb-6 text-center drop-shadow-[0_0_15px_rgba(255,209,0,0.6)]">The Final Question</h3>

              <div className="space-y-6">
                <p className="text-gray-300 text-center italic mb-6 text-lg md:text-xl">
                  "We are a guild founded on faith in <span className="text-alliance-gold font-bold text-[1.07em] drop-shadow-[0_0_25px_rgba(255,209,0,1)] animate-pulse inline-block">Jesus Christ</span>. We ask all members to respect our values and community guidelines."
                </p>

                <div>
                  <label className="block text-alliance-gold font-cinzel italic mb-3 text-[1.1em] md:text-[1.32em] lg:text-[1.43em]">Please tell us a little about your testimony, and how you know you are saved in Christ</label>
                  <textarea
                    rows={4}
                    name="faithStatement"
                    value={formData.faithStatement}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-alliance-gold outline-none"
                    placeholder="Share your story of grace..."
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => prevStep('character-info')} className="text-gray-500 hover:text-white flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <GameMenuButton onClick={() => {
                    // Play quest complete sound
                    const audio = new Audio('/iQuestComplete.ogg');
                    audio.volume = 0.1;
                    audio.play().catch(err => console.warn('Audio playback failed:', err));

                    submitApplication();
                  }} className="px-8" disabled={isSubmitting || !formData.faithStatement}>
                    {isSubmitting ? 'Sending...' : <><Send className="mr-2 w-4 h-4" /> Submit Application</>}
                  </GameMenuButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUMMARY / SUCCESS */}
          {step === 'summary' && (
            <motion.div
              key="summary"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center max-w-2xl mx-auto"
            >
              {/* Animated Logo replacing checkmark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="flex justify-center mb-6 relative"
              >
                {/* Flash of light effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 2.5, 2] }}
                  transition={{
                    delay: 0.3,
                    duration: 1.2,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-96 h-96 bg-alliance-gold/40 rounded-full blur-3xl" />
                </motion.div>

                {/* Logo */}
                <motion.img
                  src="/gold coins.png"
                  alt="Quest Reward - Gold Coins"
                  className="w-96 h-96 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,209,0,0.6)]"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 30px rgba(255,209,0,0.6))",
                      "drop-shadow(0 0 40px rgba(255,209,0,0.9))",
                      "drop-shadow(0 0 30px rgba(255,209,0,0.6))"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              <h2 className="text-4xl font-cinzel font-bold text-white mb-4">
                What's Next?
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-rajdhani">
                Keep an eye out for an invitation on Discord! Our fellowship will reach out to welcome you and guide you through the next steps of your journey.
              </p>



              <GameMenuButton onClick={() => setStep('intro')} className="mx-auto">
                Return to Home
              </GameMenuButton>
            </motion.div>
          )}
        </div>
      </div>
    </section >
  );
};

export default RecruitmentFunnel;
