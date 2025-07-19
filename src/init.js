import { initializeAuth } from './auth.js';
import { loadProfileData } from './api.js';
import { initializeNavigation } from './navigation.js';

// initialize the app when the page is loaded
window.addEventListener("load", () => {
    const token = localStorage.getItem("jwt");
    if (token) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("profile-page").style.display = "block";
        loadProfileData(token);
        initializeNavigation();
    }
    initializeAuth();
});
