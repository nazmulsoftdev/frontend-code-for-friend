import React, { useState, useEffect } from "react";
import { PaymentList } from "../../utils/payment.data";
import { Button, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPaymentAmout,
  AddPaymentMethod,
} from "../../featured/order/orderSlice";
import { checkUserFieldValidation } from "../../utils/checkUserFieldValidation";
import toast from "react-hot-toast";
import { useGetCartQuery } from "../../featured/cartApi/cartApi";
import CalculateBlance from "../../utils/calculateBlance";
import { useAddOrderMutation } from "../../featured/order/orderApi";
function OrderPaymentSelect() {
  const [paymentData, setPaymentData] = useState([]);
  const { paymentAmount, paymentMethod } = useSelector((state) => state.order);
  const { infoName, infoPhone, infoPostCode, infoDivision, infoLocation } =
    useSelector((state) => state.shipping);

  const { data } = useGetCartQuery();

  const { ownerCarts } = data?.data || {};

  const [isOk, setIsOk] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setPaymentData(PaymentList);
  }, [paymentData]);

  // select payment option handler

  const selectPaymentHandler = (value) => {
    dispatch(AddPaymentMethod(value));
  };

  useEffect(() => {
    if (
      !paymentMethod &&
      !paymentAmount &&
      !infoName &&
      !infoPhone &&
      !infoPostCode &&
      !infoDivision &&
      !infoLocation
    ) {
      setIsOk(true);
    }
    if (
      paymentMethod &&
      paymentAmount &&
      infoName &&
      infoPhone &&
      infoPostCode &&
      infoDivision &&
      infoLocation
    ) {
      setIsOk(false);
    }
  }, [
    paymentMethod,
    paymentAmount,
    infoName,
    infoPhone,
    infoPostCode,
    infoDivision,
    infoLocation,
    isOk,
  ]);

  // blance calculate
  useEffect(() => {
    let TotalBlance = CalculateBlance(ownerCarts);
    dispatch(AddPaymentAmout(TotalBlance));
  }, [ownerCarts, dispatch]);

  // add order muitation

  const [addOrder, { isLoading, isError, isSuccess, error }] =
    useAddOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully order accepted");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  // confirm payment handler

  const confirmHandler = () => {
    if (
      !checkUserFieldValidation([
        infoName,
        infoPhone,
        infoPostCode,
        infoDivision,
        infoLocation,
      ])
    ) {
      toast.error("Shipping information missing");
    } else if (!paymentMethod) {
      toast.error("Please select the payment method");
    } else {
      // addOrder({
      //   data: {
      //     orderItems: ,
      //     shippingAddress: {
      //       infoName,
      //       infoPhone,
      //       infoDivision,
      //       infoPostCode,
      //       infoLocation,
      //     },
      //     status: "pending",
      //     totalPrice: paymentAmount,
      //     paymentMethod: paymentMethod,
      //     isPaymentComplete:
      //       paymentMethod !== "Cash on delivery" ? true : false,
      //   },
      // });
      // addOrder({
      //   orderItems: [...ownerCarts],
      //   status: "pending",
      //   totalPrice: paymentAmount,
      // });

      let orderProcessor = ownerCarts.map((item) => ({
        ...item,
        paymentMethod,
        status: "pending",
        shippingInformation: {
          infoName,
          infoPhone,
          infoPostCode,
          infoDivision,
          infoLocation,
        },
      }));

      addOrder({
        orderProcessor,
      });
    }
  };

  return (
    <div className="w-full p-3">
      <h3 className="text-3xl font-bold mb-10">Payment Information</h3>

      <div className="grid md:grid-cols-1 gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
        {paymentData.map((item) => {
          const { img, name, id } = item || {};
          return (
            <div
              key={id}
              className={`p-3 bg-slate-50 shadow-2xl flex flex-col justify-center items-center space-y-3 rounded-2xl cursor-pointer ${
                name == paymentMethod && "border border-green-400"
              }`}
              onClick={() => selectPaymentHandler(name)}
            >
              <img src={img} alt=".." width="150px" />
              <p className="text-xl font-bold">{name}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <Button onClick={confirmHandler} disabled={isOk} className="w-full">
          {isLoading ? (
            <Spinner color="failure" aria-label="Failure spinner example" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
}

export default OrderPaymentSelect;
