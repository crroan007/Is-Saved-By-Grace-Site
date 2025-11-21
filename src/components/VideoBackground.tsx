

const VideoBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden">
            <div className="absolute inset-0 bg-void-black/40 z-10" /> {/* Dark overlay */}
            <div className="absolute inset-0 bg-[url('/assets/grid-pattern.png')] opacity-10 z-10 mix-blend-overlay" /> {/* Optional texture */}
            <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-void-black z-20" /> {/* Vignette */}

            <video
                key="tww-intro-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={(e) => console.error('Video playback error:', e)}
                className="w-full h-full object-cover"
                style={{
                    backgroundColor: '#0a0a0a',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                }}
            >
                <source src="/assets/tww-intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBackground;
