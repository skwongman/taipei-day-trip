import registerSigninMenu from "./registerSigninMenu.js";
import inputVerification from "./inputVerification.js";
import signupSystem from "./signup.js";
import signinSystem from "./signin.js";
import signoutSystem from "./signout.js";
import checkSigninStatus from "./checkSigninStatus.js";

// Member register and Signin menu.
registerSigninMenu();

// Member register and signin input verification.
inputVerification();

// Member signup.
signupSystem();

// Member signin.
signinSystem();

// Member signout.
signoutSystem();

// Check current signin status.
checkSigninStatus();