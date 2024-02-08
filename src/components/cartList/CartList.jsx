import React, { useEffect } from "react";
import { Card, Button } from "flowbite-react";
import { MdOutlineFolderDelete as DeleteIcon } from "react-icons/md";
import { CiCirclePlus as PlusIcon } from "react-icons/ci";
import { CiCircleMinus as MinusIcon } from "react-icons/ci";
import {
  useDecrementCartItemMutation,
  useIncrementCartItemMutation,
  useRemoveCartItemMutation,
} from "../../featured/cartApi/cartApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function CartList({ item }) {
  const { _id, imageURL, name, price, quantity } = item || {};

  //   cart item remove mutation
  const [removeCarItem, { isSuccess, isError, error }] =
    useRemoveCartItemMutation();

  // cart item increment mutation
  const [incrementCartItem] = useIncrementCartItemMutation();

  // cart item decrement mutation
  const [decrementCartItem] = useDecrementCartItemMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully removed");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  //   remove cart item

  const removeCarItemHanlder = () => {
    removeCarItem({ id: _id });
  };

  //   increment cart item handler

  const incrementCartItemHandler = () => {
    incrementCartItem({
      id: _id,
      quantity,
    });
  };

  //   decrement cart item handler

  const decrementCartItemHandler = () => {
    if (quantity > 1) {
      decrementCartItem({
        id: _id,
        quantity,
      });
    } else {
      toast.error("Can't decrement");
    }
  };

  return (
    <div>
      <Card className="max-w-sm shadow-lg mb-2" imgAlt="png" imgSrc={imageURL}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        {/* Price */}
        <div>
          <p className="text-lg font-bold tracking-tight text-gray-900">
            Price: {price} TK
          </p>
        </div>
        {/* Quantity */}
        <div className="flex items-center space-x-3">
          <MinusIcon
            onClick={decrementCartItemHandler}
            size={25}
            className="cursor-pointer"
          />
          <p className="text-lg font-bold">{quantity}</p>
          <PlusIcon
            onClick={incrementCartItemHandler}
            size={25}
            className="cursor-pointer"
          />
        </div>
        {/* Delete Icon */}
        <div className=" flex justify-between items-center">
          <Link to="/checkout">
            <Button size="sm">Checkout</Button>
          </Link>
          <DeleteIcon
            onClick={removeCarItemHanlder}
            size={30}
            className="cursor-pointer"
            color="red"
          />
        </div>
      </Card>
    </div>
  );
}

export default CartList;
