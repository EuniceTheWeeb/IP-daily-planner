const JSON_BIN_BASE_URL="https://api.jsonbin.io/v3";
const JSON_BIN_ID = "675b4caee41b4d34e4646c0a";   

async function loadList() {
  const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`);
  return response.data.record;
}

async function saveList(plannerList) {
  const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, plannerList)
  console.log(response.data)
}

let plannerList = []

function resetModalFields() {
    document.querySelector("#eventName").value = "";
    document.querySelector("#newEventDate").value = "";
    document.querySelector("#newCategory").value = "";
    document.querySelector("#newEventAddress").value = "";
    document.querySelector("#newEventNotes").value = "";
}

// MARK: home pg
window.addEventListener("DOMContentLoaded", async function () {
    plannerList = await loadList()
    renderEvents();
    updateCalendar();

    let newEventBtn = document.querySelectorAll(".newEventBtn");
    newEventBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let eventName = document.querySelector("#eventName").value;
            let eventDate = document.querySelector("#newEventDate").value;
            let eventCat = document.querySelector("#newCategory").value;
            let eventAddress = document.querySelector("#newEventAddress").value;
            let eventNotes = document.querySelector("#newEventNotes").value;

            addEvent(plannerList, eventName, eventDate, eventCat, eventAddress, eventNotes);

            resetModalFields();

            const modal = bootstrap.Modal.getInstance(document.querySelector("#eventModal"));
            modal.hide();

            saveList (plannerList);
            renderEvents();
        });
    });
});

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
}

// MARK: read
function renderEvents() {
    plannerList.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    let allEvents = document.querySelector(".allEvents");
    allEvents.innerHTML = "";
    const todayDate = new Date().toISOString().split("T")[0];

    for (let plan of plannerList) {
        const isPastEvent = new Date(plan.date) < new Date(todayDate);

        const html = `
            <div class="col-10 col-md-8 col-lg-4">
                <div class="card ${isPastEvent ? "finished-event" : ""}">
                    <div class="card-header headerInfo d-flex justify-content-center">
                        <h3 class="eventDate">${plan.date}</h3>
                        <button type="button" class="btn btn-danger delBtn" data-id="${plan.id}">Delete</button>
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

                    <div class="card-footer">
                        <button type="button" class="btn btn-secondary saveBtn" data-id="${plan.id}">Save</button>
                    </div>
                </div>
            </div>
        `;
        allEvents.innerHTML += html;
    }
    attachEventListeners();
}

// MARK: set up save, del, go to map btns
function attachEventListeners() {

    // Go to map event listener
    const goToMapBtns = document.querySelectorAll(".goToMapBtn");
    goToMapBtns.forEach(function (btn) {
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
            saveList (plannerList);
            renderEvents();
            alert("Event updated.");
        });
    });

    // Delete button event listener
    const deleteBtns = document.querySelectorAll(".delBtn");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const eventId = parseInt(btn.getAttribute("data-id"));
            const reallyDelete = confirm("Are you sure you want to delete?");
            if (reallyDelete) {
                deleteEvent(plannerList, eventId);
                saveList (plannerList);
                renderEvents();
                alert("Event deleted.")
            }
        });
    });
}

// MARK: Update
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
    }
}

// MARK: Delete
function deleteEvent(id) {
    const indexToDel = plannerList.findIndex(function (event) {
        return event.id === id;
    });

    if (indexToDel > -1) {
        plannerList.splice(indexToDel, 1);
    }
}
