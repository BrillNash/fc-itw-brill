export const getEpochSeconds = (isoString: string): number => {
  return Math.floor(new Date(isoString).getTime() / 1000);
}
