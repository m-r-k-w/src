'use client';
import React from 'react';
import { TypingStats, Language, Difficulty, Mode } from './useTypingEngine';

interface ResultScreenProps {
  stats: TypingStats;
  language: Language;
  difficulty: Difficulty;
  mode: Mode;
  onRetry: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  stats,
  language,
  difficulty,
  mode,
  onRetry,
  onHome,
}) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">結果</h2>
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-800 p-4 rounded">
            <div className="text-3xl font-bold">{stats.cpm}</div>
            <div className="text-sm">CPM</div>
          </div>
          <div className="bg-green-800 p-4 rounded">
            <div className="text-3xl font-bold">{stats.wpm}</div>
            <div className="text-sm">WPM</div>
          </div>
          <div className="bg-yellow-800 p-4 rounded">
            <div className="text-3xl font-bold">{stats.accuracy}%</div>
            <div className="text-sm">正確性</div>
          </div>
          <div className="bg-red-800 p-4 rounded">
            <div className="text-3xl font-bold">{stats.errorRate}%</div>
            <div className="text-sm">エラー率</div>
          </div>
        </div>
      </div>
      <div className="mb-6 text-sm">
        <div>練習時間: {stats.elapsed} 秒</div>
        <div>正解: {stats.correct} 語</div>
        <div>ミス: {stats.miss} 語</div>
        <div>総入力: {stats.total} 語</div>
      </div>
      <div className="flex gap-4">
        <button
          className="flex-1 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          onClick={onRetry}
        >リトライ</button>
        <button
          className="flex-1 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          onClick={onHome}
        >ホーム</button>
      </div>
    </div>
  );
}; 