import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { useGetSingleProductItemQuery } from "../featured/productApi/productApi";
import { useAddToCartMutation } from "../featured/cartApi/cartApi";
import ProductReview from "../components/ProductReview/ProductReview";
import RelatedProduct from "../components/RelatedProduct/RelatedProduct";

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Get the product item by its ID .
  const { data } = useGetSingleProductItemQuery(id);

  // product destructure
  const { imageURL, name, price, description, _id, userReviews, category } =
    data?.data || {};

  console.log(name);

  // add to cart mutation request

  const [addToCart, { isLoading, isSuccess, isError, error }] =
    useAddToCartMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Added to Cart");
    }
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  // increment quantity
  const IncrementQuantityHandler = () => {
    setQuantity((prevState) => prevState + 1);
  };

  // decrement quantity

  const decrementQuantityHandler = () => {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
  };

  // checkout handler

  const checkoutHandler = () => {
    navigate("/checkout");
    addToCart({
      imageURL,
      name,
      price,
      quantity,
      category,
      productId: _id,
    });
  };

  // add to cart handler

  const addToCartHandler = () => {
    addToCart({
      imageURL,
      name,
      price,
      quantity,
      category,
      productId: _id,
    });
  };

  // decide how to render product review

  let ProductReviewContent = null;

  if (userReviews?.length == 0) {
    ProductReviewContent = (
      <p className="mt-2 text-xl font-semibold text-gray-800">No reviews yet</p>
    );
  } else if (userReviews?.length > 0) {
    ProductReviewContent = userReviews.map((item) => (
      <ProductReview key={item?._id} items={item} />
    ));
  }

  return (
    <div className="w-[95%] m-auto md:w-[85%] md:m-auto lg:w-[85%] lg:m-auto">
      <div className="grid grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-2 lg:gap-3">
        {/* Image Show */}
        <div className="w-[100%] h-[500px]">
          <img src={imageURL} alt="..." className="w-[100%] h-[100%]" />
        </div>
        <div className="flex flex-col space-y-7">
          {/* name */}
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          {/* description */}
          <p>{description}</p>
          {/* Price */}
          <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Taka: {quantity * price}
          </p>
          {/* Quantity */}
          <div className="flex items-center space-x-3">
            <Button onClick={decrementQuantityHandler}>-</Button>
            <p>{quantity}</p>
            <Button onClick={IncrementQuantityHandler}>+</Button>
          </div>
          {/* check out */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={checkoutHandler}
              className="px-3 cursor-pointer"
              color="dark"
            >
              Check out
            </Button>
            <Button
              onClick={addToCartHandler}
              className="px-3 cursor-pointer"
              color="gray"
            >
              {isLoading ? (
                <Spinner color="failure" aria-label="Failure spinner example" />
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Product Review Section */}
      {ProductReviewContent}
      <RelatedProduct />
    </div>
  );
}

export default ProductView;
