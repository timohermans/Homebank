export const formatToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('nl-NL', {
    currency: 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  });

  return formatter.format(value);
};