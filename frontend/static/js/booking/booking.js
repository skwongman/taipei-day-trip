import displayUsername from "./displayUsername.js";
import bookingData from "./bookingData.js";
import deleteBookingData from "./deleteBookingData.js";
import directToBookingPage from "./directToBookingPage.js";
import creditCardFormat from "./creditCardFormat.js";
import inputVerification from "./inputVerification.js";
import confirmBookingButton from "./confirmBookingButton.js";

// Display username in booking page.
displayUsername();

// Fetching Booking API Data.
bookingData();

// Delete Booking API.
deleteBookingData();

// Check signin status before directing to the booking page.
directToBookingPage();

// Align credit card number input format (e.g. **** **** **** ****).
creditCardFormat("creditCardNum", " ", 4, 16);

// Align credit card expiry date input format (e.g. MM/YY).
creditCardFormat("creditCardDate", "/", 2, 5);

// Verify all user inputs.
inputVerification();

// Verify user booking information format before confirmation.
confirmBookingButton(inputVerification);