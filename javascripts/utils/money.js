export function toCents(value) {
  return (Math.round(value)  / 100).toFixed(2) //convert to decimal(fixed to 2 places)
}

export default toCents;