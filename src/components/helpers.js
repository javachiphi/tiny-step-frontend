

export function getDate(createdDate) {
    const entryDate = new Date(createdDate);
    if (isNaN(entryDate)) {
      return "Invalid Date";
    }
  
    const date = entryDate.getDate();
    const options = { month: "short" };
    const year = entryDate.getFullYear();
    const formattedMonth = new Intl.DateTimeFormat("en-US", options).format(entryDate);
  
    return formattedMonth.concat(` ${date}, ${year}`);
  }
  