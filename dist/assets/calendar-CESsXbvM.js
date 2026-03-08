import { s as n }
from "./supabase-oO2abd2n.js";
async function i(t) { const { data :e,
error :a } = await n.from("calendar_events").select("*").eq("user_id", t).order("event_date", { ascending: ! 0 });
if(a) throw a;
return e || [] } async function c(t, e = 7) { const a = new Date,
r = new Date;
r.setDate(a.getDate() + e);
const { data :o,
error :s } = await n.from("calendar_events").select("*").eq("user_id", t).eq("is_completed", ! 1).gte("event_date", a.toISOString()).lte("event_date", r.toISOString()).order("event_date", { ascending: ! 0 });
if(s) throw s;
return o || [] } async function l(t, e) { const { data :a,
error :r } = await n.from("calendar_events").insert(
    { user_id :t,
    title :e.title,
    description :e.description || "",
    event_date :e.event_date,
    remind_before_days :e.remind_before_days || 1,
    color :e.color || "#3B82F6",
    is_completed: ! 1 }
).select().single();
if(r) throw r;
return a } async function f(t, e) { const { data :a,
error :r } = await n.from("calendar_events").update({...e, updated_at :new Date().toISOString() }).eq("id", t).select().single();
if(r) throw r;
return a } async function u(t) { const { error :e } = await n.from("calendar_events").delete().eq("id", t);
if(e) throw e } async function _(t, e) { const { data :a,
error :r } = await n.from("calendar_events").update({ is_completed :e }).eq("id", t).select().single();
if(r) throw r;
return a } export { c as a,
l as b,
u as d,
i as g,
_ as t,
f as u };