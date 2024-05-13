function dateFormatter(dateText: string) {
  // Parse the date text into a Date object
  const date = new Date(dateText);

  // Get the year, month, and day from the Date object
  const year = date.getFullYear();
  // JavaScript months are zero-based, so we add 1 to get the correct month
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Format the date components as YYYY-MM-DD
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return formattedDate;
}

export default dateFormatter;
