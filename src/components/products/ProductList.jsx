import React from "react";
import { Button, Card } from "flowbite-react";
import { BiCartAdd as CartIcon } from "react-icons/bi";
import { Link } from "react-router-dom";
function ProductList({ items }) {
  const { _id, name, price, inStock, imageURL } = items || {};

  return (
    <div>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={imageURL}
      >
        {/* Name */}
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Taka {price}</p>
          {inStock ? (
            <p className="p-2 bg-green-400 text-white rounded-full text-xs">
              InStock
            </p>
          ) : (
            <p className="p-2 bg-red-500 text-white rounded-full text-xs">
              Out of stock
            </p>
          )}
        </div>
        {/* Buy Now */}
        {inStock ? (
          <div className="w-full flex items-center space-x-3">
            <Link to={`/product/${_id}`} className="w-full">
              <Button className="w-full">View Bag</Button>
            </Link>
            <CartIcon size={30} className="cursor-pointer " color="#0984e3" />
          </div>
        ) : (
          <Button disabled={true}>View Bag</Button>
        )}
      </Card>
    </div>
  );
}

export default ProductList;
