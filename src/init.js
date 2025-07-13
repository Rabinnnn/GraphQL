import { initializeAuth } from './auth.js';
import { loadProfileData } from './api.js';

// initialize the app when the page is loaded
window.addEventListener("load", () => {
    const token = localStorage.getItem("jwt");
    if (token) { // if the user is logged in don't show the login page, show the profile page
        document.getElementById("login-page").style.display = "none";
        document.getElementById("profile-page").style.display = "block";
        loadProfileData(token);
    }
    initializeAuth();
});