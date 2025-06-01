import { useGetDashboardMetricsQuery } from "@/state/api";
import React, { useState } from "react";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  console.log("Sales Summary Data:", salesData);

  const [timeframe, setTimeframe] = useState("monthly");



  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  const sortedSalesData = [...salesData]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      ...item,
      month: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
      }),
      displayValue: item.totalValue / 1000000, // Convert to millions for display
      barHeight: Math.max(
        10,
        Math.min(
          100,
          (item.totalValue / Math.max(...salesData.map((d) => d.totalValue))) *
            100
        )
      ),
    }));

  // Calculate total sales and average change
  const totalSales = salesData.reduce((sum, item) => sum + item.totalValue, 0);
  const averageChange =
    salesData.reduce((sum, item) => sum + (item.changePercentage ?? 0), 0) /
    salesData.length;

  // For smaller screens, show fewer data points
  const responsiveSalesData =
    typeof window !== "undefined" && window.innerWidth < 640
      ? sortedSalesData.filter((_, i) => i % 2 === 0)
      : sortedSalesData;

  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Sales Summary
          </h3>
          <p className="text-xs text-gray-500">Sales performance over time</p>
        </div>
        <div className="p-2 bg-green-50 rounded-lg">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <p className="text-xs text-gray-500">Total Sales</p>
          <p className="text-xl font-bold text-gray-900">
            ${(totalSales / 1000000).toFixed(2)}M
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

      {/* Time Period Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1 flex-shrink-0">
        {["Weekly", "Monthly", "Yearly"].map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period.toLowerCase())}
            className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
              timeframe === period.toLowerCase()
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex justify-between text-xs text-gray-500 mb-2 flex-shrink-0">
          <span>0</span>
          <span>3M</span>
          <span>6M</span>
        </div>
        <div className="flex items-end space-x-1 flex-1 min-h-0">
          {responsiveSalesData.map((item, index) => (
            <div
              key={item.salesSummaryId}
              className="flex-1 flex flex-col items-center h-full"
            >
              <div className="flex-1 flex items-end w-full relative group">
                <div
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    (item.changePercentage ?? 0) >= 0
                      ? "bg-gradient-to-t from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
                      : "bg-gradient-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500"
                  }`}
                  style={{ height: `${item.barHeight}%` }}
                ></div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div>${item.displayValue.toFixed(1)}M</div>
                  <div
                    className={
                      (item.changePercentage ?? 0) >= 0
                        ? "text-green-300"
                        : "text-red-300"
                    }
                  >
                    {(item.changePercentage ?? 0) > 0 ? "+" : ""}
                    {(item.changePercentage ?? 0).toFixed(1)}%
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1 flex-shrink-0">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-3 pt-3 border-t border-gray-200 flex-shrink-0">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Highest</p>
            <p className="text-sm font-semibold text-gray-900">
              $
              {(
                Math.max(...salesData.map((d) => d.totalValue)) / 1000000
              ).toFixed(1)}
              M
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Lowest</p>
            <p className="text-sm font-semibold text-gray-900">
              $
              {(
                Math.min(...salesData.map((d) => d.totalValue)) / 1000000
              ).toFixed(1)}
              M
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Average</p>
            <p className="text-sm font-semibold text-gray-900">
              ${(totalSales / salesData.length / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSalesSummary;
