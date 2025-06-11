export const getDurationFromEpochSeconds = (startEpoch: number, endEpoch: number): string => {
  const totalSeconds = endEpoch - startEpoch;
  if (totalSeconds < 0) return "Invalid duration";

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes || parts.length === 0) parts.push(`${minutes}m`);

  return parts.join(' ');
}
