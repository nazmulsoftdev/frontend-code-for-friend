import React from "react";
import { IoMdCart as CartIcon } from "react-icons/io";
import CartDrawer from "./CartDrawer";
import { useGetCartQuery } from "../featured/cartApi/cartApi";

function NavCart() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { data } = useGetCartQuery();

  const { ownerCarts } = data?.data || {};

  return (
    <>
      <div className="relative" onClick={toggleDrawer}>
        <CartIcon size={22} className="cursor-pointer" />
        {/* Cart count */}
        <div
          className={`absolute w-[20px] h-[20px] flex justify-center items-center p-1 ${
            ownerCarts?.length > 0 && "bg-green-300"
          } bottom-3 rounded-full left-4`}
        >
          {ownerCarts?.length > 0 && (
            <span className="text-xs text-black font-bold">
              {ownerCarts?.length}
            </span>
          )}
        </div>
      </div>
      {isOpen && (
        <CartDrawer
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          ownerCarts={ownerCarts}
        />
      )}
    </>
  );
}

export default NavCart;
