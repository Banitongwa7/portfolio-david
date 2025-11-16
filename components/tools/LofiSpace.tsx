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

// --- Simplified VolumeControl Component ---
const VolumeControl = ({ icon: Icon, label, audioRef, defaultVolume = 0.5, isLofiTrack = false }: {
    icon: React.ComponentType<{ className?: string }>,
    label: string,
    audioRef: React.RefObject<AudioElementWithInit>,
    defaultVolume?: number,
    isLofiTrack?: boolean
}) => {
    // Volume level when not muted (the slider's actual position)
    const [actualVolume, setActualVolume] = useState(defaultVolume);
    // Track play state separately for button visual (important for Lofi)
    const [isPlaying, setIsPlaying] = useState(false);
    // State to force an initial play interaction
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

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

    // Audio setup (looping and initial volume)
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = true;

            if (!hasUserInteracted) {
                // Ambient tracks start fully silent on initial load
                if (!isLofiTrack) {
                    audio.volume = 0;
                    setActualVolume(0);
                } else {
                    audio.volume = defaultVolume;
                    setActualVolume(defaultVolume);
                }
            }
            // For Lofi Track, attempt to autoplay if no interaction yet
            if (isLofiTrack && !hasUserInteracted && audio.volume > 0) {
                playAudio();
            }
        }
    }, [audioRef, defaultVolume, hasUserInteracted, isLofiTrack, playAudio]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        const audio = audioRef.current;
        setHasUserInteracted(true);

        if (audio) {
            audio.volume = newVolume;
            setActualVolume(newVolume);

            if (newVolume > 0) {
                if (audio.paused) {
                    playAudio(); // Start playback when volume is increased from zero
                }
            } else { // newVolume is 0
                pauseAudio(); // Pause playback when volume hits zero
            }
        }
    };
    
    // Mute/Unmute Toggle
    const toggleMute = () => {
        setHasUserInteracted(true);
        const audio = audioRef.current;

        if (audio) {
            if (audio.volume === 0) {
                // Unmute: Restore to saved volume (or default if actualVolume is 0)
                const targetVolume = actualVolume > 0 ? actualVolume : defaultVolume;
                audio.volume = targetVolume;
                setActualVolume(targetVolume);
                playAudio();
            } else {
                // Mute: set volume to 0
                audio.volume = 0;
                pauseAudio();
            }
        }
    };

    // Play/Pause Toggle (only used for Lofi music)
    const handleLofiPlayToggle = () => {
        setHasUserInteracted(true);
        const audio = audioRef.current;

        if (audio) {
            if (isPlaying) {
                // Pause and Mute
                audio.volume = 0;
                pauseAudio();
            } else {
                // Play and set to last volume
                const targetVolume = actualVolume > 0 ? actualVolume : defaultVolume;
                audio.volume = targetVolume;
                setActualVolume(targetVolume);
                playAudio();
            }
        }
    };

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

    const isCurrentlyMuted = actualVolume === 0 || audioRef.current?.volume === 0;

    // UI state for active track
    const isActive = audioRef.current && audioRef.current.volume > 0 && !audioRef.current.paused;
    const isLofiActive = isLofiTrack && isPlaying; // Only rely on isPlaying for the Lofi button

    // Dynamic styling for visual feedback
    const activeIconClass = isActive || isLofiActive ? 'text-cyan-400 dark:text-cyan-300' : 'text-gray-600 dark:text-gray-400';
    const activeTextClass = isActive || isLofiActive ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300';

    return (
        <div className="flex items-center gap-4 py-3 group">

            {/* Icon and Label */}
            <div className={`flex items-center gap-3 w-32 shrink-0 transition-colors duration-200 ${activeTextClass}`}>
                <Icon className={`text-2xl transition-colors duration-200 ${activeIconClass}`} />
                <span className="text-base">{label}</span>
            </div>
            
            {/* Lofi Track Play/Pause Button (Only for Lofi) */}
            {isLofiTrack && (
                <button
                    onClick={handleLofiPlayToggle}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 shrink-0
                                ${isLofiActive ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'}
                                text-white shadow-md dark:shadow-gray-900`}
                    aria-label={isLofiActive ? `Pause ${label}` : `Play ${label}`}
                >
                    {isLofiActive ? <FaPause /> : <FaPlay />}
                </button>
            )}

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className={`text-lg transition-colors duration-200 shrink-0
                            ${isCurrentlyMuted 
                                ? 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400' 
                                : 'text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300'}`}
                aria-label={`Toggle mute for ${label}`}
            >
                {isCurrentlyMuted ? <FaVolumeOff /> : <FaVolumeUp />}
            </button>

            {/* Volume Slider */}
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={actualVolume}
                onChange={handleVolumeChange}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer range-lg transition-opacity duration-200
                            bg-gray-300 dark:bg-gray-700 accent-cyan-500 dark:accent-cyan-400
                            ${isCurrentlyMuted ? 'opacity-50' : 'opacity-100'}`}
                style={{
                    // Custom track styling for Tailwind range input
                    '--tw-ring-color': isCurrentlyMuted ? 'transparent' : 'var(--color-cyan-500)',
                    '--tw-ring-opacity': '1',
                } as React.CSSProperties}
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
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300"
            style={{
                backgroundImage: `url(${LOFI_BACKGROUND_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Dark Overlay with subtle blur */}
            <div className="absolute inset-0 bg-white/40 dark:bg-black/70 backdrop-blur-sm z-0 transition-colors duration-300"></div>

            {/* Main Control Container (Card) */}
            <div className="w-full max-w-lg relative z-10 bg-white/60 dark:bg-black/30 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/80 space-y-6 border border-gray-200/30 dark:border-white/10 transition-all duration-300">

                <header className="text-center space-y-2 mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center justify-center gap-3 transition-colors duration-300">
                        <FaHeadphones className="text-cyan-500 dark:text-cyan-400 text-3xl transition-colors duration-300" /> Lofi space
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-md transition-colors duration-300">Adjust your perfect focus environment.</p>
                </header>

                {/* --- Lofi Track Section --- */}
                <div className="bg-white/50 dark:bg-black/20 p-5 rounded-2xl border border-cyan-400/50 shadow-lg shadow-cyan-500/10 dark:shadow-cyan-500/10 transition-all duration-300 hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/20">
                    <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-3 border-b border-cyan-500/30 pb-2 transition-colors duration-300">Focus Music</h2>
                    <VolumeControl
                        icon={FaHeadphones}
                        label="Lofi Track"
                        audioRef={lofiRef as React.RefObject<AudioElementWithInit>}
                        defaultVolume={0.7}
                        isLofiTrack={true}
                    />
                </div>

                {/* --- Ambient Mixer Section --- */}
                <div className="bg-white/50 dark:bg-black/20 p-5 rounded-2xl border border-gray-300/50 dark:border-white/10 shadow-lg space-y-1 transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-3 border-b border-gray-400/30 dark:border-white/20 pb-2 transition-colors duration-300">Ambient Mixer</h2>
                    <VolumeControl icon={FaCloudRain} label="Rain" audioRef={rainRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                    <VolumeControl icon={FaWind} label="Wind" audioRef={windRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                    <VolumeControl icon={PiWavesBold} label="Waves" audioRef={wavesRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                    <VolumeControl icon={IoThunderstormOutline} label="Thunder" audioRef={thunderRef as React.RefObject<AudioElementWithInit>} defaultVolume={0.4} />
                </div>

                <footer className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4 transition-colors duration-300">
                    <p>Built for better focus.</p>
                </footer>

            </div>
        </section>
    );
}