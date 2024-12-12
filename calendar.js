document.addEventListener("DOMContentLoaded", function renderCalendar() {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = new Date();

    function updateCalendar() {
        // getDate()	Returns the day of the month (from 1-31)
        let month = date.getMonth(); // getMonth()	Returns the month (from 0-11)
        let year = date.getFullYear(); // getFullYear()	Returns the year
        let monthName = months[month];

        document.querySelector(".monthYear").innerHTML = `${monthName} ${year}`;

        // Get the first and last date of the month
        let firstDate = new Date(year, month, 1); // 1 is 1st day of mth
        let lastDate = new Date(year, month + 1, 0); // mth + 1: going to next mth, 0 is prev mth's last day
        let totalDays = lastDate.getDate();
        let startDay = firstDate.getDay();

        // Clear calendar body
        const calendar = document.querySelector("#calendarBody");
        calendar.innerHTML = "";


        // Add empty cells for the days before the first day of the month
        let oneWeek = document.createElement("tr");
        for (let i = 0; i < startDay; i++) {
            oneWeek.appendChild(document.createElement('td'));
        };

        // Loop through all the days and add to calendar table
        for (let d = 1; d <= totalDays; d++) {
            let oneDay = document.createElement('td');
            oneDay.textContent = d;
            oneWeek.appendChild(oneDay);

            // once the whole week is filled, create a new tr
            if (oneWeek.children.length === 7) {
                calendar.appendChild(oneWeek);
                oneWeek = document.createElement("tr");
            };
        };

        // Any leftover days, append to the final week
        if (oneWeek.children.length > 0) {
            calendar.appendChild(oneWeek);
        }
    }

    updateCalendar();

    // go to prev & next mths
    document.querySelector(".prev").addEventListener("click", function () {
        date.setMonth(date.getMonth() - 1);
        updateCalendar();
    });
    
    document.querySelector(".next").addEventListener("click", function () {
        date.setMonth(date.getMonth() + 1);
        updateCalendar();
    });    

});