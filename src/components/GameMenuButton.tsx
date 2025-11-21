import { motion } from 'framer-motion';

interface GameMenuButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const GameMenuButton: React.FC<GameMenuButtonProps> = ({ children, onClick, className = '', disabled = false }) => {
    return (
        <motion.button
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            disabled={disabled}
            className={`
        relative px-8 py-3 
        font-cinzel font-bold text-lg tracking-widest uppercase
        border-2 
        transition-all duration-300
        group overflow-hidden
        rounded-md
        ${disabled
                    ? 'bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed grayscale shadow-none'
                    : 'text-[#FFD100] border-[#FFD100] bg-gradient-to-b from-[#7a0000] to-[#300000] hover:from-[#9a0000] hover:to-[#500000] hover:border-white hover:text-white hover:shadow-[0_0_25px_rgba(255,209,0,0.7),inset_0_0_20px_rgba(255,209,0,0.1)] shadow-[0_0_15px_rgba(0,0,0,0.5)]'
                }
        ${className}
      `}
            onClick={onClick}
        >
            {/* Texture Overlay removed - using gradients instead for better performance */}

            {/* Scanline Overlay (Cyberpunk 2077 Effect) */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,209,0,0.03)_50%)] bg-[length:100%_2px] pointer-events-none" />

            {/* Inner Bevel/Highlight (Classic WoW Button Depth) */}
            <div className="absolute inset-0 border-t border-white/20 border-b border-black/50 rounded-md pointer-events-none" />

            {/* Cyberpunk Glitch Effect Overlay - Only if not disabled */}
            {!disabled && (
                <span className="absolute inset-0 bg-alliance-gold/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                {children}
            </span>

            {/* Enhanced Corner Accents (Cyberpunk Tech Brackets) */}
            {/* Top Left */}
            <div className={`absolute top-0 left-0 w-4 h-4 transition-all duration-300 ${disabled ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                <div className={`absolute top-0 left-0 w-full h-[2px] ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute top-0 left-0 w-[2px] h-full ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute top-1 left-1 w-1 h-1 ${disabled ? 'bg-gray-600' : 'bg-white shadow-[0_0_3px_rgba(255,255,255,0.9)]'}`} />
            </div>

            {/* Top Right */}
            <div className={`absolute top-0 right-0 w-4 h-4 transition-all duration-300 ${disabled ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                <div className={`absolute top-0 right-0 w-full h-[2px] ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute top-0 right-0 w-[2px] h-full ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute top-1 right-1 w-1 h-1 ${disabled ? 'bg-gray-600' : 'bg-white shadow-[0_0_3px_rgba(255,255,255,0.9)]'}`} />
            </div>

            {/* Bottom Left */}
            <div className={`absolute bottom-0 left-0 w-4 h-4 transition-all duration-300 ${disabled ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                <div className={`absolute bottom-0 left-0 w-full h-[2px] ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute bottom-0 left-0 w-[2px] h-full ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute bottom-1 left-1 w-1 h-1 ${disabled ? 'bg-gray-600' : 'bg-white shadow-[0_0_3px_rgba(255,255,255,0.9)]'}`} />
            </div>

            {/* Bottom Right */}
            <div className={`absolute bottom-0 right-0 w-4 h-4 transition-all duration-300 ${disabled ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                <div className={`absolute bottom-0 right-0 w-full h-[2px] ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute bottom-0 right-0 w-[2px] h-full ${disabled ? 'bg-gray-600' : 'bg-[#FFD100] shadow-[0_0_4px_rgba(255,209,0,0.8)]'}`} />
                <div className={`absolute bottom-1 right-1 w-1 h-1 ${disabled ? 'bg-gray-600' : 'bg-white shadow-[0_0_3px_rgba(255,255,255,0.9)]'}`} />
            </div>

            {/* Edge Glow Effect (Cyberpunk) */}
            {!disabled && (
                <>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD100] to-transparent shadow-[0_0_8px_rgba(255,209,0,0.8)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD100] to-transparent shadow-[0_0_8px_rgba(255,209,0,0.8)]" />
                        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#FFD100] to-transparent shadow-[0_0_8px_rgba(255,209,0,0.8)]" />
                        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#FFD100] to-transparent shadow-[0_0_8px_rgba(255,209,0,0.8)]" />
                    </div>
                </>
            )}
        </motion.button>
    );
};

export default GameMenuButton;
