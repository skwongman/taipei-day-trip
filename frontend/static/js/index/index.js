import directToBookingPage from "../booking/directToBookingPage.js";
import getCatData from "./getCatData.js";
import categoryPopUpMenu from "./categoryPopUpMenu.js";
import getData from "./getData.js";

// Get attraction data.
getData();

// Fetch category API data on web initial load. 
getCatData();

// Category Pop-up menu.
categoryPopUpMenu();

// Check signin status before redirecting to the booking page.
directToBookingPage();