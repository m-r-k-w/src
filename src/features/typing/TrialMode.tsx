'use client';
import React from 'react';
import { useTypingEngine, Language, Difficulty } from './useTypingEngine';
import Link from 'next/link';

interface TrialModeProps {
  language: Language;
  difficulty: Difficulty;
  timeLimit?: number;
}

export const TrialMode: React.FC<TrialModeProps> = ({ language, difficulty, timeLimit = 60 }) => {
  const {
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
  } = useTypingEngine({ language, difficulty, mode: 'trial', timeLimit });

  console.log('TrialMode - words length:', words.length, 'currentWord:', currentWord, 'isRunning:', isRunning);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">タイムトライアル ({timeLimit}秒)</h2>
        <Link
          href="/"
          className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600"
        >
          戻る
        </Link>
      </div>
      <div className="mb-2">残り時間: <span className="font-mono">{Math.max(0, timeLimit - stats.elapsed)} 秒</span></div>
      <div className="mb-4">
        {currentWord ? (
          <span className="text-lg font-mono bg-gray-800 px-2 py-1 rounded">{currentWord}</span>
        ) : (
          <span className="text-lg font-mono bg-gray-800 px-2 py-1 rounded text-gray-400">
            {words.length > 0 ? '辞書を読み込み中...' : '辞書の読み込みに失敗しました'}
          </span>
        )}
      </div>
      <input
        className="w-full p-2 text-lg font-mono bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={input}
        onChange={e => handleInput(e.target.value)}
        onKeyDown={e => {
          if ((e.key === ' ' || e.key === 'Enter') && input.length > 0) {
            handleInput(input + (e.key === ' ' ? ' ' : '\n'));
            e.preventDefault();
          }
        }}
        disabled={!isRunning || isFinished}
        autoFocus
      />
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={start}
          disabled={isRunning}
        >開始</button>
        <button
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          onClick={stop}
          disabled={!isRunning}
        >一時停止</button>
        <button
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
          onClick={reset}
        >リセット</button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
        <div>CPM: <span className="font-mono">{stats.cpm}</span></div>
        <div>WPM: <span className="font-mono">{stats.wpm}</span></div>
        <div>正確性: <span className="font-mono">{stats.accuracy}%</span></div>
        <div>エラー率: <span className="font-mono">{stats.errorRate}%</span></div>
      </div>
      {isFinished && (
        <div className="mt-6 p-4 bg-green-800 rounded">
          <div className="font-bold mb-2">タイムアップ！</div>
          <div>スコア: CPM {stats.cpm} / WPM {stats.wpm} / 正確性 {stats.accuracy}% / エラー率 {stats.errorRate}%</div>
        </div>
      )}
    </div>
  );
}; 