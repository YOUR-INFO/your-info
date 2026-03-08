import { a as n }
from "./supabase-oO2abd2n.js";
const c = document.getElementById("hamburger"),
a = document.getElementById("navLinks");
c.addEventListener("click", () => { a.classList.toggle("active") });
document.getElementById("logoutBtn").addEventListener("click", async () => { await n() });
const e = document.getElementById("contactForm"),
t = document.getElementById("successMessage");
e.addEventListener(
    "submit",
    s => { s.preventDefault(),
    t.style.display = "block",
    e.reset(),
    setTimeout(() => { t.style.display = "none" }, 5e3) }
);