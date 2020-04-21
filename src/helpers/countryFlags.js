export const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== 'undefined' && isoCode
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
};
