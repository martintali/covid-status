export const formatNumber = (value) => {
  if (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return '—';
};

export const formatWithPlus = (v) =>
  v > 0 ? `+${formatNumber(String(v))}` : formatNumber(String(v));
