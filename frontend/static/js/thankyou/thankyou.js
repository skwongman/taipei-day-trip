import orderData from "./orderData.js";
import directToBookingPage from "../booking/directToBookingPage.js";


// Get order data.
orderData();

// Check signin status before redirecting to the booking page.
directToBookingPage();