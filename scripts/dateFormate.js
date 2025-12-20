export function dateFormate(dateString) {
  const date = new Date(dateString);
  
  // Month names short
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  
  // Format time
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours.toString().padStart(2, '0') : '12';
  
  return `${day} ${month} ${year} - ${hours}:${minutes} ${ampm}`;
}
