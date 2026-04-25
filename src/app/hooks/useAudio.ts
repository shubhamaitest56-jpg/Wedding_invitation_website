"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface UseAudioOptions {
  src: string;
  loop?: boolean;
  volume?: number;
  autoPlay?: boolean;
}

export function useAudio({ src, loop = true, volume = 0.4, autoPlay = false }: UseAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = "metadata";

    audio.addEventListener("canplaythrough", () => setIsReady(true));
    audio.addEventListener("ended", () => setIsPlaying(false));

    audioRef.current = audio;

    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        // autoplay blocked — expected on mobile
      });
    }

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, loop, volume, autoPlay]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      console.warn("Audio playback prevented:", e);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const mute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = true;
    setIsMuted(true);
  }, []);

  const unmute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    setIsMuted(false);
  }, []);

  const setVolume = useCallback((v: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, v));
  }, []);

  return { isPlaying, isMuted, isReady, play, pause, toggle, mute, unmute, setVolume };
}
