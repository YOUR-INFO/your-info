import "./supabase-oO2abd2n.js";
import { h as r } from "./auth-0LnJtHGN.js";

const form = document.getElementById("loginForm");
const error = document.getElementById("errorMessage");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    error.style.display = "none";

    try {

        await r(username, password);

        window.location.href = "dashboard.html";

    } catch (err) {

        error.textContent = err.message || "Login failed. Please check your credentials.";
        error.style.display = "block";

    }

});