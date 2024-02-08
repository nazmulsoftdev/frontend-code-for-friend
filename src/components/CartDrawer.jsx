import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { IoIosClose as CloseIcon } from "react-icons/io";
import CartList from "./cartList/cartList";

function CartDrawer({ isOpen, toggleDrawer, ownerCarts }) {
  let content = null;

  if (ownerCarts?.length == 0) {
    content = <p>Cart list is empty</p>;
  } else if (ownerCarts?.length > 0) {
    content = ownerCarts.map((items) => (
      <CartList key={items._id} item={items} toggleDrawer={toggleDrawer} />
    ));
  }

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size={350}
        className="min-h-screen overflow-scroll p-1"
      >
        <div className="p-2 flex justify-between items-center">
          <h4>Cart</h4>
          <CloseIcon
            onClick={toggleDrawer}
            size={40}
            className="cursor-pointer"
          />
        </div>
        {/* All cart list will render here */}
        {content}
      </Drawer>
    </div>
  );
}

export default CartDrawer;
