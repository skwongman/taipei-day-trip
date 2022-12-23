import orderData from "./orderData.js";
import displayUsername from "./displayUsername.js";
import directToBookingPage from "../booking/directToBookingPage.js";

// Display username in order page.
displayUsername();

// Get order data.
orderData();

// Check signin status before directing to the booking page.
directToBookingPage();