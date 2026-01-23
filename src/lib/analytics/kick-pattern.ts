import { getKicks, type Kick } from '../storage/kicks';

/**
 * Maps hour strings to kick counts
 */
export interface HourCount {
  [hour: string]: number;
}

/**
 * Result from peak activity analysis
 */
export interface PeakActivity {
  hour: number;
  count: number;
}

/**
 * Analyzes kick patterns throughout the day
 * 
 * Returns an object mapping each hour (0-23) to the number of kicks
 * that occurred during that hour across all recorded days.
 * 
 * @returns {HourCount} Object with hours as keys and kick counts as values
 * 
 */
export function getTimeOfDayPatterns(kicks: Kick[]): HourCount {
  // Get kicks from the storage module
  const hourCounts: HourCount = {};
  
  kicks.forEach(kick => {
    const kickTime = new Date(kick.timestamp);
    const hour = kickTime.getHours();
    const hourKey = `${hour}:00`;
    
    // Increment count for this hour
    hourCounts[hourKey] = (hourCounts[hourKey] || 0) + 1;
  });
  
  return hourCounts;
}

/**
 * Identifies the hour with the most kick activity
 * 
 * @returns {PeakActivity} Object with hour (0-23) and count
 * 
 */
export function getPeakActivityHour(kicks: Kick[]): PeakActivity {
  const patterns = getTimeOfDayPatterns(kicks);
  
  let maxHour = 0;
  let maxCount = 0;
  
  Object.entries(patterns).forEach(([hour, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxHour = parseInt(hour);
    }
  });
  
  return { hour: maxHour, count: maxCount };
}

/**
 * Formats an hour (0-23) into 12-hour format with AM/PM
 * 
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {string} Formatted time string (e.g., "2 PM", "9 AM")
 */
export function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}