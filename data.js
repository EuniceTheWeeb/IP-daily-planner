const JSON_BIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSON_BIN_ID = "676192c8ad19ca34f8dcb5fd";

async function loadList() {
    const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`);
    return response.data.record;
}

async function saveList(plannerList) {
    const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, plannerList)
    console.log(response.data)
}

// clear event modal fields
function resetModalFields() {
    document.querySelector("#newEventName").value = "";
    document.querySelector("#newEventDate").value = "";
    document.querySelector("#newEventCategory").value = "";
    document.querySelector("#newEventAddress").value = "";
    document.querySelector("#newEventNotes").value = "";
}

// MARK: Alert popup function
function hideAllAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function (alert) {
        alert.style.display = 'none';
    });
}

function showAlert(type) {
    const alertModal = document.querySelector("#alertModal");
    const alertMessage = document.querySelector("#alertMessage");

    // Set the message based on the type of action
    if (type === "created") {
        alertMessage.textContent = "Event created!";
    } else if (type === "updated") {
        alertMessage.textContent = "Event updated!";
    } else if (type === "deleted") {
        alertMessage.textContent = "Event deleted!";
    }
    alertModal.style.display = "block";

    setTimeout(function () {
        hideAlerts();
    }, 2000);
}

function hideAlerts() {
    const alertModal = document.querySelector("#alertModal");
    alertModal.style.display = "none";
}

// MARK: create
function addEvent(plannerList, eventName, eventDate, eventCat, eventAddress, eventNotes) {
    let newEvent = {
        "id": Math.floor((Math.random() * 10000) + 1),
        "eventName": eventName,
        "date": eventDate,
        "category": eventCat,
        "address": eventAddress,
        "notes": eventNotes
    };
    console.log("New Event Added:", newEvent);
    plannerList.push(newEvent);
    showAlert("created");
}

// MARK: read
function renderEvents() {

    // Filter events for the current month and year
    let filterEvents = plannerList.filter(function (plan) {
        const eventDate = new Date(plan.date);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // Sort events by date (earliest to latest)
    filterEvents.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    // Display events
    let allEvents = document.querySelector(".allEvents");
    allEvents.innerHTML = "";

    // Render each event as a card
    for (let plan of filterEvents) {
        const todayDate = new Date().toISOString().split("T")[0];
        const isPastEvent = new Date(plan.date) < new Date(todayDate);

        const html = `
            <div class="col-10 col-md-8 col-lg-6">
                <div class="card ${isPastEvent ? "finished-event" : ""}">
                    <div class="card-header headerInfo d-flex justify-content-center">
                        <input type="date" class="eventDate" value="${plan.date}">
                    </div>
                    <div class="card-body">
                        <label>Name</label>
                        <textarea class="form-control eventName" rows="1">${plan.eventName}</textarea>
                        <label>Category</label>
                        <select name="category" class="category form-control">
                            <option value="Appointment" ${plan.category === "Appointment" ? "selected" : ""}>Appointment</option>
                            <option value="Leisure" ${plan.category === "Leisure" ? "selected" : ""}>Leisure</option>
                            <option value="Work" ${plan.category === "Work" ? "selected" : ""}>Work</option>
                            <option value="School" ${plan.category === "School" ? "selected" : ""}>School</option>
                            <option value="Misc" ${plan.category === "Misc" ? "selected" : ""}>Misc</option>
                        </select>
                        <label>Address</label>
                        <textarea class="form-control eventAddress" rows="2">${plan.address}</textarea>
                        <button type="button" class="btn btn-secondary goToMapBtn">Go to Map</button><br>
                        <label>Notes</label>
                        <textarea class="form-control eventNotes" rows="3">${plan.notes}</textarea>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-danger delBtn" data-id="${plan.id}">Delete</button>
                        <button type="button" class="btn btn-secondary saveBtn ms-auto" data-id="${plan.id}">Save</button>
                    </div>
                </div>
            </div>
        `;
        allEvents.innerHTML += html;
    }
    attachEventListeners();
}

// MARK: Update function
function updateEvent(id, newEventName, newDate, newCategory, newAddress, newNotes) {
    const modifiedEvent = {
        "id": id,
        "eventName": newEventName,
        "date": newDate,
        "category": newCategory,
        "address": newAddress,
        "notes": newNotes
    };

    const indexToReplace = plannerList.findIndex(function (event) {
        return event.id === id;
    });

    if (indexToReplace > -1) {
        plannerList[indexToReplace] = modifiedEvent;
        showAlert("updated");
    }
}

// MARK: Delete function
function deleteEvent(id) {
    const indexToDel = plannerList.findIndex(function (event) {
        return event.id === id;
    });

    if (indexToDel > -1) {
        plannerList.splice(indexToDel, 1);
        showAlert("deleted");
    }
}

// MARK: prev & next month's plans
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let monthName = months[month];

function updateMthYr() {
    document.querySelector(".monthYear").innerHTML = monthName + " " + year;
}
updateMthYr();