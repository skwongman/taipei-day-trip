import registerSigninMenu from "./registerSigninMenu.js";
import inputVerification from "./verification.js";
import signupSystem from "./signup.js";
import signinSystem from "./signin.js";
import signoutSystem from "./signout.js";
import checkSigninStatus from "./checkSigninStatus.js";

// Member register and Signin menu.
registerSigninMenu();

// Member register and signin input verification.
inputVerification();

// Member signup.
signupSystem(inputVerification);

// Member signin.
signinSystem(inputVerification);

// Member signout.
signoutSystem();

// Check current signin status.
checkSigninStatus();