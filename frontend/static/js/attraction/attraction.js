import getAttractionData from "./getAttractionData.js";
import directToBookingPage from "../booking/directToBookingPage.js";
import handleAttractionButton from "./attractionButton.js";

// Fetch attraction API data on web initial load.
getAttractionData();

// Check signin status before directing to the booking page.
directToBookingPage();

// Attraction Button.
handleAttractionButton();