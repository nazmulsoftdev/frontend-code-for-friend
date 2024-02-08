import React, { useState, useEffect } from "react";
import ProductList from "./productList";
import { useGetProductsQuery } from "../../featured/productApi/productApi";

function Products() {
  const { data, isLoading, isError } = useGetProductsQuery();

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Opps something went wrong</p>;
  } else if (!isLoading && !isError && data?.data?.length == 0) {
    content = <p>Product list is empty</p>;
  } else if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((item) => (
      <ProductList key={item._id} items={item} />
    ));
  }

  return (
    <div className="mt-10">
      <div className="sm:w-[90%] sm:m-auto md:[85%] md:m-auto">
        <div className="grid grid-cols-1 gap-2 place-items-center md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-3 lg:gap-3">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Products;
