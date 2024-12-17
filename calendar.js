document.addEventListener("DOMContentLoaded", async function () {
    // load events into calendar
    plannerList = await loadList();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let monthName = months[month];

    // Update calendar based on mth & yr 
    function updateCalendar() {
        document.querySelector(".monthYear").innerHTML = monthName + " " + year;

        // Get the first and last date of the month
        let firstDate = new Date(year, month, 1);
        let lastDate = new Date(year, month + 1, 0);
        let totalDays = lastDate.getDate();
        let startDay = firstDate.getDay();

        // Clear calendar body
        const calendar = document.querySelector("#calendarBody");
        calendar.innerHTML = "";

        // Add empty cells for the days before the first day of the month
        let oneWeek = document.createElement("tr");
        for (let i = 0; i < startDay; i++) {
            oneWeek.appendChild(document.createElement('td'));
        }

        // Loop through all the days and add to calendar table
        for (let d = 1; d <= totalDays; d++) {
            let oneDay = document.createElement('td');
            oneDay.textContent = d;
            oneWeek.appendChild(oneDay);

            // Add events and tooltips for days with events
            addEventAndTooltip(oneDay, d, month, year);

            // Once the week is filled, create a new row
            if (oneWeek.children.length === 7) {
                calendar.appendChild(oneWeek);
                oneWeek = document.createElement("tr");
            }
        }

        // Any leftover days, append to the final week
        if (oneWeek.children.length > 0) {
            calendar.appendChild(oneWeek);
        }
    }
    updateCalendar();

    // MARK: Prev & next mth
    // retrieve data from today's date, assign to variables & updates using the btn
    document.querySelector("#prev").addEventListener("click", function () {
        date.setMonth(month - 1);
        month = date.getMonth();
        year = date.getFullYear();
        monthName = months[month];
        updateCalendar();
    });

    document.querySelector("#next").addEventListener("click", function () {
        date.setMonth(month + 1);
        month = date.getMonth();
        year = date.getFullYear();
        monthName = months[month];
        updateCalendar();
    });

    // MARK: Add events & tooltips to calendar
    function addEventAndTooltip(dayTd, day, month, year) {
        const eventForDay = getEventForDay(day, month, year);
        if (eventForDay) {
            dayTd.classList.add("event-day");

            let tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");
            tooltip.textContent = eventForDay.eventName;
            dayTd.appendChild(tooltip);
        }
    }

    // Get events of that day
    function getEventForDay(day, month, year) {
        return plannerList.find(function (event) {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
        });
    }
});

document.querySelector("#thisMthEvents").addEventListener ("click", function() {
    window.location.href = "index.html";
})