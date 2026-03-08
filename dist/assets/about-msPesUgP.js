import { a as t }
from "./supabase-oO2abd2n.js";
const e = document.getElementById("hamburger"),
n = document.getElementById("navLinks");
e.addEventListener("click",() => { n.classList.toggle("active") });
document.getElementById("logoutBtn").addEventListener("click", async() => { await t() });