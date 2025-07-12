import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ProgressChartProps {
  data: Array<{
    date: string;
    averageCPM: number;
    count: number;
  }>;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    // 既存のチャートを破棄
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const labels = data.map(item => item.date);
    const cpmData = data.map(item => item.averageCPM);
    const countData = data.map(item => item.count);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '平均CPM',
            data: cpmData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            yAxisID: 'y',
          },
          {
            label: '練習回数',
            data: countData,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: '日付',
            },
          },
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            title: {
              display: true,
              text: 'CPM',
            },
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            title: {
              display: true,
              text: '練習回数',
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  if (!data.length) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded">
        <p className="text-gray-400">まだ練習履歴がありません</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-4 rounded">
      <h3 className="text-lg font-bold mb-4">進捗グラフ</h3>
      <canvas ref={chartRef} />
    </div>
  );
}; 