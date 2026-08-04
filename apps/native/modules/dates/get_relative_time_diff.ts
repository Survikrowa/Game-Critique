type RelativeTimeDiff = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
};

export const getRelativeTimeDiff = (isoString: string): RelativeTimeDiff => {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return { seconds, minutes, hours, days };
};
