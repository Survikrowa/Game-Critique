export const getPlatformGlowColor = (platformName: string): string => {
  const name = platformName.toLowerCase();

  if (name.includes("playstation")) {
    return "#3B82F6";
  }

  if (name.includes("xbox")) {
    return "#22C55E";
  }

  return "#94A3B8";
};
