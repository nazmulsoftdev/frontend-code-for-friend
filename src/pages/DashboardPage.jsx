import React from "react";
import { useGetOrderQuery } from "../featured/order/orderApi";
import OrderList from "../components/OrderList/OrderList";

function DashboardPage() {
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
      <OrderList key={index} itemData={items} />
    ));
  }

  return (
    <div className="w-[95%] m-auto md:w-[85%] md:m-auto lg:w-[85%] lg:m-auto">
      <div className="mt-5 w-full grid grid-cols-1 gap-5 place-items-center lg:mt-5 lg:grid lg:grid-cols-3 lg:gap-5">
        {content}
      </div>
    </div>
  );
}

export default DashboardPage;
