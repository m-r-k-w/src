'use client';

import React, { useState } from 'react';
import { Language, Difficulty, Mode } from '../features/typing/useTypingEngine';
import Link from 'next/link';

export const HomeScreen: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ja');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [mode, setMode] = useState<Mode>('trial');

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">タイピング練習</h1>
      
      <div className="space-y-6">
        {/* 言語選択 */}
        <div>
          <label className="block text-sm font-medium mb-2">言語</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 px-4 rounded ${
                language === 'ja' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setLanguage('ja')}
            >
              日本語
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded ${
                language === 'en' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
        </div>

        {/* 難易度選択 */}
        <div>
          <label className="block text-sm font-medium mb-2">難易度</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 px-4 rounded ${
                difficulty === 'easy' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setDifficulty('easy')}
            >
              Easy
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded ${
                difficulty === 'normal' ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setDifficulty('normal')}
            >
              Normal
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded ${
                difficulty === 'hard' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setDifficulty('hard')}
            >
              Hard
            </button>
          </div>
        </div>

        {/* モード選択 */}
        <div>
          <label className="block text-sm font-medium mb-2">モード</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 px-4 rounded ${
                mode === 'trial' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setMode('trial')}
            >
              タイムトライアル (60秒)
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded ${
                mode === 'endless' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setMode('endless')}
            >
              無限練習
            </button>
          </div>
        </div>

        {/* 開始ボタン */}
        <div className="pt-4">
          <Link
            href={`${mode === 'trial' ? '/trial' : '/endless'}?language=${language}&difficulty=${difficulty}`}
            className="block w-full py-3 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium"
          >
            練習開始
          </Link>
        </div>

        {/* 履歴ボタン */}
        <div>
          <Link
            href="/history"
            className="block w-full py-2 px-4 bg-gray-700 text-white text-center rounded hover:bg-gray-600"
          >
            練習履歴
          </Link>
        </div>
      </div>
    </div>
  );
}; 