let date, month, year;
export let forecastDates = [];
date = dayjs().date();
month = dayjs().month() + 1;
year = dayjs().year();
let currentDate = dayjs(`${month}-${date}-${year}`, ["DD", "MMM", "YYYY"]);
for (let i = 0; i < 5; i++) {
    let date = currentDate.add(i, "day");
    forecastDates.push(date.format("YYYY-MM-DD"));
}