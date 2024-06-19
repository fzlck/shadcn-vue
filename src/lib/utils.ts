import type { Updater } from '@tanstack/vue-table'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function convertDate(iso8601Date: string, locale: string) {
  if (!iso8601Date) {
    return null;
  }
  const date = new Date(iso8601Date);
  const formattedDate = date.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/,/, '');
  return formattedDate;
}

export function convertToDDMMYYYY(date: string): string {
  const dateStr = new Date(date);
  const formattedDate = dateStr.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const [day, month, year] = formattedDate.split('.');
  return `${day}/${month}/${year}`
}