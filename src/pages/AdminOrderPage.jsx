import React from "react";
import { useGetOrderQuery } from "../featured/order/orderApi";
import AdminOrderList from "../components/adminOrderList/adminOrderList";

function AdminOrderPage() {
  const { data: orders, isLoading, isError } = useGetOrderQuery();

  const { data } = orders || {};

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Error happend</p>;
  } else if (!isLoading && !isError && data?.ownerOrders.length > 0) {
    content = data?.ownerOrders?.map((items, index) => (
      <AdminOrderList key={index} itemData={items} />
    ));
  }
  return (
    <div className="w-[95%] m-auto">
      <div className="mt-5 w-full grid grid-cols-1 gap-5">{content}</div>
    </div>
  );
}

export default AdminOrderPage;
