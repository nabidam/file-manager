export default class Helper {
  static isValidUrl = (string: string | URL) => {
    try {
      new URL(string);
    } catch (error) {
      console.log("error is", error);
      return false;
    }
    return true;
  };
  static sizeFormatter = (size: number) =>
    new Intl.NumberFormat([], {
      style: "unit",
      unit: "byte",
      notation: "compact",
      unitDisplay: "narrow",
    }).format(size);
}
