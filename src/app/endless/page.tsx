'use client';
import { EndlessMode } from '../../features/typing/EndlessMode';
import { useSearchParams } from 'next/navigation';

export default function EndlessPage() {
  const searchParams = useSearchParams();
  const language = (searchParams.get('language') as 'ja' | 'en') || 'ja';
  const difficulty = (searchParams.get('difficulty') as 'easy' | 'normal' | 'hard') || 'easy';
  
  return <EndlessMode language={language} difficulty={difficulty} />;
} 