import{a as y,b as g}from"./supabase-oO2abd2n.js";import{u as h,a as E,g as p,d as B}from"./achievements-DaN-Fz_D.js";const I=document.getElementById("hamburger"),b=document.getElementById("navLinks");I.addEventListener("click",()=>{b.classList.toggle("active")});document.getElementById("logoutBtn").addEventListener("click",async()=>{await y()});let c=null,a=null;const l=document.getElementById("achievementModal"),u=document.getElementById("modalTitle"),d=document.getElementById("modalError"),m=document.getElementById("achievementForm");function v(t=null){l.classList.add("active"),d.style.display="none",t?(u.textContent="Edit Achievement",a=t.id,document.getElementById("achievementTitle").value=t.title,document.getElementById("achievementDescription").value=t.description||"",document.getElementById("achievementDate").value=t.date,document.getElementById("achievementCategory").value=t.category||"general"):(u.textContent="Add Achievement",a=null,m.reset(),document.getElementById("achievementDate").value=new Date().toISOString().split("T")[0])}function o(){l.classList.remove("active"),m.reset(),a=null}document.getElementById("addAchievementBtn").addEventListener("click",()=>v());document.getElementById("closeModal").addEventListener("click",o);document.getElementById("cancelBtn").addEventListener("click",o);l.addEventListener("click",t=>{t.target===l&&o()});async function r(){const t=await p(c.id),n=document.getElementById("achievementsList");if(t.length===0){n.innerHTML=`
          <div class="empty-state">
            <h3>No achievements yet</h3>
            <p>Start adding your achievements to showcase your accomplishments!</p>
            <button class="btn btn-primary" style="margin-top: 1rem;" onclick="document.getElementById('addAchievementBtn').click()">Add First Achievement</button>
          </div>
        `;return}n.innerHTML=t.map(e=>{const s=new Date(e.date).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});return`
          <div class="achievement-item">
            <div class="achievement-header">
              <div>
                <div class="achievement-title">${e.title}</div>
                <div class="achievement-date">${s}</div>
              </div>
            </div>
            ${e.description?`<p style="margin: 0.75rem 0; color: var(--text-secondary);">${e.description}</p>`:""}
            <span class="achievement-category">${e.category}</span>
            <div class="achievement-actions">
              <button class="btn btn-outline btn-small edit-btn" data-id="${e.id}">Edit</button>
              <button class="btn btn-danger btn-small delete-btn" data-id="${e.id}">Delete</button>
            </div>
          </div>
        `}).join(""),document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",()=>{const i=t.find(s=>s.id===e.dataset.id);v(i)})}),document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",async()=>{if(confirm("Are you sure you want to delete this achievement?"))try{await B(e.dataset.id),await r()}catch(i){alert("Failed to delete achievement: "+i.message)}})})}m.addEventListener("submit",async t=>{t.preventDefault(),d.style.display="none";const n={title:document.getElementById("achievementTitle").value.trim(),description:document.getElementById("achievementDescription").value.trim(),date:document.getElementById("achievementDate").value,category:document.getElementById("achievementCategory").value};try{a?await h(a,n):await E(c.id,n),o(),await r()}catch(e){d.textContent=e.message||"Failed to save achievement",d.style.display="block"}});(async()=>{if(c=await g(),!c){window.location.href="/login.html";return}await r()})();
