export function validationError(error) {
  if (error?.details) {
    return error?.details[0].message
  } else {
    return 'validation error'
  }
}