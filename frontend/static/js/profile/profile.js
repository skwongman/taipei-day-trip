import getTotalOrderHistory from "./getTotalOrderHistory.js";
import directToBookingPage from "../booking/directToBookingPage.js";
import handlePrevButton from "./handlePrevButton.js";
import handleEmailChangeButton from "./handleEmailChangeButton.js";
import handleNameChangeButton from "./handleNameChangeButton.js";
import handlePasswordChangeButton from "./handlePasswordChangeButton.js";
import handlePictureChangeButton from "./handlePictureChangeButton.js";
import handleToIndividualPageButton from "./handleToIndividualPageButton.js";
import inputVerification from "./inputVerification.js";


// Get total no. of history orders.
getTotalOrderHistory();

// Handle picture, email, name, password change buttons.
handlePictureChangeButton();
handleEmailChangeButton();
handleNameChangeButton();
handlePasswordChangeButton();

// Handle previous page buttons.
handlePrevButton();

// User input verification.
inputVerification();

// Handle profile page to individual email, name, password, picture pages buttons.
handleToIndividualPageButton();

// Check signin status before redirecting to the booking page.
directToBookingPage();