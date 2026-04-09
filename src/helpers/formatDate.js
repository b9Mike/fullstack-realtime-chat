export const formatDate = (messageDate) => {
    const date = new Date(messageDate);

    let hour = date.getHours();
    let minutes = date.getMinutes();

    let time = hour + ':' + minutes;

    const options = {
        month: 'long',
        day: 'numeric'
    }

    const newDate = date.toLocaleDateString('en-US', options);

    return newDate + ' - ' + time;
}