import displayUsername from "./displayUsername.js";
import bookingData from "./bookingData.js";
import deleteBookingData from "./deleteBookingData.js";
import directToBookingPage from "./directToBookingPage.js";
import inputVerification from "./inputVerification.js";
import confirmBookingButton from "./confirmBookingButton.js";
import tapPayCreditCardInput from "./tapPayCreditCardInput.js";

// Display username in booking page.
displayUsername();

// Fetching Booking API Data.
bookingData();

// Delete Booking API.
deleteBookingData();

// Check signin status before directing to the booking page.
directToBookingPage();

// Verify all user inputs.
inputVerification();

// Verify user booking information format before confirmation.
confirmBookingButton();

// Tap Pay Credit Card inputs.
tapPayCreditCardInput();