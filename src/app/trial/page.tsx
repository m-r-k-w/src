'use client';
import { TrialMode } from '../../features/typing/TrialMode';
import { useSearchParams } from 'next/navigation';

export default function TrialPage() {
  const searchParams = useSearchParams();
  const language = (searchParams.get('language') as 'ja' | 'en') || 'ja';
  const difficulty = (searchParams.get('difficulty') as 'easy' | 'normal' | 'hard') || 'easy';
  
  return <TrialMode language={language} difficulty={difficulty} />;
} 