console.log("JavaScript connected");

const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Switch to Dark Mode";
    }

});

const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
weatherButton.addEventListener("click", getWeather);
async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.textContent = "Please enter a city.";
        return;
    }

    weatherResult.textContent = "Loading weather...";

    const apiKey = "7107f5bd3a4ab8c914911f1a6f43c27a";

    const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather. Please try again.";

        console.error(error);
    }
}



const skillButtons = document.querySelectorAll(".skill-btn");
const projectCards = document.querySelectorAll(".projects li");
const showAllSkills = document.getElementById("showAllSkills");

function showAllProjects() {
  projectCards.forEach((project) => {
    project.hidden = false;
    project.classList.remove("skill-match");
  });

  skillButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
}
const noResults = document.getElementById("noResults");
if (noResults) {
  noResults.hidden = true;
}

// Skills heading par click karne se sabhi projects wapas dikhenge
showAllSkills?.addEventListener("click", showAllProjects);

// Kisi skill par click karne se sirf us skill ke projects dikhenge
skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedSkill = button.dataset.skill
      .trim()
      .toLowerCase();

    let found = false;

    projectCards.forEach((project) => {
      const skills = (project.dataset.skills || "")
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const matches = skills.includes(selectedSkill);

      project.hidden = !matches;
      if (matches) found = true;
    });

    skillButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    const noResults = document.getElementById("noResults");
    if (noResults) {
      noResults.hidden = found;
    }

    document.getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  });
});


/* Scroll to top and bottom buttons */
const scrollToTopButton = document.getElementById("scrollToTop");
const scrollToBottomButton = document.getElementById("scrollToBottom");

scrollToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

scrollToBottomButton?.addEventListener("click", () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });
});
