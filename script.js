let plannerList = [
    {
        "id": 1,
        "eventName": "HSR 2.7 Livestream",
        "date": "2024-11-22",
        "category": "Leisure",
        "address": "",
        "notes": ""
    },
    {
        "id": 2,
        "eventName": "Xmas dinner",
        "date": "2024-12-19",
        "category": "Leisure",
        "address": "Bugis+, 201 Victoria Street, #04-10 Singapore 188067",
        "notes": ""
    },
    {
        "id": 3,
        "eventName": "Filming for CNY Event",
        "date": "2024-12-16",
        "category": "Work",
        "address": "5 Raffles Place, Raffles Place MRT Station (NS26/EW14), Singapore 048618",
        "notes": "Need to clear camera storage, checklist for what to bring"
    },
]

// MARK: home/this mth pg
window.addEventListener("DOMContentLoaded", function () {
    renderEvents();

    let newEventBtn = document.querySelectorAll(".newEventBtn");

    newEventBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {

            let eventName = document.querySelector("#eventName").value;
            let eventDate = document.querySelector("#newEventDate").value;
            let eventCat = document.querySelector("#newCategory").value;
            let eventAddress = document.querySelector("#newEventAddress").value;
            let eventNotes = document.querySelector("#newEventNotes").value;

            addEvent(plannerList, eventName, eventDate, eventCat, eventAddress, eventNotes);

            // Reset input fields after submission
            document.querySelector("#eventName").value = "";
            document.querySelector("#newEventDate").value = "";
            document.querySelector("#newCategory").value = "";
            document.querySelector("#newEventAddress").value = "";
            document.querySelector("#newEventNotes").value = "";
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
    }
    plannerList.push(newEvent);
    renderEvents(plannerList);
}

// MARK: read
function renderEvents() {
    plannerList.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date); 
    });

    let allEvents = document.querySelector(".allEvents");
    allEvents.innerHTML = "";

    for (let plan of plannerList) {
        const html = `
            <div class="col-8 col-md-4">
                <div class="card">
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
                        <textarea class="form-control eventAddress" rows="3">${plan.address}</textarea>
                        <button type="button" class="btn btn-secondary goToMapBtn">Go to Map</button>

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
        btn.addEventListener("click", function() {
            window.location.href = "map.html";
        });
    });

    // Delete button event listener
    const deleteBtns = document.querySelectorAll(".delBtn");
    deleteBtns.forEach(function (btn) {
        console.log("clicked.") // check functionality, del later
        btn.addEventListener("click", function () {
            const eventId = parseInt(btn.getAttribute("data-id"));
            const reallyDelete = confirm("Are you sure you want to delete?");
            if (reallyDelete) {
                deleteEvent(eventId);
                renderEvents();
            }
        });
    });

    // Save button event listener
    const saveBtns = document.querySelectorAll(".saveBtn");
    saveBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            console.log("clicked.") // check functionality, del later

            const eventId = parseInt(btn.getAttribute("data-id"));
            const eventCard = btn.closest(".card");

            const newEventName = eventCard.querySelector(".eventName").value;
            const newCategory = eventCard.querySelector(".category").value;
            const newAddress = eventCard.querySelector(".eventAddress").value;
            const newNotes = eventCard.querySelector(".eventNotes").value;
            const newDate = eventCard.querySelector(".eventDate").textContent;

            updateEvent(eventId, newEventName, newDate, newCategory, newAddress, newNotes);
            renderEvents();
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

console.log(plannerList)


// MARK: calendar pg









