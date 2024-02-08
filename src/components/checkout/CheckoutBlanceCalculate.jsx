import React, { useEffect, useState } from "react";
import { useGetCartQuery } from "../../featured/cartApi/cartApi";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddPaymentAmout } from "../../featured/order/orderSlice";
import CalculateBlance from "../../utils/calculateBlance";
function CheckoutBlanceCalculate() {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const { data } = useGetCartQuery();

  const { ownerCarts } = data?.data || {};

  useEffect(() => {
    let TotalBlance = CalculateBlance(ownerCarts);
    dispatch(AddPaymentAmout(TotalBlance));
    setTotalPrice(TotalBlance);
  }, [ownerCarts, dispatch, totalPrice]);

  return (
    <div className="w-[350px] border border-red-400 p-4 flex flex-col space-y-5">
      {/* Tax */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold tracking-tight text-gray-900">TAX:</p>
        <p className="text-lg font-bold tracking-tight text-gray-900">0</p>
      </div>
      {/* Vat */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold tracking-tight text-gray-900">Vat:</p>
        <p className="text-lg font-bold tracking-tight text-gray-900">0</p>
      </div>
      {/* Total Price */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold tracking-tight text-gray-900">
          Total Price:
        </p>
        <p className="text-lg font-bold tracking-tight text-gray-900">
          {totalPrice} Taka
        </p>
      </div>
      <div className="flex justify-center items-center">
        {totalPrice > 0 && (
          <Link to="/order">
            <Button>Order Now</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CheckoutBlanceCalculate;
