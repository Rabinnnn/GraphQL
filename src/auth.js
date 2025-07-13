import { SIGNIN_ENDPOINT } from './config.js';
import { loadProfileData } from './api.js';

// initializeAuth is a function that handles the login form submission 
// and logout button click events.
export function initializeAuth() {
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const identifier = document.getElementById("identifier").value.trim();
        const password = document.getElementById("password").value;
        const loginErrorDiv = document.getElementById("login-error");
        loginErrorDiv.textContent = "";

        try {
            const authString = btoa(identifier + ":" + password); //encode username:password to base64
            const response = await fetch(SIGNIN_ENDPOINT, {
                method: "POST",
                headers: {
                    Authorization: "Basic " + authString,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Invalid login credentials");
            
            const token = await response.json();
            if (!token) throw new Error("No token received");

            localStorage.setItem("jwt", token); //store token in local storage
            const payload = JSON.parse(atob(token.split(".")[1])); 
            localStorage.setItem("userId", payload.sub); // extract user ID

            document.getElementById("login-page").style.display = "none";
            document.getElementById("profile-page").style.display = "block";
            loadProfileData(token);
        } catch (error) {
            loginErrorDiv.textContent = error.message;
            console.error("Login error:", error);
        }
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        document.getElementById("login-page").style.display = "block";
        document.getElementById("profile-page").style.display = "none";
    });
}