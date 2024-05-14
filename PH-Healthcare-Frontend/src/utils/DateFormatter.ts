function dateFormatter(dateText: string) {
  const date = new Date(dateText);
  // Extract year, month, and day
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month index
  const day = date.getDate().toString().padStart(2, "0");
  // Construct the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default dateFormatter;
