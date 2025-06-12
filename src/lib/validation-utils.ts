/**
 * Validates an email address
 * @param email - The email to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export function isValidPhone(phone: string) {
  const phoneRegex = /^\+?[0-9]{10,15}$/
  return phoneRegex.test(phone)
}

/**
 * Validates a password strength
 * @param password - The password to validate
 * @returns Object with validation results
 */
export function validatePassword(password: string) {
  const minLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

  const strength =
    (minLength ? 1 : 0) +
    (hasUppercase ? 1 : 0) +
    (hasLowercase ? 1 : 0) +
    (hasNumber ? 1 : 0) +
    (hasSpecialChar ? 1 : 0)

  return {
    isValid: minLength && hasUppercase && hasLowercase && hasNumber,
    strength: Math.min(Math.floor((strength / 5) * 100), 100), // 0-100 scale
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
  }
}

/**
 * Validates a credit card number using Luhn algorithm
 * @param cardNumber - The credit card number to validate
 * @returns Boolean indicating if the card number is valid
 */
export function isValidCreditCard(cardNumber: string) {
  // Remove spaces and dashes
  const sanitized = cardNumber.replace(/[\s-]/g, "")

  // Check if contains only digits
  if (!/^\d+$/.test(sanitized)) return false

  // Luhn algorithm
  let sum = 0
  let shouldDouble = false

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(sanitized.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

/**
 * Validates a postal/zip code
 * @param code - The postal code to validate
 * @param countryCode - The country code (default: US)
 * @returns Boolean indicating if the postal code is valid
 */
export function isValidPostalCode(code: string, countryCode = "US") {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    IN: /^\d{6}$/,
    // Add more countries as needed
  }

  const pattern = patterns[countryCode] || patterns.US
  return pattern.test(code)
}
