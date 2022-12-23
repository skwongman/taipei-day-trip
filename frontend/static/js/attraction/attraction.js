import getAttractionData from "./getAttractionData.js";
import directToBookingPage from "../booking/directToBookingPage.js";
import handleAttractionButton from "./attractionButton.js";
import bookingDateSelection from "./bookingDateSelection.js";
import verifyAttractionID from "./verifyAttractionID.js";

// Fetch attraction API data on web initial load.
getAttractionData();

// Check signin status before directing to the booking page.
directToBookingPage();

// Attraction button.
handleAttractionButton();

// Restrict booking input date before today.
bookingDateSelection();

// Input of attraction ID other then numbers is not allowed.
verifyAttractionID();