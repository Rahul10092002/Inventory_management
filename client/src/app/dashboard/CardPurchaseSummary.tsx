import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  // Sort data by date and prepare for visualization
  const sortedPurchaseData = [...purchaseData]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item, index, array) => ({
      ...item,
      x: (index / (array.length - 1)) * 280 + 10, // X position for line chart
      y:
        70 -
        (item.totalPurchased /
          Math.max(...array.map((d) => d.totalPurchased))) *
          50, // Y position
      displayValue: item.totalPurchased / 1000000, // Convert to millions
    }));

  // Calculate totals and averages
  const totalPurchases = purchaseData.reduce(
    (sum, item) => sum + item.totalPurchased,
    0
  );
  const averageChange =
    purchaseData.reduce((sum, item) => sum + (item.changePercentage ?? 0), 0) /
    purchaseData.length;

  // Create SVG path for line chart
  const linePath = sortedPurchaseData
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  // Create area path
  const areaPath = `${linePath} L ${
    sortedPurchaseData[sortedPurchaseData.length - 1]
  } 80 L ${sortedPurchaseData[0]} 80 Z`;
  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Purchase Summary
          </h3>
          <p className="text-xs text-gray-500">Purchase trends over time</p>
        </div>
        <div className="p-2 bg-cyan-50 rounded-lg">
          <svg
            className="w-4 h-4 text-cyan-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6M7 13l-2-8m0 0L3 3"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <p className="text-xs text-gray-500">Total Purchases</p>
          <p className="text-xl font-bold text-gray-900">
            ${(totalPurchases / 1000000).toFixed(1)}M
          </p>
        </div>
        <div
          className={`flex items-center space-x-1 ${
            averageChange >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                averageChange >= 0
                  ? "M7 11l5-5m0 0l5 5m-5-5v12"
                  : "M17 13l-5 5m0 0l-5-5m5 5V6"
              }
            />
          </svg>
          <span className="text-xs font-medium">
            {averageChange.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Purchase Line Chart */}
      <div className="relative flex-1 min-h-0">
        <svg className="w-full h-full" viewBox="0 0 300 80">
          <defs>
            <linearGradient
              id="purchaseGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="60"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 20"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Area fill */}
          <path d={areaPath} fill="url(#purchaseGradient)" />

          {/* Line */}
          <path d={linePath} stroke="#06b6d4" strokeWidth="2" fill="none" />

          {/* Data points */}
          {sortedPurchaseData.map((point, index) => (
            <g key={point.purchaseSummaryId}>
              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill="#06b6d4"
                stroke="white"
                strokeWidth="2"
                className="hover:r-4 transition-all cursor-pointer"
              />
              {/* Tooltip on hover */}
              <g className="opacity-0 hover:opacity-100 transition-opacity">
                <rect
                  x={point.x - 25}
                  y={point.y - 25}
                  width="50"
                  height="20"
                  fill="rgba(0,0,0,0.8)"
                  rx="4"
                />
                <text
                  x={point.x}
                  y={point.y - 12}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                >
                  ${point.displayValue.toFixed(1)}M
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>

      {/* Purchase Stats */}
      <div className="mt-2 pt-2 border-t border-gray-200 flex-shrink-0">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Peak Purchase</p>
            <p className="text-sm font-semibold text-gray-900">
              $
              {(
                Math.max(...purchaseData.map((d) => d.totalPurchased)) / 1000000
              ).toFixed(1)}
              M
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Latest Change</p>
            <p
              className={`text-sm font-semibold ${
                sortedPurchaseData.length > 0 &&
                sortedPurchaseData[sortedPurchaseData.length - 1]?.changePercentage !== undefined
                  ? sortedPurchaseData[sortedPurchaseData.length - 1]!.changePercentage >= 0
                    ? "text-green-600"
                    : "text-red-600"
                  : ""
              }`}
            >
              {sortedPurchaseData.length > 0 &&
              sortedPurchaseData[sortedPurchaseData.length - 1]?.changePercentage !== undefined
                ? (sortedPurchaseData[sortedPurchaseData.length - 1] &&
                    sortedPurchaseData[sortedPurchaseData.length - 1].changePercentage !== undefined &&
                    sortedPurchaseData[sortedPurchaseData.length - 1].changePercentage > 0
                    ? "+"
                    : "") +
                  (sortedPurchaseData[sortedPurchaseData.length - 1] &&
                  sortedPurchaseData[sortedPurchaseData.length - 1].changePercentage !== undefined
                    ? sortedPurchaseData[sortedPurchaseData.length - 1].changePercentage.toFixed(1)
                    : "") +
                  "%"
                : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPurchaseSummary;
