export const inr = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`

export function slugify(input = '') {
  return input.toLowerCase().replace(/\s+/g, '-')
}

export function deslugify(input = '') {
  return input
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function isValidPincode(pincode) {
  return /^\d{6}$/.test(pincode)
}

export function etaDate(days = 5) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
