export const formatPhoneNumber = (phoneNumber) => {
  const ddd = phoneNumber.slice(0, 2);
  const phoneNumberFirstPart = phoneNumber.slice(2, 7);
  const phoneNumberSecondPart = phoneNumber.slice(7, 11);

  return `(${ddd}) ${phoneNumberFirstPart}-${phoneNumberSecondPart}`;
};

export const removeNonDigitCharactersPhone = (phoneNumber) =>
  phoneNumber.replace(/\D/g, "");
