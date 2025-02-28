
// Converts first letter to UpperCase and rest to LowerCase
export function formatStrLocation(inputLocation) {
    return inputLocation[0].toUpperCase() + inputLocation.slice(1).toLowerCase();
}


// Formats date '27-05-2025' into '27 May 2025'
export function formatDate(date) {
    let formattedDate = dayjs(date).format("DD MMM YYYY");
    return formattedDate;
}

// Formats time '12:30:54' into '12:30'.
export function formatTime(time) {
    let inputTime = time.split(":");
    let newTime = `${inputTime[0]}:${inputTime[1]}`;
    return newTime;
}

export function setCurrentTime() {
    const dateData = String(dayjs().$d);
    const values = dateData.split(" ");
    const time = formatTime(values[4]);
    document.querySelector(".clock-time").innerText = time;
    document.querySelector(
        ".date"
    ).innerText = `${values[0]}, ${values[2]} ${values[1]} ${values[3]}`;
}