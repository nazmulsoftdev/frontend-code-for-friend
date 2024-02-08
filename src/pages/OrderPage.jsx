import React from "react";
import ShippingAddress from "../components/OrderConfirm/ShippingAddress";
import OrderPaymentSelect from "../components/OrderConfirm/OrderPaymentSelect";

function OrderPage() {
  return (
    <div className="w-[95%] m-auto md:w-[85%] md:m-auto lg:w-[85%] lg:m-auto">
      <div className="flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-10  lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <ShippingAddress />
        </div>
        <div>
          <OrderPaymentSelect />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
