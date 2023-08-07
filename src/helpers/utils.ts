export const extractDates = (content: string) => {
  const dateRegex = /(\d{1,2}[./\-]\d{1,2}[./\-]\d{2,4})/g;
  const dates = content.match(dateRegex);

  if (dates) {
    return dates;
  }
};

export function formattedDate(str: string) {
  const date = new Date(str);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
