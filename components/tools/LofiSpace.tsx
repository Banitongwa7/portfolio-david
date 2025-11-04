"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaCloudRain, FaWind, FaVolumeUp, FaVolumeOff, FaHeadphones } from 'react-icons/fa';
import { IoThunderstormOutline } from "react-icons/io5";
import { PiWavesBold } from "react-icons/pi";

// --- Audio URLs from Blob Storage ---
const LOFI_MUSIC_URL = 'https://rcrywjjangbgljsl.public.blob.vercel-storage.com/audio/lofi.mp3';
const RAIN_SOUND_URL = 'https://rcrywjjangbgljsl.public.blob.vercel-storage.com/audio/rain.mp3';
const WIND_SOUND_URL = 'https://rcrywjjangbgljsl.public.blob.vercel-storage.com/audio/wind.mp3';
const WAVES_SOUND_URL = 'https://rcrywjjangbgljsl.public.blob.vercel-storage.com/audio/waves.mp3';
const THUNDER_SOUND_URL = 'https://rcrywjjangbgljsl.public.blob.vercel-storage.com/audio/thunder.mp3';
// ------------------------------------

// --- LOFI BACKGROUND IMAGE ---
const LOFI_BACKGROUND_IMAGE = '/images/lofi/window.gif'; 
// -----------------------------

// Define an Interface for the extended Audio Ref
interface AudioElementWithInit extends HTMLAudioElement {
    initializeVolume?: (initialPlay: boolean) => void;
}

