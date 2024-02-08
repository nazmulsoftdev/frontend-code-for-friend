import React, { useState } from "react";
import { FaEye as ViewIcon } from "react-icons/fa";
import { MdFolderDelete as DeleteIcon } from "react-icons/md";
import { GoDiscussionOutdated as DateIcon } from "react-icons/go";
import { Tooltip } from "flowbite-react";
import { useRemoveOrderMutation } from "../../featured/order/orderApi";
import AdminOrderListModal from "./AdminOrderListModal";

function AdminOrderList({ itemData }) {
  const {
    _id,
    imageURL,
    name,
    price,
    quantity,
    status,
    paymentMethod,
    dateOrdered,
  } = itemData || {};

  const [toggle, setToggle] = useState(false);

  // toggle modal handler

  const toggleModalHandler = () => {
    setToggle(!toggle);
  };

  const [removeOrder, { isSuccess }] = useRemoveOrderMutation();

  // delete order handler
  const deleteOrderHandler = (orderId) => {
    removeOrder({ id: orderId });
  };

  return (
    <>
      <div className="grid grid-cols-9 gap-3 place-items-center">
        {/* Image */}
        <div>
          <img
            src={imageURL}
            alt="sss"
            className="w-[200px] h-[200px] rounded-md"
          />
        </div>
        {/* Price */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Price</p>
          <p>$ {price}</p>
        </div>
        {/* Quantity */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Quantity</p>
          <p>{quantity}</p>
        </div>
        {/* Totoal Price */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Total</p>
          <p>$ {price * quantity}</p>
        </div>
        {/* Payment */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Payment</p>
          <p>{paymentMethod}</p>
        </div>
        {/* Status */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Status</p>
          <p>{status}</p>
        </div>
        {/* Date */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Date</p>
          <Tooltip content={dateOrdered.toString()}>
            <DateIcon className="cursor-pointer" size={25} />
          </Tooltip>
        </div>
        {/* View */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">View</p>
          <ViewIcon
            onClick={toggleModalHandler}
            size={25}
            className="cursor-pointer"
            color="green"
          />
        </div>
        {/* Delete action */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 font-bold">Delete</p>
          <DeleteIcon
            onClick={() => deleteOrderHandler(_id)}
            size={25}
            className="cursor-pointer"
            color="red"
          />
        </div>
      </div>
      {toggle && (
        <AdminOrderListModal
          toggle={toggle}
          toggleModalHandler={toggleModalHandler}
          itemData={itemData}
        />
      )}
    </>
  );
}

export default AdminOrderList;
