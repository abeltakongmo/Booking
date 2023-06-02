export const isEmptyObject = (value) => {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

export const setAvailabilityMonths = (nberOfMonths, date = new Date())=>{
  date.setMonth(date.getMonth() + nberOfMonths);
  return date;
}