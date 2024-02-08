const CalculateBlance = (cartData) => {
  let sum = 0;
  cartData?.forEach((item) => {
    sum += item.price * item.quantity;
  });

  return sum;
};

export default CalculateBlance;
