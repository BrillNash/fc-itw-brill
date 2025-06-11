import { useTimezoneStore } from '@/stores/timezone';
import { DateTime } from 'luxon'

export const formatEpochInTimezone = (epochSeconds: number): string =>  {
  const timezoneStore = useTimezoneStore()

  return DateTime
    .fromSeconds(epochSeconds, { zone: timezoneStore.timezone })
    .toFormat('MMM dd, yyyy HH:mm');
}
