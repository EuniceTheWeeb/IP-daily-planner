let plannerList = []

// MARK: event modal
window.addEventListener("DOMContentLoaded", async function () {
    plannerList = await loadList();
    renderEvents();

    // create new event btn
    let saveEventBtn = document.querySelector("#saveEventBtn");
    saveEventBtn.addEventListener("click", function () {
        let eventName = document.querySelector("#eventName").value;
        let eventDate = document.querySelector("#eventDate").value;
        let eventCat = document.querySelector("#eventCategory").value;
        let eventAddress = document.querySelector("#eventAddress").value;
        let eventNotes = document.querySelector("#eventNotes").value;

        addEvent(plannerList, eventName, eventDate, eventCat, eventAddress, eventNotes);
        saveList(plannerList);
        renderEvents();
        resetModalFields();
        window.location.href = "index.html";
    });
});


// MARK: set up save, del, go to map btns
function attachEventListeners() {

    // Go to map event listener
    const goToMap = document.querySelectorAll(".goToMapBtn");
    goToMap.forEach(function (btn) {
        btn.addEventListener("click", function () {
            window.location.href = "map.html";
        });
    });

    // Save button event listener
    const saveBtns = document.querySelectorAll(".saveBtn");
    saveBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const eventId = parseInt(btn.getAttribute("data-id"));
            const eventCard = btn.closest(".card");

            const newEventName = eventCard.querySelector(".eventName").value;
            const newDate = eventCard.querySelector(".eventDate").innerText;
            const newCategory = eventCard.querySelector(".category").value;
            const newAddress = eventCard.querySelector(".eventAddress").value;
            const newNotes = eventCard.querySelector(".eventNotes").value;

            updateEvent(eventId, newEventName, newDate, newCategory, newAddress, newNotes);
            saveList(plannerList);
            renderEvents();
        });
    });

    // Delete button event listener
    const deleteBtns = document.querySelectorAll(".delBtn");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const eventId = parseInt(btn.getAttribute("data-id"));
            const reallyDelete = confirm("Are you sure you want to delete?");
            if (reallyDelete) {
                deleteEvent(eventId);
                saveList(plannerList);
                renderEvents();
            }
        });
    });
}

document.querySelector("#prevEvents").addEventListener("click", function () {
    date.setMonth(month - 1);
    month = date.getMonth();
    year = date.getFullYear();
    monthName = months[month];
    updateMthYr();
    renderEvents();
});

document.querySelector("#nextEvents").addEventListener("click", function () {
    date.setMonth(month + 1);
    month = date.getMonth();
    year = date.getFullYear();
    monthName = months[month];
    updateMthYr();
    renderEvents();
});