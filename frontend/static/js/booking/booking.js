import bookingData from "./bookingData.js";
import deleteBookingData from "./deleteBookingData.js";
import directToBookingPage from "./directToBookingPage.js";
import inputVerification from "./inputVerification.js";
import confirmBookingButton from "./confirmBookingButton.js";
import tapPayCreditCardInput from "./tapPayCreditCardInput.js";

// Fetching Booking API Data.
bookingData();

// Delete Booking API.
deleteBookingData();

// Check signin status before redirecting to the booking page.
directToBookingPage();

// Verify all user inputs.
inputVerification();

// Verify user booking information format before confirmation.
confirmBookingButton();

// Tap Pay Credit Card inputs.
tapPayCreditCardInput();