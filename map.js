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
    const eventCard = btn.closest('.card');
    const addressInput = eventCard.querySelector('.eventAddress');

    toggleGoToMapButton(addressInput, btn);

    addressInput.addEventListener('input', function () {
      toggleGoToMapButton(addressInput, btn);
    });

    btn.addEventListener('click', function () {
      const address = addressInput.value;

      if (address.trim() !== "") {
        geocodeAndAddMarker(address);
      } else {
        alert("Please enter a valid address.");
      }
    });
  });

  function toggleGoToMapButton(addressInput, btn) {
    const address = addressInput.value.trim();
    if (address === "" || !isValidAddress(address)) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  }

  function isValidAddress(address) {
    return address.length > 10;
  }

  // Geocoding function (example using Nominatim)
  async function geocodeAndAddMarker(address) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();

      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const marker = L.marker([lat, lon]).addTo(map)
          .bindPopup(`<b>${address}</b>`)
          .openPopup();

        map.setView([lat, lon], 13);
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error("Error geocoding the address:", error);
      alert("There was an error geocoding the address.");
    }
  }

});