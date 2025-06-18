let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// format city name (capitalize first letter and trim spaces)
function formatCityName(city) {
  return city
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// get user's current city
function getCurrentCity() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          const currentCity = document.querySelector(".current-city");
          currentCity.textContent = formatCityName(data.city);
        } catch (error) {
          console.error("Error getting city:", error);
          // default city if there's an error
          const currentCity = document.querySelector(".current-city");
          currentCity.textContent = "Paris";
        }
      },
      function (error) {
        console.error("Error getting location:", error);
        // default city if user denies location
        const currentCity = document.querySelector(".current-city");
        currentCity.textContent = "Paris";
      }
    );
  } else {
    // default city if location is not supported
    const currentCity = document.querySelector(".current-city");
    currentCity.textContent = "Paris";
  }
}
// current city when page loads
getCurrentCity();

// update date and time immediately and then every minute
function updateDateTime() {
  const now = new Date();
  const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  const dateTimeString = now.toLocaleDateString("en-US", options);
  document.getElementById("current-date-time").textContent = dateTimeString;
}

// update date and time immediately and then every minute
updateDateTime();
setInterval(updateDateTime, 60000);

// search functionality
document
  .getElementById("search-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const currentCity = document.querySelector(".current-city");

    if (searchInput.value.trim() !== "") {
      currentCity.textContent = formatCityName(searchInput.value);
    }
  });
