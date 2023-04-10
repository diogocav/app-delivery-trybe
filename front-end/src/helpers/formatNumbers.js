function formatPrice(price) {
  return price.toString().replace('.', ',');
}
function formatDate(date) {
  const regex = /^(\d{4})-(\d{2})-(\d{2}).*$/;
  const match = regex.exec(date);
  const formattedDate = `${match[3]}/${match[2]}/${match[1]}`;
  return formattedDate;
}

export {
  formatPrice,
  formatDate,
};
