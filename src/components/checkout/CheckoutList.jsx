import React from "react";
import { MdOutlineFolderDelete as DeleteIcon } from "react-icons/md";
import { CiCirclePlus as PlusIcon } from "react-icons/ci";
import { CiCircleMinus as MinusIcon } from "react-icons/ci";
import toast from "react-hot-toast";
import {
  useDecrementCartItemMutation,
  useIncrementCartItemMutation,
  useRemoveCartItemMutation,
} from "../../featured/cartApi/cartApi";

function CheckoutList({ items }) {
  const { _id, imageURL, name, price, quantity } = items || {};

  //   cart item remove mutation
  const [removeCarItem] = useRemoveCartItemMutation();

  // cart item increment mutation
  const [incrementCartItem] = useIncrementCartItemMutation();

  // cart item decrement mutation
  const [decrementCartItem] = useDecrementCartItemMutation();

  //   remove car item

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
    <div className=" grid grid-cols-7 place-content-center place-items-center m-3">
      {/* image */}
      <div className="col-span-2 w-full h-[200px] rounded-lg">
        <img src={imageURL} alt={name} width="100%" height="100%" />
      </div>
      {/* name */}
      <div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </div>
      {/* Price */}
      <div>
        <p className="text-lg font-bold tracking-tight text-gray-900">
          Price:{price}
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
      {/* Total */}
      <div>
        <p className="text-lg font-bold tracking-tight text-gray-900">
          Totoal: {price * quantity}TK
        </p>
      </div>
      {/* Delete icon */}
      <div>
        <DeleteIcon
          onClick={removeCarItemHanlder}
          size={30}
          className="cursor-pointer"
          color="red"
        />
      </div>
    </div>
  );
}

export default CheckoutList;
