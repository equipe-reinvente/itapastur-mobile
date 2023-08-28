export const formatDate = (date) => {
  const day = date.slice(0, 2);
  const month = date.slice(2, 4);
  const year = date.slice(4, 8);

  return `${day}/${month}/${year}`;
};

export const removeNonDigitCharactersDate = (date) =>
  date.replace(/[^0-9]/g, "");