const VolumeControl = ({ icon: Icon, label, audioRef, defaultVolume = 0.5, isLofiTrack = false }: { 
    icon: React.ComponentType<{ className?: string }>, 
    label: string, 
    audioRef: React.RefObject<AudioElementWithInit>,
    defaultVolume?: number,
    isLofiTrack?: boolean
}) => {
    // We track the non-zero volume level
    const [actualVolume, setActualVolume] = useState(defaultVolume);
    const [isMuted, setIsMuted] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false); 
    // State for individual play status
    const [isPlaying, setIsPlaying] = useState(false); 

    // Audio setup (looping)
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = true;
            
            if (!hasUserInteracted) {
                 // Ambient tracks start fully silent in state
                 if (!isLofiTrack) {
                    setActualVolume(0);
                    audioRef.current.volume = 0;
                 } else {
                    audioRef.current.volume = defaultVolume;
                 }
            }
        }
    }, [audioRef, defaultVolume, hasUserInteracted, isLofiTrack]);

    const playAudio = useCallback(() => {
        const audio = audioRef.current;
        if (audio && audio.paused) {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.error(`Audio playback failed for ${label}:`, e));
        }
    }, [audioRef, label]);

    const pauseAudio = useCallback(() => {
        const audio = audioRef.current;
        if (audio && !audio.paused) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [audioRef]);

    const handlePlayToggle = () => {
        setHasUserInteracted(true);
        
        if (isPlaying) {
            pauseAudio();
        } else {
            // When playing, set volume to the actual volume (or default if still 0) and un-mute
            if (audioRef.current) {
                const targetVolume = actualVolume > 0 ? actualVolume : defaultVolume;
                audioRef.current.volume = targetVolume;
                setActualVolume(targetVolume);
                setIsMuted(false);
            }
            playAudio();
        }
    };


    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setHasUserInteracted(true); 

        if (audioRef.current) {
            audioRef.current.volume = newVolume;

            if (newVolume > 0) {
                setActualVolume(newVolume);
                if (isMuted) setIsMuted(false);
                
                // Start playback when volume is increased from zero
                if (audioRef.current.paused) {
                    playAudio();
                }

            } else { // newVolume is 0
                // Pause playback when volume hits zero
                pauseAudio();
            }
        }
    };

    const toggleMute = () => {
        setHasUserInteracted(true);

        if (isMuted) {
            // Unmute: Restore to saved volume and ensure play
            if (audioRef.current) {
                audioRef.current.volume = actualVolume;
            }
            setIsMuted(false);
            if (!isPlaying) {
                playAudio();
            }
        } else {
            // Mute: set volume to 0 and pause playback
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
            setIsMuted(true);
            pauseAudio(); // Ensure pause on mute
        }
    };
    
    // The mobile volume initialization function is technically redundant now that 
    // the card button controls everything, but we keep the structure for safety.
    const initializeVolume = (initialPlay: boolean) => {
        if (audioRef.current && initialPlay && !hasUserInteracted && isLofiTrack) { 
            audioRef.current.volume = defaultVolume;
            setActualVolume(defaultVolume); 
            setIsPlaying(true);
        }
    };
    
    // Attach initializeVolume to the ref object
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.initializeVolume = initializeVolume;
        }
    }, [audioRef, defaultVolume, hasUserInteracted, isLofiTrack]);


    const getAudioSrc = () => {
        switch (label) {
            case 'Lofi Track': return LOFI_MUSIC_URL;
            case 'Rain': return RAIN_SOUND_URL;
            case 'Wind': return WIND_SOUND_URL;
            case 'Waves': return WAVES_SOUND_URL;
            case 'Thunder': return THUNDER_SOUND_URL;
            default: return undefined;
        }
    };

    // The value displayed on the slider.
    const sliderValue = isMuted ? 0 : actualVolume;
    // UI state for active track
    const isActive = isPlaying && !isMuted && sliderValue > 0;
    
    // Dynamic styling for visual feedback
    const activeClass = isActive 
        ? 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/50' 
        : 'bg-white/10 hover:bg-white/20';
        
    const activeBorder = isActive 
        ? 'border-cyan-400 shadow-xl'
        : 'border-white/20';


    return (
        <div className={`flex items-center gap-4 p-4 backdrop-blur-sm rounded-lg border transition duration-300 ${activeClass} ${activeBorder}`}>
            
            {/* Play/Pause Button for the individual track */}
            <button
                onClick={handlePlayToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 shrink-0
                            ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} 
                            text-white shadow-md`}
                aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            <Icon className="text-xl text-cyan-300 shrink-0" />
            <span className="text-sm font-medium w-16 text-gray-100 shrink-0">{label}</span>
            
            {/* Mute Button */}
            <button onClick={toggleMute} className="text-lg text-gray-300 hover:text-white transition duration-200" aria-label={`Toggle mute for ${label}`}>
                {isMuted || sliderValue === 0 ? <FaVolumeOff /> : <FaVolumeUp />}
            </button>

            {/* Volume Slider */}
            <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sliderValue} 
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-400"
            />
            <audio 
                ref={audioRef} 
                src={getAudioSrc()} 
                preload="metadata" 
            />
        </div>
    );
};

export default function LofiSpace() {
    // Refs for all tracks
    const lofiRef = useRef<AudioElementWithInit | null>(null);
    const rainRef = useRef<AudioElementWithInit | null>(null);
    const windRef = useRef<AudioElementWithInit | null>(null);
    const wavesRef = useRef<AudioElementWithInit | null>(null);
    const thunderRef = useRef<AudioElementWithInit | null>(null);

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
            <div className="absolute inset-0 bg-black/50 backdrop-brightness-75 z-0"></div>

            {/* Main Control Container */}
            <div className="w-full max-w-xl relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-8 animate-in fade-in duration-1000 border border-white/20">
                
                <header className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
                        <FaHeadphones className="text-cyan-400" /> Lofi Space
                    </h1>
                    <p className="text-gray-300 text-md">Your perfect coding and study atmosphere.</p>
                </header>

                {/* 🎧 LOFI TRACK CARD */}
                <div className="p-4 rounded-xl space-y-4 bg-black/10 border border-cyan-400/50 shadow-lg shadow-cyan-500/10">
                    <h2 className="text-xl font-bold text-cyan-400">Lofi Track</h2>
                    <VolumeControl 
                        icon={FaHeadphones} 
                        label="Lofi Track" 
                        audioRef={lofiRef as React.RefObject<AudioElementWithInit>} 
                        defaultVolume={0.7} 
                        isLofiTrack={true}
                    />
                </div>

                <div className="p-4 rounded-xl space-y-4 bg-black/10 border border-white/20 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-300">Ambient Mixer</h2>
                    <VolumeControl icon={FaCloudRain} label="Rain" audioRef={rainRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                    <VolumeControl icon={FaWind} label="Wind" audioRef={windRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} /> 
                    <VolumeControl icon={PiWavesBold} label="Waves" audioRef={wavesRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                    <VolumeControl icon={IoThunderstormOutline} label="Thunder" audioRef={thunderRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                </div>
                
                <footer className="text-center text-xs text-gray-400 pt-4">
                    <p>Built for better focus.</p>
                </footer>

            </div>
        </section>
    );
}