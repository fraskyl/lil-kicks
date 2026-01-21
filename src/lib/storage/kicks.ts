export interface Kick {
  timestamp: string;
  date: string;
  time: string;
}

export interface KickGroup {
  [date: string]: Kick[];
}

const STORAGE_KEY = 'babyKicks';

/**
 * Retrieves all kicks from localStorage
 */
export function getKicks(): Kick[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Saves kicks to localStorage
 */
export function saveKicks(kicks: Kick[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kicks));
}

/**
 * Adds a new kick
 */
export function addKick(): Kick {
  const kicks = getKicks();
  const now = new Date();
  
  const newKick: Kick = {
    timestamp: now.toISOString(),
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  kicks.push(newKick);
  saveKicks(kicks);
  
  return newKick;
}

/**
 * Gets kicks within a date range
 */
export function getKicksInRange(startDate: Date, endDate: Date): Kick[] {
  const kicks = getKicks();
  return kicks.filter(kick => {
    const kickDate = new Date(kick.timestamp);
    return kickDate >= startDate && kickDate <= endDate;
  });
}

/**
 * Groups kicks by date
 */
export function groupKicksByDate(kicks: Kick[]): KickGroup {
  const groups: KickGroup = {};
  kicks.forEach(kick => {
    if (!groups[kick.date]) {
      groups[kick.date] = [];
    }
    groups[kick.date].push(kick);
  });
  return groups;
}