"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { cn } from "@/lib/utils";

interface SentimentPoint {
  label: string;
  value: number;
}

interface SentimentChartProps {
  data: SentimentPoint[];
  height?: number;
}

export default function SentimentChart({ data, height = 300 }: SentimentChartProps) {
  const getColor = (v: number) => {
    if (v < 60) return "#84cc16";
    if (v < 80) return "#f59e0b";
    return "#f97316";
  };

  return (
    <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold">Sentiment over time (quarterly)</h4>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="label" 
            stroke="#94a3b8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: any) => `${value}%`}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#94a3b8]">
        <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
        <span>Risk level</span>
      </div>
    </div>
  );
}
