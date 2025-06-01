import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Image from "next/image";
import Rating from "../_components/Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="col-span-2 row-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Popular Products
          </h3>
          <p className="text-sm text-gray-500">
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
        <div className="overflow-y-auto flex-1 mb-3 scrollbar-hide"> 
          {dashboardMetrics?.popularProducts.map((product) => (
            <div
              key={product.productId}
              className="flex items-center justify-between gap-3 px-5 py-7 border-b"
            >
              <div className="flex items-center gap-3">
                {/* <Image
                      src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                        Math.floor(Math.random() * 3) + 1
                      }.png`}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg w-14 h-14"
                    /> */}
                <div className="flex flex-col justify-between gap-1">
                  <div className="font-bold text-gray-700">{product.name}</div>
                  <div className="flex text-sm items-center">
                    <span className="font-bold text-blue-500 text-xs">
                      ${product.price}
                    </span>
                    <span className="mx-2">|</span>
                    <Rating rating={product.rating || 0} />
                  </div>
                </div>
              </div>

              <div className="text-xs flex items-center">
                <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                  <ShoppingBag className="w-4 h-4" />
                </button>
                {Math.round(product.stockQuantity / 1000)}k Sold
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPopularProducts;
