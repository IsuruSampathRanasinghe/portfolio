export const formatMonthYear = (date) => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};