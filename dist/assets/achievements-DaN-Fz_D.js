import { s as i }
from "./supabase-oO2abd2n.js";
async function s(t) { const { data :e,
error :a } = await i.from("achievements").select("*").eq("user_id", t).order("date", { ascending: ! 1 });
if(a) throw a;
return e || [] } async function o(t, e) { const { data :a,
error :r } = await i.from("achievements").insert(
    { user_id :t,
    title :e.title,
    description :e.description,
    date :e.date,
    category :e.category || "general",
    image_url :e.image_url || "" }
).select().single();
if(r) throw r;
return a } async function c(t, e) { const { data :a,
error :r } = await i.from("achievements").update({...e, updated_at :new Date().toISOString() }).eq("id", t).select().single();
if(r) throw r;
return a } async function d(t) { const { error :e } = await i.from("achievements").delete().eq("id", t);
if(e) throw e } export { o as a,
d,
s as g,
c as u };