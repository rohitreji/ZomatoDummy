export const formatCurrency = (amount) => {
  const number = Number(amount || 0);
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
  return `₹${formatted}`;
};
