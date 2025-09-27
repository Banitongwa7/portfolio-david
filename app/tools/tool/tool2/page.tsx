"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaCloudRain, FaWind, FaVolumeUp, FaVolumeOff, FaHeadphones } from 'react-icons/fa'; // Added FaHeadphones
import { IoThunderstormOutline } from "react-icons/io5";
import { PiWavesBold } from "react-icons/pi";

// --- Placeholder Audio URLs (Ensure these are publicly accessible or in your /public folder) ---
const LOFI_MUSIC_URL = '/audio/lofi.mp3'; 
const RAIN_SOUND_URL = '/audio/rain.wav';
const WIND_SOUND_URL = '/audio/wind.wav';
const WAVES_SOUND_URL = '/audio/waves.wav';
const THUNDER_SOUND_URL = '/audio/thunder.wav';
// ---------------------------------------------------------------------------------

// --- LOFI BACKGROUND IMAGE (IMPORTANT: Replace this with your actual image path) ---
const LOFI_BACKGROUND_IMAGE = '/images/lofi/window.gif'; 
// Example: A cozy image of a desk, rain on a window, or a peaceful night scene with a laptop.
// ---------------------------------------------------------------------------------

// Helper component for sound control
// Added optional 'defaultVolume' prop for better control mixing
const VolumeControl = ({ icon: Icon, label, audioRef, defaultVolume = 0.5 }: { 
    icon: React.ComponentType<{ className?: string }>, 
    label: string, 
    audioRef: React.RefObject<HTMLAudioElement>,
    defaultVolume?: number // Optional prop for initial volume
}) => {
  const [volume, setVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      // Set initial volume
      audioRef.current.volume = defaultVolume; 
      audioRef.current.loop = true; 
    }
  }, [audioRef, defaultVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      if (newMutedState) {
        audioRef.current.volume = 0;
      } else {
        // Restore to saved volume level
        audioRef.current.volume = volume; 
      }
    }
  };

  return (
    // Applied Glassmorphism style: semi-transparent white/blur
    <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition duration-300 hover:bg-white/20">
      <Icon className="text-xl text-cyan-300 shrink-0" />
      <span className="text-sm font-medium w-16 text-gray-100 shrink-0">{label}</span>
      
      {/* Mute Button */}
      <button onClick={toggleMute} className="text-lg text-gray-300 hover:text-white transition duration-200" aria-label={`Toggle mute for ${label}`}>
        {isMuted || volume === 0 ? <FaVolumeOff /> : <FaVolumeUp />}
      </button>

      {/* Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        // Use the saved volume if not muted, otherwise 0
        value={isMuted ? 0 : volume} 
        onChange={handleVolumeChange}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-400"
        disabled={isMuted} // Disable slider interaction when muted
      />
      <audio
        ref={audioRef}
        src={
          label === 'Lofi Track'
            ? LOFI_MUSIC_URL
            : label === 'Rain'
            ? RAIN_SOUND_URL
            : label === 'Wind'
            ? WIND_SOUND_URL
            : label === 'Waves'
            ? WAVES_SOUND_URL
            : label === 'Thunder'
            ? THUNDER_SOUND_URL
            : undefined
        }
        preload="auto"
      />
    </div>
  );
};

// Main Component
export default function Tool2() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Ensure we use null as the initial value for useRef when using TS
  const lofiRef = useRef<HTMLAudioElement>(null!) as React.RefObject<HTMLAudioElement>;
  const rainRef = useRef<HTMLAudioElement>(null!) as React.RefObject<HTMLAudioElement>;
  const windRef = useRef<HTMLAudioElement>(null!) as React.RefObject<HTMLAudioElement>;
  const wavesRef = useRef<HTMLAudioElement>(null!) as React.RefObject<HTMLAudioElement>;
  const thunderRef = useRef<HTMLAudioElement>(null!) as React.RefObject<HTMLAudioElement>;

  // Play/Pause logic for the main Lofi track and ambient sounds
  const togglePlayPause = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    const playOrPause = (ref: React.RefObject<HTMLAudioElement | null>) => {
      if (ref.current) {
        // Attempt to play only if volume is above zero (or not muted by user)
        if (nextIsPlaying) {
          // Play starts muted tracks too, user will un-mute via controls
          ref.current.play().catch(e => console.error("Audio playback failed:", e));
        } else {
          ref.current.pause();
        }
      }
    };

    // Play/pause all tracks
    playOrPause(lofiRef);
    playOrPause(rainRef);
    playOrPause(windRef);
    playOrPause(wavesRef);
    playOrPause(thunderRef);

  };

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.loop = true; 
    }
  }, []);


  return (
    <section 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${LOFI_BACKGROUND_IMAGE})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' 
      }}
    >
        {/* Overlay for darkening the image and improving readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-75 z-0"></div>

      {/* Main Control Card */}
      <div className="w-full max-w-lg relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-8 animate-in fade-in duration-1000 border border-white/20">
        
        {/* Header and Title */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            <FaHeadphones className="text-cyan-400" /> Lofi Focus
          </h1>
          <p className="text-gray-300 text-md">Your perfect coding and study atmosphere.</p>
        </header>

        {/* Main Play/Pause Control */}
        <div className="flex justify-center">
          <button
            onClick={togglePlayPause}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 
                        ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'} 
                        text-white shadow-lg transform hover:scale-105 border-2 border-white/30`}
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        {/* Music Control */}
        <div className="space-y-4">
            {/* Switched FaPlay to FaHeadphones for better semantic meaning */}
            <VolumeControl icon={FaHeadphones} label="Lofi Track" audioRef={lofiRef} defaultVolume={0.7} /> 
        </div>

        {/* Ambient Controls */}
        <div className="pt-4 space-y-4 border-t border-white/20">
          <p className="text-sm font-semibold uppercase text-gray-300 tracking-wider">Ambient Mixer</p>
          <VolumeControl icon={FaCloudRain} label="Rain" audioRef={rainRef} defaultVolume={0.4} />
          <VolumeControl icon={FaWind} label="Wind" audioRef={windRef} defaultVolume={0.0} />
          <VolumeControl icon={PiWavesBold} label="Waves" audioRef={wavesRef} defaultVolume={0.0} />
          <VolumeControl icon={IoThunderstormOutline} label="Thunder" audioRef={thunderRef} defaultVolume={0.4} />
        </div>
        
        {/* Footer/Note */}
        <footer className="text-center text-xs text-gray-400 pt-4">
            <p>Built for better focus.</p>
        </footer>

      </div>
    </section>
  );
}