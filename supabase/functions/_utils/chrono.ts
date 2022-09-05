export const getTime = () => {
  const currentTime = Date.now().toString();
  return currentTime.slice(0, currentTime.length - 3);
};
