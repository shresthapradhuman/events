import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate({ date, locale }: { date: Date; locale?: string }) {
  return new Date(date).toLocaleDateString(locale || 'ja-JP', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPrice({
  price,
  locale,
  currency,
}: {
  price: string
  locale?: string
  currency?: string
}) {
  return new Intl.NumberFormat(locale || 'ja-JP', {
    style: 'currency',
    currency: currency || 'JPY',
  }).format(parseInt(price))
}
