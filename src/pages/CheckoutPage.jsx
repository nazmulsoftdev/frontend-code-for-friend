import React, { useEffect } from "react";
import { useGetCartQuery } from "../featured/cartApi/cartApi";
import toast from "react-hot-toast";
import CheckoutList from "../components/checkout/CheckoutList";
import CheckoutBlanceCalculate from "../components/checkout/CheckoutBlanceCalculate";
import { Link } from "react-router-dom";
import checkoutNotfound from "../assets/checkout.png";
import { Button } from "flowbite-react";

function CheckoutPage() {
  const { data, isLoading, isError, error } = useGetCartQuery();

  const { ownerCarts } = data?.data || {};

  useEffect(() => {
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isError, error]);

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Opps something went wrong</p>;
  } else if (!isLoading && !isError && ownerCarts?.length == 0) {
    content = (
      <div className="flex flex-col justify-center items-center">
        <img
          src={checkoutNotfound}
          alt="..."
          className="w-[350px] rounded-full"
        />
        <Link to="/">
          <Button>Go back</Button>
        </Link>
      </div>
    );
  } else if (!isLoading && !isError && ownerCarts?.length > 0) {
    content = ownerCarts.map((item) => (
      <CheckoutList key={item._id} items={item} />
    ));
  }

  return (
    <div className="w-[95%] m-auto md:w-[90%] md:m-auto lg:w-[90%] lg:m-auto">
      <div className=" mt-5 flex flex-col space-y-3">{content}</div>
      {ownerCarts?.length > 0 && (
        <div className="mt-10 flex justify-end items-center">
          <CheckoutBlanceCalculate />
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
