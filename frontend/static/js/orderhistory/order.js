import orderHistoryDetails from "./orderHistoryDetails.js";
import directToBookingPage from "../booking/directToBookingPage.js";


// Get more order history in details individually.
orderHistoryDetails();

// Check signin status before redirecting to the booking page.
directToBookingPage();