import { a as l,
b as g }
from "./supabase-oO2abd2n.js";
import { g as u }
from "./profile-hYbPYlVC.js";
import { g as p }
from "./achievements-DaN-Fz_D.js";
import { g as v,
a as h }
from "./calendar-CESsXbvM.js";
const y = document.getElementById("hamburger"),
f = document.getElementById("navLinks");
y.addEventListener("click", () => { f.classList.toggle("active") });
document.getElementById("logoutBtn").addEventListener("click", async () => { await l() });
(
    async () => { const t = await g();
if (! t) { window.location.href = "/login.html";
return } const n = await u(t.id);
if (n) { const e = n.full_name || n.username;
document.getElementById("userName").textContent = e } const i = await p(t.id);
document.getElementById("achievementCount").textContent = i.length;
const m = (await v(t.id)).filter(e => ! e.is_completed);
document.getElementById("eventCount").textContent = m.length;
const a = await h(t.id, 7),
r = document.getElementById("upcomingEvents");
a.length == 0 ? r.innerHTML = '<div class="empty-state"><p>No upcoming events</p></div>': r.innerHTML = a.map(
    e => { const o = new Date(e.event_date).toLocaleDateString(
        "en-US",
        { month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit" }
    );
return `
            <div class="upcoming-event" style="border-left-color: ${e.color};">
              <h4>${e.title}</h4>
              <p>${o}</p>
              ${e.description ? ` < p style = "margin-top: 0.25rem;" > $ { e.description } < / p > ` : ""}
            </div>
          ` }
).join("");
const s = document.getElementById("recentAchievements"),
c = i.slice(0, 3);
c.length == 0 ? s.innerHTML = '<div class="empty-state"><p>No achievements yet</p></div>': s.innerHTML = c.map(
    e => { const o = new Date(e.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
return `
            <div style="padding: 0.75rem; background-color: var(--background); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
              <h4 style="color: var(--text-primary); margin-bottom: 0.25rem;">${e.title}</h4>
              <p style="font-size: 0.875rem; color: var(--text-secondary);">${o}</p>
            </div>
          ` }
).join("") }
)();