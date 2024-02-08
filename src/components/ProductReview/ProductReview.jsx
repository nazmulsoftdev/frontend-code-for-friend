import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

function ProductReview({ items }) {
  const [toggle, setToggle] = useState(false);

  const { author, rating, review } = items || {};

  return (
    <div className="mt-5">
      <h3
        className="text-xl font-bold underline cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        Review
      </h3>
      {toggle && (
        <ReviewCard authorId={author} rating={rating} review={review} />
      )}
    </div>
  );
}

export default ProductReview;
