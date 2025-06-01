import { useGetDashboardMetricsQuery } from '@/state/api';
import React from 'react'

function PendingOrders() {
    const pendingOrders = [
      {
        id: "#ORD-7891",
        customer: "Alex Johnson",
        amount: 459.99,
        status: "Processing",
      },
      {
        id: "#ORD-8901",
        customer: "Sarah Williams",
        amount: 289.5,
        status: "Pending",
      },
      {
        id: "#ORD-9012",
        customer: "Michael Brown",
        amount: 599.99,
        status: "Processing",
      },
      {
        id: "#ORD-9123",
        customer: "Emma Davis",
        amount: 199.99,
        status: "Pending",
      },
      {
        id: "#ORD-9234",
        customer: "John Smith",
        amount: 329.99,
        status: "Processing",
      },
    ];
  return (
    <div className="col-span-2 row-span-2 col-start-3 row-start-5 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Dues & Pending Orders
          </h3>
          <p className="text-xs text-gray-500">Recent pending orders</p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-lg">
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-4a4 4 0 018 0v4z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {pendingOrders.slice(0, 4).map((order, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-900 truncate">
                {order.id}
              </p>
              <p className="text-xs text-gray-500 truncate">{order.customer}</p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xs font-medium text-gray-900">
                ${order.amount}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  order.status === "Processing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-200 flex-shrink-0">
        <p className="text-xs text-gray-500 text-center">
          Total pending: $1,349.48
        </p>
      </div>
    </div>
  );
}

export default PendingOrders