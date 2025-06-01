"use client";
import CardPopularProducts from "./CardPopularProducts";
import CardSalesSummary from "./CardSalesSummary";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import CustomerExpenses from "./CustomerExpenses";
import PendingOrders from "./PendingOrders";
import SalesDiscount from "./SalesDiscount";

function Dashboard() {
  return (
    <div
      className="grid gap-4 lg:gap-6 min-h-screen p-4 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-6 
  auto-rows-auto
  lg:grid-rows-6 
  lg:h-[800px]"
    >
      {/* Popular Products - Full width on mobile, spans 2 cols on larger screens */}
      <div className="sm:col-span-2 lg:col-span-2 lg:row-span-4">
        <CardPopularProducts />
      </div>

      {/* Sales Summary - Full width on mobile, spans remaining space */}
      <div className="sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-span-4">
        <CardSalesSummary />
      </div>

      {/* Purchase Summary - Stacks on mobile */}
      <div className="sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-span-2">
        <CardPurchaseSummary />
      </div>

      {/* Expense Summary - Stacks on mobile */}
      <div className="sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-3 lg:row-span-2">
        <CardExpenseSummary />
      </div>

      {/* Customer Expenses - Responsive positioning */}
      <div className="sm:col-span-1 lg:col-span-2 lg:row-start-5 lg:row-span-2">
        <CustomerExpenses />
      </div>

      {/* Pending Orders - Responsive positioning */}
      <div className="sm:col-span-1 lg:col-span-2 lg:col-start-3 lg:row-start-5 lg:row-span-2">
        <PendingOrders />
      </div>

      {/* Sales Discount - Responsive positioning */}
      <div className="sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-5 lg:row-span-2">
        <SalesDiscount />
      </div>
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
