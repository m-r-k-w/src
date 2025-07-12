import { useState, useEffect } from 'react';
import { TypingStats, Language, Difficulty, Mode } from '../typing/useTypingEngine';

export interface HistoryEntry {
  id: string;
  date: string;
  language: Language;
  difficulty: Difficulty;
  mode: Mode;
  stats: TypingStats;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // LocalStorageから履歴を読み込み
  useEffect(() => {
    const stored = localStorage.getItem('typing-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse history:', error);
        setHistory([]);
      }
    }
  }, []);

  // 履歴を保存
  const saveEntry = (entry: Omit<HistoryEntry, 'id'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('typing-history', JSON.stringify(updatedHistory));
  };

  // 履歴を削除
  const deleteEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('typing-history', JSON.stringify(updatedHistory));
  };

  // 日別平均CPMを取得
  const getDailyAverageCPM = () => {
    const dailyStats = history.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = { totalCPM: 0, count: 0 };
      }
      acc[date].totalCPM += entry.stats.cpm;
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, { totalCPM: number; count: number }>);

    return Object.entries(dailyStats).map(([date, stats]) => ({
      date,
      averageCPM: Math.round(stats.totalCPM / stats.count),
      count: stats.count,
    }));
  };

  return {
    history,
    saveEntry,
    deleteEntry,
    getDailyAverageCPM,
  };
} 