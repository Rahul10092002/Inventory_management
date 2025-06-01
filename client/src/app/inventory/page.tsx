"use client";
import { useGetProductsQuery } from '@/state/api';
import React from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];
function Inventory() {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  if (isLoading) {
  return <div className="py-4">Loading...</div>;
}

if (isError || !products) {
  return (
    <div className="text-center text-red-500 py-4">
      Failed to fetch products
    </div>
  );
}
console.log(products);
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Inventory</h2>
      <div className="mt-4">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        />
      </div>
    </div>
  );
}

export default Inventory