import { getKicksInRange } from '../storage/kicks';

/** 
 * Average Daily Kicks Analytics
 * Calculates average kicks per day over a specified period
 */
function getAverageDailyKicks(days: number = 7): number {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const kicks = getKicksInRange(startDate, now);
  
  return Math.round(kicks.length / days);
}