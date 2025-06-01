import { useGetDashboardMetricsQuery } from "@/state/api";

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary || [];

  const totalExpenses = expenseSummary.reduce(
    (sum, item) => sum + item.totalExpenses,
    0
  );

  // Format total expenses in millions (e.g., $2.3M)
  const formattedTotalExpenses =
    totalExpenses >= 1_000_000
      ? `$${(totalExpenses / 1_000_000).toFixed(1)}M`
      : totalExpenses.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
 

  // Normalize heights for bar chart visualization
  const maxExpense = Math.max(...expenseSummary.map((e) => e.totalExpenses));
  const normalizedSummary = expenseSummary.map((e) => ({
    ...e,
    heightPercent: (e.totalExpenses / maxExpense) * 100,
    month: new Date(e.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
      }),
  }));

  return (
    <div className="col-span-2 row-span-2 col-start-5 row-start-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Expense Summary
          </h3>
          <p className="text-xs text-gray-500">Monthly expense trends</p>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg">
          <svg
            className="w-4 h-4 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <p className="text-xs text-gray-500">Total Expenses</p>
          <p className="text-xl font-bold text-gray-900">
            {formattedTotalExpenses}
          </p>
        </div>
        {/* Optional: Replace with real percentage change if available */}
        <div className="flex items-center space-x-1 text-red-600">
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
              d="M17 13l-5 5m0 0l-5-5m5 5V6"
            />
          </svg>
          <span className="text-xs font-medium">3.1%</span>
        </div>
      </div>

      {/* Expense Bar Chart */}
      <div className="flex items-end space-x-1 gap-3 flex-1 min-h-0">
        {normalizedSummary.slice(0, 8).map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center h-full">
            <div className="flex-1 flex items-end w-full">
              <div
                className="w-full bg-orange-400 rounded-t-sm hover:bg-orange-500 transition-colors"
                style={{ height: `${item.heightPercent * 0.6}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardExpenseSummary;
