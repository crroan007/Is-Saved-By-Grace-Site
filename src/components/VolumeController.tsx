import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControllerProps {
  audioElementId: string;
  initialVolume?: number;
}

export default function VolumeController({ audioElementId, initialVolume = 0.05 }: VolumeControllerProps) {
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById(audioElementId) as HTMLAudioElement;
    if (audioElement) {
      // Use volume = 0 instead of muted to avoid suspending audio context
      audioElement.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioElementId]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-void-black/80 backdrop-blur-xl border-2 border-alliance-gold/60 rounded-lg p-3 shadow-[0_0_30px_rgba(255,209,0,0.2)]">
      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="text-alliance-gold hover:text-alliance-gold/80 transition-colors duration-200"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      {/* Volume Slider */}
      <div className="relative w-28">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-void-black/50 border border-alliance-gold/40 rounded-lg appearance-none cursor-pointer accent-alliance-gold slider"
          style={{
            background: `linear-gradient(to right, rgb(255, 209, 0) 0%, rgb(255, 209, 0) ${(isMuted ? 0 : volume) * 100}%, rgba(0,0,0,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(0,0,0,0.3) 100%)`
          }}
        />
        {/* Volume Percentage Text */}
        <div className="absolute -bottom-6 right-0 text-xs text-alliance-gold/70 whitespace-nowrap">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd100, #ffed4e);
          border: 2px solid #ffd100;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(255, 209, 0, 0.6);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          width: 18px;
          height: 18px;
          box-shadow: 0 0 15px rgba(255, 209, 0, 0.9);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd100, #ffed4e);
          border: 2px solid #ffd100;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(255, 209, 0, 0.6);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          width: 18px;
          height: 18px;
          box-shadow: 0 0 15px rgba(255, 209, 0, 0.9);
        }
      `}</style>
    </div>
  );
}
