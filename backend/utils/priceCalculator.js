const bookingCost = (selection, duration) => {
  const basePrice = { small: 50, medium: 75, large: 100, extraLarge: 150 };
  return basePrice[selection] * duration;
};

module.exports = { bookingCost };
