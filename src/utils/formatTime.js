export const formatTime = (time) => {
  const hours = time.slice(0, 2);
  const minutes = time.slice(2, 4);

  return `${hours}:${minutes}`;
};

export const removeNonDigitCharactersTime = (time) =>
  time.replace(/[^0-9]/g, "");
