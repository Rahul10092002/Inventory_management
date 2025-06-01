import React from 'react'

function SalesDiscount() {
  return (
    <div className="col-span-2 row-span-2 col-start-5 row-start-5 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Sales & Discount
          </h3>
          <p className="text-xs text-gray-500">Discount impact on sales</p>
        </div>
        <div className="p-2 bg-emerald-50 rounded-lg">
          <svg
            className="w-4 h-4 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Total Sales</p>
          <p className="text-lg font-bold text-gray-900">$125,789</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Discount Amount</p>
          <p className="text-lg font-bold text-gray-900">$12,450</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Discount %</p>
          <p className="text-lg font-bold text-gray-900">9.8%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Top Discount</p>
          <p className="text-sm font-medium text-gray-900">Summer Sale</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-900">Net Revenue</span>
          <span className="text-xs font-bold text-gray-900">$113,339</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full"
            style={{ width: "90%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SalesDiscount