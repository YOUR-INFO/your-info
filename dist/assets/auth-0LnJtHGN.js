import { s as i }
from "./supabase-oO2abd2n.js";
async function l(r, a) { if(! r || ! a) throw new Error("Username and password are required");
if(r.length < 3) throw new Error("Username must be at least 3 characters long");
if(a.length < 6) throw new Error("Password must be at least 6 characters long");
const e = `${r}@your-info.local`,
{ data :o,
error :t } = await i.auth.signUp({ email :e, password :a, options: { data: { username :r } } });
if(t) throw t;
if(o.user) { const { error :n } = await i.from("profiles").insert(
    { id :o.user.id,
    username :r,
    full_name :"",
    title :"",
    bio :"" }
);
if(n) throw n } return o } async function f(r, a) { if(! r || ! a) throw new Error("Username and password are required");
const e = `${r}@your-info.local`,
{ data :o,
error :t } = await i.auth.signInWithPassword({ email :e, password :a });
if(t) throw t;
return o } export { l as a,
f as h };