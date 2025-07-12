'use client';

import { useHistory } from '../../features/history/useHistory';
import { ProgressChart } from '../../features/history/ProgressChart';
import Link from 'next/link';

export default function HistoryPage() {
  const { history, deleteEntry, getDailyAverageCPM } = useHistory();
  const dailyStats = getDailyAverageCPM();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          ← ホームに戻る
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-white">練習履歴</h1>
      
      {/* 進捗グラフ */}
      <div className="mb-8">
        <ProgressChart data={dailyStats} />
      </div>
      
      {/* 履歴一覧 */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-white">最近の練習</h2>
        {history.length === 0 ? (
          <p className="text-gray-400">まだ練習履歴がありません</p>
        ) : (
          <div className="space-y-4">
            {history.slice().reverse().map((entry) => (
              <div key={entry.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <div className="text-white">
                  <div className="font-medium">
                    {entry.date} - {entry.language === 'ja' ? '日本語' : 'English'} 
                    ({entry.difficulty}) - {entry.mode === 'trial' ? 'タイムトライアル' : '無限練習'}
                  </div>
                  <div className="text-sm text-gray-300">
                    CPM: {entry.stats.cpm} | WPM: {entry.stats.wpm} | 
                    正確性: {entry.stats.accuracy}% | 時間: {entry.stats.elapsed}秒
                  </div>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 