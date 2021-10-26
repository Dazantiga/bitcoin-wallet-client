export const calculateBitcoin = (amount, priceBitcoin) => {
  return (parseFloat(amount) * 1) / parseFloat(priceBitcoin);
};
