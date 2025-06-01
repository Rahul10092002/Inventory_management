import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Image from "next/image";
import Rating from "../_components/Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Popular Products
          </h3>
          <p className="text-xs text-gray-500">
            Top selling products by revenue
          </p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
      </div>

      {/* Products Table */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-y-auto scrollbar-hide flex-1 mb-3">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-1 text-xs font-medium text-gray-500">
                  Product
                </th>
                <th className="text-right py-2 px-1 text-xs font-medium text-gray-500">
                  Price
                </th>
                <th className="text-right py-2 px-1 text-xs font-medium text-gray-500 hidden sm:table-cell">
                  Rating
                </th>
                <th className="text-right py-2 px-1 text-xs font-medium text-gray-500">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardMetrics?.popularProducts.map((product) => (
                <tr key={product.productId} className="border-b border-gray-100">
                  <td className="py-2 px-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">
                          {product.name.substring(0, 1)}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-900 truncate">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-2 px-1 text-xs text-gray-900">
                    ${product.price}
                  </td>
                  <td className="text-right py-2 px-1 hidden sm:table-cell">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="text-xs text-gray-900">
                        {Math.round(product.rating ?? 0)}
                      </span>
                      <svg
                        className="w-3 h-3 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </td>
                  <td className="text-right py-2 px-1 text-xs text-gray-900">
                    {product.stockQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price vs Rating Chart */}
        <div className="flex-shrink-0 hidden sm:block">
          <h4 className="text-xs font-medium text-gray-900 mb-2">
            Price vs. Rating
          </h4>
          <div className="space-y-1">
            {dashboardMetrics?.popularProducts
              .slice(0, 3)
              .map((product, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-12 text-xs text-gray-500 truncate">
                    {product.name.split(" ")[0]}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${(product.price / 250) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">${product.price}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPopularProducts;
