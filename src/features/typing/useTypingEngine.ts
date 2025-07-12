'use client';

import { useState, useEffect, useRef } from 'react';

export type Language = 'ja' | 'en';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type Mode = 'trial' | 'endless';

export interface TypingStats {
  cpm: number;
  wpm: number;
  accuracy: number;
  errorRate: number;
  correct: number;
  miss: number;
  total: number;
  elapsed: number;
}

export function useTypingEngine({
  language,
  difficulty,
  mode,
  timeLimit = 60,
}: {
  language: Language;
  difficulty: Difficulty;
  mode: Mode;
  timeLimit?: number;
}) {
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<TypingStats>({
    cpm: 0, wpm: 0, accuracy: 100, errorRate: 0, correct: 0, miss: 0, total: 0, elapsed: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // 辞書ロード
  useEffect(() => {
    async function loadDict() {
      try {
        const file = `/lib/${language}_${difficulty}.json`;
        console.log('Loading dictionary file:', file);
        const res = await fetch(file);
        if (!res.ok) {
          throw new Error(`Failed to load dictionary: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Loaded dictionary data:', data);
        // 30単語ランダム抽出（仮）
        const shuffledWords = shuffle(data as string[]).slice(0, 300);
        console.log('Shuffled words:', shuffledWords);
        setWords(shuffledWords);
      } catch (error) {
        console.error('Error loading dictionary:', error);
      }
    }
    loadDict();
  }, [language, difficulty]);

  // タイマー管理
  useEffect(() => {
    if (!isRunning) return;
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setStats(s => {
        const elapsed = Math.floor((Date.now() - (startTimeRef.current || 0)) / 1000);
        if (mode === 'trial' && elapsed >= timeLimit) {
          setIsFinished(true);
          setIsRunning(false);
          clearInterval(timerRef.current!);
        }
        return { ...s, elapsed };
      });
    }, 100);
    return () => clearInterval(timerRef.current!);
  }, [isRunning, mode, timeLimit]);

  // 入力判定
  function handleInput(value: string) {
    console.log('handleInput isRunning:', isRunning, 'isFinished:', isFinished);
    if (!isRunning || isFinished) return;
    setInput(value);
    const currentWord = words[currentIndex] || '';
    if (value.endsWith(' ') || value.endsWith('\n')) {
      const trimmed = value.trim();
      const correct = trimmed === currentWord;
      setStats(s => ({
        ...s,
        correct: s.correct + (correct ? 1 : 0),
        miss: s.miss + (correct ? 0 : 1),
        total: s.total + 1,
      }));
      setInput('');
      if (currentIndex + 1 >= words.length) {
        setIsFinished(true);
        setIsRunning(false);
      } else {
        setCurrentIndex(i => i + 1);
      }
    }
  }

  // 統計計算
  useEffect(() => {
    setStats(s => {
      const cpm = s.total > 0 ? Math.round((s.correct * 60) / Math.max(1, s.elapsed)) : 0;
      const wpm = s.total > 0 ? Math.round((s.correct * 60) / 5 / Math.max(1, s.elapsed)) : 0;
      const accuracy = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 100;
      const errorRate = s.total > 0 ? Math.round((s.miss / s.total) * 100) : 0;
      return { ...s, cpm, wpm, accuracy, errorRate };
    });
  }, [stats.correct, stats.miss, stats.total, stats.elapsed]);

  function start() {
    setIsRunning(true);
    setIsFinished(false);
    setStats({ cpm: 0, wpm: 0, accuracy: 100, errorRate: 0, correct: 0, miss: 0, total: 0, elapsed: 0 });
    setCurrentIndex(0);
    setInput('');
    console.log('start() called, isRunning:', true);
  }
  function stop() {
    setIsRunning(false);
    setIsFinished(true);
    clearInterval(timerRef.current!);
  }
  function reset() {
    setIsRunning(false);
    setIsFinished(false);
    setStats({ cpm: 0, wpm: 0, accuracy: 100, errorRate: 0, correct: 0, miss: 0, total: 0, elapsed: 0 });
    setCurrentIndex(0);
    setInput('');
  }

  const currentWord = words[currentIndex] || '';
  console.log('useTypingEngine - words:', words, 'currentIndex:', currentIndex, 'currentWord:', currentWord);
  
  return {
    words,
    currentWord,
    currentIndex,
    input,
    stats,
    isRunning,
    isFinished,
    start,
    stop,
    reset,
    handleInput,
  };
}

// 配列シャッフル関数
function shuffle<T>(array: T[]): T[] {
  return array.slice().sort(() => Math.random() - 0.5);
} 