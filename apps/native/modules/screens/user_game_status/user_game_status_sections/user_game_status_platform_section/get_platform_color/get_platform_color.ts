export const getPlatformColor = (platform: string) => {
  if (platform.toLowerCase().includes("playstation")) {
    return "blue";
  }
  if (platform.toLowerCase().includes("xbox")) {
    return "green";
  }
  if (platform.toLowerCase().includes("nintendo")) {
    return "red";
  }
  return "primary";
};
