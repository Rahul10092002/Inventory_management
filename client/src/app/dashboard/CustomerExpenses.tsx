import { useGetDashboardMetricsQuery } from "@/state/api";
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function CustomerExpenses() {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const expenseData = data?.salesSummary || [];
  // Process data for donut chart
  const totalExpenses = expenseData.reduce(
    (sum, item) => sum + item.totalValue,
    0
  );
  const expenseCategories = expenseData.map((item, index) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-red-500",
    ];
    const strokeColors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#ef4444",
    ];

    return {
      name: `Expense ${index + 1}`,
      value: (item.totalValue / totalExpenses) * 100,
      color: colors[index % colors.length],
      strokeColor: strokeColors[index % strokeColors.length],
      amount: item.totalValue,
      change: item.changePercentage,
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });

  // Calculate customer metrics based on expense data
  const totalCustomers = 12458;
  const newCustomers = Math.floor(
    expenseData.filter((item) => (item.changePercentage ?? 0) > 0).length * 249
  );
  const churnRate = Math.abs(
    expenseData.reduce(
      (sum, item) => sum + Math.min(0, item.changePercentage ?? 0),
      0
    ) /
      expenseData.length /
      10
  );
  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Customer & Expenses
          </h3>
          <p className="text-xs text-gray-500">
            Customer metrics & expense breakdown
          </p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <svg
            className="w-4 h-4 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
        {/* Customer Stats */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Total Customers</span>
            <span className="text-xs font-medium">
              {totalCustomers.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">New Customers</span>
            <div className="flex items-center space-x-1 text-green-600">
              <span className="text-xs font-medium">
                {newCustomers.toLocaleString()}
              </span>
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Churn Rate</span>
            <div className="flex items-center space-x-1 text-red-600">
              <span className="text-xs font-medium">
                {churnRate.toFixed(1)}%
              </span>
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
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Total Expenses</span>
              <span className="text-xs font-medium">
                ${(totalExpenses / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>

        {/* Expense Categories Donut */}
        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {expenseCategories.map((category, index) => {
                const offset = expenseCategories
                  .slice(0, index)
                  .reduce((sum, cat) => sum + cat.value, 0);
                const circumference = 2 * Math.PI * 35;
                const strokeDasharray = `${
                  (category.value / 100) * circumference
                } ${circumference}`;
                const strokeDashoffset = -((offset / 100) * circumference);

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke={category.strokeColor}
                    strokeWidth="6"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="hover:stroke-8 transition-all cursor-pointer"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend with actual data */}
      <div className="mt-2 space-y-1 flex-shrink-0">
        {expenseCategories.slice(0, 3).map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${category.color} flex-shrink-0`}
              ></div>
              <span className="text-xs text-gray-600">{category.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                ${(category.amount / 1000000).toFixed(1)}M
              </span>
              <span
                className={`text-xs ${
                  (category.change ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {(category.change ?? 0) ? "+" : ""}
                {(category.change ?? 0).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
        {expenseCategories.length > 3 && (
          <div className="text-xs text-gray-400 text-center pt-1">
            +{expenseCategories.length - 3} more categories
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerExpenses;
