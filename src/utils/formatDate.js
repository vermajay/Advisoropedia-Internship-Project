export default function formatDate(inputDate) {  //this function formats the date and returns a readable format
    // Parse the input date string
    const date = new Date(inputDate);

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}