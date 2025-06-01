"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import Header from "../_components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "User Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];
function Users() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (error || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }
  console.log(users);

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default Users;
