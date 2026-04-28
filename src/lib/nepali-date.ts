/**
 * Format Nepali date for display
 * @param nepaliDate - Nepali date string in format "YYYY-MM-DD"
 * @returns Formatted Nepali date string
 */
export function formatNepaliDate(nepaliDate: string): string {
  const [year, month, day] = nepaliDate.split('-').map(Number);
  const nepaliMonths = [
    'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];
  return `${day} ${nepaliMonths[month - 1]}, ${year}`;
}

/**
 * Get current Nepali date (approximate - adds ~56 years to AD)
 * @returns Current Nepali date string in format "YYYY-MM-DD"
 */
export function getCurrentNepaliDate(): string {
  const now = new Date();
  const year = now.getFullYear() + 56;
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Compare two Nepali dates (for sorting/filtering)
 * Returns negative if a < b, positive if a > b, 0 if equal
 */
export function compareNepaliDates(a: string, b: string): number {
  return a.localeCompare(b);
}

/**
 * Check if Nepali date is before or equal to current date
 */
export function isNepaliDatePastOrPresent(nepaliDate: string): boolean {
  const today = getCurrentNepaliDate();
  return compareNepaliDates(nepaliDate, today) <= 0;
}
