const winterTimes = [10, 11, 12]
const dayWinterTimes = [0, 1]
const springTimes = [2, 3, 4]
const summerTimes = [5, 6, 7]
const autumnTimes = [8, 9]

export const getSeason = () => {
  const month = new Date().getMonth()
  if (winterTimes.includes(month)) {
    return "winter"
  }
  if (dayWinterTimes.includes(month)) {
    return "dayWinter"
  }
  if (springTimes.includes(month)) {
    return "spring"
  }
  if (summerTimes.includes(month)) {
    return "summer"
  }
  if (autumnTimes.includes(month)) {
    return "autumn"
  }
  return "default"
}
