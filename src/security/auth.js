export const isTokenValid = (token) => {
  if (!token) return false;

  const expiry = JSON.parse(atob(token.split(".")[1])).exp * 1000;
  const now = new Date().getTime();

  return now < expiry; // Tokenning amal qilish muddati tekshiriladi
};
