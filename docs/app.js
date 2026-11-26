const T={en:{tag:"Built for the days you slip",add:"Add a habit",addBtn:"Add",phName:"Habit, e.g. Read",phTiny:"Tiny version, e.g. Read one page",addHint:"Give every habit a tiny version (2 minutes or less). It is what you do on a bad day. It still counts.",weekly:"This month, honestly",data:"Your data",privacy:"Everything stays in this browser. No account, no server, no tracking.",exp:"Export",imp:"Import",wipe:"Erase all",foot:"Open source, MIT. Free forever.",
today:"Today",none:"No habits yet. Add one below, and a tiny version of it.",full:"Did it",small:"Tiny version",skip:"Not today",done:"Done. That counts.",tinyd:"Tiny version. That counts too.",skipd:"Rest day logged. No penalty.",
undo:"Change",why:"What got in the way?",r:["Tired","Busy","Forgot","Unwell","Low mood","Plan too big"],
ret1:n=>`Welcome back. "${n}" paused for a bit. That is normal, not failure.`,ret2:"Pick the smallest step you can do right now:",ret3:"Plan was too big? Shrink it.",shrink:"Shrink the habit",
showed:"Days you showed up (last 30)",comebacks:"Comebacks",cbNote:"Times you returned after a miss. This is the skill that matters.",rate:"Return rate",rateNote:"Misses followed by a return within 2 days.",
sureWipe:"Erase all habits on this device?",newTiny:"New tiny version:",del:"Remove",rule:"Rule: never miss twice. One miss is data, not failure.",nrm:"Rest",last14:"Last 14 days",empty:"no entry",cancel:"Cancel",save:"Save",optional:"Optional. It helps spot patterns, not to judge you.",skipAsk:"Skip"},
ar:{tag:"مبني للأيام اللي بتتعثر فيها",add:"أضف عادة",addBtn:"إضافة",phName:"العادة، مثلاً: قراءة",phTiny:"النسخة الصغيرة، مثلاً: اقرأ صفحة واحدة",addHint:"لكل عادة نسخة صغيرة (دقيقتين أو أقل). هي اللي بتعملها في اليوم التقيل، وبتتحسب برضه.",weekly:"الشهر ده بصراحة",data:"بياناتك",privacy:"كل حاجة بتفضل في متصفحك. بدون حساب ولا سيرفر ولا تتبع.",exp:"تصدير",imp:"استيراد",wipe:"مسح الكل",foot:"مفتوح المصدر، رخصة MIT. مجاني دايماً.",
today:"النهاردة",none:"مفيش عادات لسه. أضف واحدة تحت مع نسختها الصغيرة.",full:"عملتها",small:"النسخة الصغيرة",skip:"مش النهاردة",done:"تمام. اتحسبت.",tinyd:"النسخة الصغيرة. اتحسبت برضه.",skipd:"يوم راحة اتسجل. من غير عقاب.",
undo:"تغيير",why:"إيه اللي وقف قدامك؟",r:["تعب","مشغول","نسيت","مريض","مزاج وحش","الخطة كبيرة"],
ret1:n=>`حمد لله على السلامة. "${n}" وقفت شوية. ده عادي مش فشل.`,ret2:"اختار أصغر خطوة تقدر تعملها دلوقتي:",ret3:"الخطة كانت كبيرة؟ صغّرها.",shrink:"صغّر العادة",
showed:"الأيام اللي ظهرت فيها (آخر 30)",comebacks:"مرات الرجوع",cbNote:"كام مرة رجعت بعد تعثر. دي المهارة المهمة.",rate:"معدل الرجوع",rateNote:"تعثر اتبعه رجوع في خلال يومين.",
sureWipe:"تمسح كل العادات من الجهاز؟",newTiny:"النسخة الصغيرة الجديدة:",del:"حذف",rule:"القاعدة: ماتفوتش مرتين ورا بعض. مرة واحدة معلومة مش فشل.",nrm:"راحة",last14:"آخر 14 يوم",empty:"بدون تسجيل",cancel:"إلغاء",save:"حفظ",optional:"اختياري. بيساعد نلاحظ الأنماط، مش نحاسبك.",skipAsk:"تخطي"}};
function sheet(html,after){let d=$("#sheet");d.innerHTML=`<form method="dialog" class="sh">${html}</form>`;if(!d.open)d.showModal();d.querySelectorAll("[data-close]").forEach(b=>b.onclick=e=>{e.preventDefault();closeSheet()});after&&after()}
function closeSheet(){const d=$("#sheet");if(d.open)d.close()}
function askWhy(h){const L=t();sheet(`<h2>${L.why}</h2><p class="hint">${L.optional}</p><div class="chips">${L.r.map((x,i)=>`<button type="button" class="chip" data-w="${i}">${x}</button>`).join("")}</div><div class="row"><button class="ghost" data-close>${L.skipAsk}</button></div>`,()=>{document.querySelectorAll("[data-w]").forEach(c=>c.onclick=()=>{h.log[day()].why=c.dataset.w;closeSheet();render()})})}
function askTiny(h){const L=t();sheet(`<h2>${L.shrink}</h2><label for="nt">${L.newTiny}</label><input id="nt" maxlength="60" value="${esc(h.tiny)}"><div class="row"><button class="primary" id="ok">${L.save}</button><button class="ghost" data-close>${L.cancel}</button></div>`,()=>{$("#nt").focus();$("#ok").onclick=e=>{e.preventDefault();const v=$("#nt").value.trim();if(v)h.tiny=v.slice(0,60);closeSheet();render()}})}
const cnt=(h,k)=>{let n=0;for(let i=0;i<14;i++){const x=h.log[ago(i)];if(x&&x.s==k)n++}return n};
const nonEmpty=h=>cnt(h,"done")+cnt(h,"tiny")+cnt(h,"skip");
const say=m=>{const e=$("#live");e.textContent="";setTimeout(()=>e.textContent=m,30)};
const KEY="awda.v1";let S=JSON.parse(localStorage.getItem(KEY)||'null')||{lang:(navigator.language||"").startsWith("ar")?"ar":"en",habits:[]};
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
const $=s=>document.querySelector(s);const t=()=>T[S.lang];
const day=(d=new Date())=>{const x=new Date(d);return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0")};
const ago=n=>{const d=new Date();d.setDate(d.getDate()-n);return day(d)};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function setLang(){document.documentElement.lang=S.lang;document.documentElement.dir=S.lang=="ar"?"rtl":"ltr";$("#lang").textContent=S.lang=="ar"?"English":"العربية";
document.querySelectorAll("[data-i]").forEach(e=>e.textContent=t()[e.dataset.i]);document.querySelectorAll("[data-ph]").forEach(e=>e.placeholder=t()[e.dataset.ph])}
// log: h.log[date]={s:'done'|'tiny'|'skip',why?}
function missedRun(h){ // consecutive past days with no done/tiny, ending yesterday, only after habit created
 let n=0;for(let i=1;i<60;i++){const d=ago(i);if(d<h.created)break;const e=h.log[d];if(e&&e.s!="skip"&&e.s!="none"&&(e.s=="done"||e.s=="tiny"))break;n++}return n}
function stats(h){const days=[];for(let i=29;i>=0;i--)days.push(ago(i));
 const hit=d=>h.log[d]&&(h.log[d].s=="done"||h.log[d].s=="tiny");
 const showed=days.filter(hit).length;let misses=0,back=0;
 for(let i=29;i>=1;i--){const d=ago(i);if(d<h.created)continue;const prevHit=hit(ago(i+1))||ago(i+1)<h.created;if(!hit(d)&&prevHit){misses++;if(hit(ago(i-1))||(i>1&&hit(ago(i-2))))back++}}
 return{showed,misses,back}}
function render(){setLang();const L=t();const today=day();const el=$("#today");
 el.className="card";el.innerHTML=`<h2>${L.today}</h2><p class="hint">${L.rule}</p>`+(S.habits.length?"":`<p>${L.none}</p>`);
 const ret=[];
 S.habits.forEach((h,idx)=>{const e=h.log[today];const run=missedRun(h);if(!e&&run>=1)ret.push({h,idx,run});
  let dots="";for(let i=13;i>=0;i--){const d=ago(i);const x=h.log[d];dots+=`<span class="dot ${x?x.s:""}" title="${d}"></span>`}
  const st=e?`<div class="status">${e.s=="done"?L.done:e.s=="tiny"?L.tinyd:L.skipd} <button class="x" data-undo="${idx}" aria-label="${L.undo}" title="${L.undo}">↺</button></div>`:
  `<div class="acts"><button class="b-done" data-a="done" data-i2="${idx}">${L.full}</button><button class="b-tiny" data-a="tiny" data-i2="${idx}">${L.small}</button><button class="b-skip" data-a="skip" data-i2="${idx}">${L.skip}</button></div>`;
  el.insertAdjacentHTML("beforeend",`<div class="habit"><div class="top"><div><h3>${esc(h.name)}</h3><div class="tiny">${L.small}: ${esc(h.tiny)}</div></div><button class="x" data-del="${idx}" aria-label="${L.del}: ${esc(h.name)}" title="${L.del}">×</button></div>${st}<div class="dots" role="img" aria-label="${L.last14}: ${14-nonEmpty(h)} ${L.empty}, ${cnt(h,"done")} ${L.full}, ${cnt(h,"tiny")} ${L.small}">${dots}</div></div>`)});
 const r=$("#return");if(ret.length){const {h,idx,run}=ret.sort((a,b)=>b.run-a.run)[0];r.hidden=false;
  r.innerHTML=`<h2>${L.ret1(esc(h.name))}</h2><p>${L.ret2}</p><div class="acts"><button class="b-tiny" data-a="tiny" data-i2="${idx}">${esc(h.tiny)}</button></div><p class="hint">${L.ret3}</p><div class="row"><button class="ghost" data-shrink="${idx}">${L.shrink}</button></div>`}else r.hidden=true;
 const sb=$("#stats");sb.innerHTML=S.habits.length?S.habits.map(h=>{const s=stats(h);const rate=s.misses?Math.round(100*s.back/s.misses)+"%":"–";
  return `<div class="stat"><div><b>${esc(h.name)}</b><div class="hint">${L.showed}</div></div><span class="big">${s.showed}</span></div><div class="stat"><div>${L.comebacks}<div class="hint">${L.cbNote}</div></div><span class="big">${s.back}</span></div><div class="stat"><div>${L.rate}<div class="hint">${L.rateNote}</div></div><span class="big">${rate}</span></div>`}).join(""):`<p class="hint">${L.none}</p>`;
 save()}
document.addEventListener("click",ev=>{const b=ev.target.closest("button");if(!b)return;const L=t();
 if(b.dataset.a){const h=S.habits[b.dataset.i2];h.log[day()]={s:b.dataset.a};if(b.dataset.a=="skip"){render();askWhy(h)}else{render();say(b.dataset.a=="done"?L.done:L.tinyd)}}
 else if(b.dataset.undo){delete S.habits[b.dataset.undo].log[day()];render()}
 else if(b.dataset.del){const i=b.dataset.del;sheet(`<h2>${esc(S.habits[i].name)}</h2><p>${L.del}?</p><div class="row"><button class="danger-b" id="ok">${L.del}</button><button class="ghost" data-close>${L.cancel}</button></div>`,()=>{$("#ok").onclick=()=>{S.habits.splice(i,1);closeSheet();render()}})}
 else if(b.dataset.shrink){const h=S.habits[b.dataset.shrink];askTiny(h)}});
$("#lang").onclick=()=>{S.lang=S.lang=="ar"?"en":"ar";render()};
$("#form").onsubmit=e=>{e.preventDefault();const n=$("#name").value.trim();if(!n)return;S.habits.push({name:n,tiny:$("#tiny").value.trim()||n+" (2 min)",created:day(),log:{}});e.target.reset();render()};
$("#exp").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:"application/json"}));a.download="awda-backup.json";a.click()};
$("#imp").onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(x=>{try{const d=JSON.parse(x);if(Array.isArray(d.habits)){S=d;render()}}catch(_){}})};
$("#wipe").onclick=()=>{if(confirm(t().sureWipe)){S.habits=[];render()}};
if(typeof module!="undefined")module.exports={stats,missedRun};
render();
