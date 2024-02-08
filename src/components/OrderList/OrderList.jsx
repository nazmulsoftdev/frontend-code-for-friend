import React, { useState } from "react";

import { Card, Badge, Button } from "flowbite-react";
import OrderListModal from "./OrderListModal";
import { MdOutlineFolderDelete as DeleteIcon } from "react-icons/md";
import { useRemoveOrderMutation } from "../../featured/order/orderApi";
import OrderItemReviewModal from "./OrderItemReviewModal";
function OrderList({ itemData }) {
  const { _id, imageURL, name, price, quantity, status, productId } =
    itemData || {};

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

  const [reviewToggle, setReviewToggle] = useState(false);

  // review toggle handler
  const reviewToggleHandler = () => {
    setReviewToggle(!reviewToggle);
  };

  return (
    <>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={imageURL}
      >
        <div className="flex flex-col space-y-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          {/* Price */}
          <div>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Price: {price}
            </h5>
          </div>

          {/* Quantity */}
          <div>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Quantity {quantity}
            </h5>
          </div>
          {/* Status */}
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Status:
            </p>
            <Badge color="indigo" className="p-1 text-lg rounded-full">
              {status}
            </Badge>
          </div>
          {/* Tacking button */}
          <div className="mt-5 flex justify-between items-center">
            {status === "completed" ? (
              <Button color="success" onClick={reviewToggleHandler}>
                Add Review
              </Button>
            ) : (
              <Button onClick={toggleModalHandler}>Track</Button>
            )}

            <DeleteIcon
              onClick={() => deleteOrderHandler(_id)}
              size={25}
              color="red"
              className="cursor-pointer"
            />
          </div>
        </div>
      </Card>
      {/* Order Tracking modal */}
      {toggle && (
        <OrderListModal
          toggle={toggle}
          toggleModalHandler={toggleModalHandler}
          itemData={itemData}
        />
      )}
      {/* Order complete item review modal */}
      {reviewToggle && (
        <OrderItemReviewModal
          productId={productId}
          reviewToggle={reviewToggle}
          reviewToggleHandler={reviewToggleHandler}
        />
      )}
    </>
  );
}

export default OrderList;
