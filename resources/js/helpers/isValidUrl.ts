const isValidUrl = (string: string | URL) => {
  try {
    new URL(string);
  } catch (error) {
    console.log("error is", error);
    return false;
  }
  return true;
};

export default isValidUrl;
