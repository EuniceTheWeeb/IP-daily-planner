document.addEventListener("DOMContentLoaded", function () {

    let map = L.map('map').setView([1.29, 103.85], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker([1.3851, 103.7449]);
    marker.addTo(map);

    marker.addEventListener("click", function () {
        console.log("Clicked Lot 1");
    })

    marker.bindPopup(`<h1>${plan.date}</h1>
    <h2>${plan.eventName}</h2>
`);



    // Function to geocode the address and add a marker
    document.querySelectorAll('.goToMapBtn').forEach(function (btn) {
        if (document.querySelectorAll('.eventAddress').value.length < 10) {
            btn.classList.add("disabled");
        }
    })
});

