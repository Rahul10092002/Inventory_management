"use client";
import React from "react";
import CardPopularProducts from "./CardPopularProducts";
import CardSalesSummary from "./CardSalesSummary";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import StatCard from "./StatCard";
import {
  Package,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Tag,
} from "lucide-react";
import CustomerExpenses from "./CustomerExpenses";
import PendingOrders from "./PendingOrders";
import SalesDiscount from "./SalesDiscount";

function Dashboard() {
  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-4 lg:gap-6 h-[800px]">
      <CardPopularProducts />
      <div className="md:col-span-3 lg:col-span-2 lg:col-start-3 lg:row-span-4 h-[400px] md:h-[350px] lg:h-auto">
        <CardSalesSummary />
      </div>
      <div className="md:col-span-3 lg:col-span-2 lg:col-start-5 lg:row-span-2 h-[200px] md:h-[250px] lg:h-auto">
        <CardPurchaseSummary />
      </div>
      <CardExpenseSummary />
      <div className="md:col-span-1 lg:col-span-2 lg:row-start-5 lg:row-span-2 h-[250px] md:h-[300px] lg:h-auto">
        <CustomerExpenses />
      </div>

      <PendingOrders />
      <SalesDiscount />
      {/* <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
      /> */}
    </div>
  );
}

export default Dashboard;
