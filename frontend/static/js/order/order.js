import orderHistory from "./orderHistory.js";
import directToBookingPage from "../booking/directToBookingPage.js";


// Get order history data.
orderHistory();

// Check signin status before redirecting to the booking page.
directToBookingPage();