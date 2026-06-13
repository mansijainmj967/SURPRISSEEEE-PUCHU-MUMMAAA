// ASTRA — Shared App JS

function toggleSidebar(){
  document.getElementById('sidebar')?.classList.toggle('collapsed');
}

function animateBars(){
  document.querySelectorAll('.pb-fill[data-w]').forEach(el=>{
    const w=el.dataset.w;
    requestAnimationFrame(()=>{el.style.transition='width 1.2s ease';el.style.width=w;});
  });
}
window.addEventListener('load',animateBars);

const RESPONSES={
  roas:`**Why ROAS improved this month**\n\nThe 18% ROAS improvement is driven by two factors:\n\n**1. Creative format shift** — UGC content entered rotation and is generating 2.3x higher CTR than studio content.\n\n**2. Audience refinement** — The 25-34 urban segment is converting at a 34% lower CAC than broad targeting.\n\n-> Watch: Studio Set B fatigue will drag numbers down in 2 weeks unless you rotate. Maintain UGC mix above 60% of Meta spend.`,
  tone:`**Brand tone drift analysis**\n\nYour brand consistency score has dropped from 82 to 78 over 30 days. Primary cause: 40% shift toward corporate language in Q4 campaign copy.\n\n**Patterns detected:**\n-> Use of "world-class," "enterprise-grade," "scalable solutions"\n-> Shift from first-person plural to third-person brand voice\n-> CTAs becoming transactional ("Get Started") vs relational ("Let's do this")\n\n-> Peak performance (5.8x ROAS, Q2 2024) correlated with 91/100 brand alignment score. Fix: use Content Engine to regenerate copy with Brand Brain active.`,
  creative:`**Creative scaling recommendations**\n\n**Scale immediately (3x budget):**\n-> Founder Story video — 4.2% CTR, most on-brand content produced\n-> UGC Creator Pack A — 3.8% CTR, strong Gen Z resonance\n\n**Hold and refresh:**\n-> Lifestyle Video Series — slowing at day 28, needs new cut\n\n**Pause immediately:**\n-> Studio Set B — 47 days, 1.1% CTR. Diluting Meta account quality score daily.`,
  default:`**Astra's Strategic Diagnosis**\n\nPerformance is trending positively — ROAS up 18%, CAC down 18% MoM. The key driver is a shift toward UGC content formats that align with your brand's conversational positioning.\n\n**Critical risk:** Creative fatigue on Studio Set B (47 days) + brand tone drift (61/100 consistency score) could erode ROAS gains in 2-3 weeks.\n\n-> Priority actions:\n1. Rotate Studio Set B creative immediately\n2. Run live campaign copy through brand voice audit\n3. Scale Founder Story format — highest CTR at 4.2%`
};

function getResponse(q=''){
  const l=q.toLowerCase();
  if(l.includes('roas')||l.includes('improve')||l.includes('perform'))return RESPONSES.roas;
  if(l.includes('tone')||l.includes('drift')||l.includes('brand')&&l.includes('consist'))return RESPONSES.tone;
  if(l.includes('creative')||l.includes('scale')||l.includes('ad'))return RESPONSES.creative;
  return RESPONSES.default;
}

function openAI(q=''){
  if(!q||!q.trim())q='What should I focus on this week?';
  const modal=document.getElementById('aiModal');
  const resp=document.getElementById('aiResp');
  if(!modal||!resp)return;
  const txt=getResponse(q);
  resp.innerHTML=`<div style="margin-bottom:11px;font-size:12px;color:var(--text-muted)">Your question: <em style="color:var(--text-secondary)">${q}</em></div>`+
    txt.split('\n').map(l=>{
      if(l.startsWith('**')&&l.endsWith('**'))return`<strong style="color:var(--text);display:block;margin:12px 0 4px">${l.slice(2,-2)}</strong>`;
      if(l.startsWith('->'))return`<div style="padding:5px 0 5px 11px;border-left:2px solid var(--brand);margin:4px 0;font-size:13px">${l}</div>`;
      return l?`<p style="margin:3px 0">${l}</p>`:'<br/>';
    }).join('');
  modal.style.display='flex';
}

function showToast(msg){
  const t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:22px;right:22px;z-index:1000;background:var(--bg-elevated);border:1px solid var(--border);border-radius:10px;padding:13px 18px;font-size:13px;box-shadow:0 8px 40px rgba(0,0,0,.6);max-width:340px;line-height:1.5;display:flex;align-items:flex-start;gap:9px;animation:toastIn .3s ease';
  t.innerHTML=`<span style="color:var(--brand);font-size:16px">+</span><span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.transition='opacity .3s';t.style.opacity='0';setTimeout(()=>t.remove(),300);},4000);
}
document.addEventListener('click',e=>{const m=document.getElementById('aiModal');if(m&&e.target===m)m.style.display='none';});
const s=document.createElement('style');
s.textContent='@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}';
document.head.appendChild(s);

// ONBOARDING
var _connected=0,_files=[];
function nextStep(step){
  document.querySelector('.ob-form.active')?.classList.remove('active');
  document.querySelectorAll('.ob-step').forEach(s=>{
    const n=parseInt(s.dataset.step);
    s.classList.remove('active');
    if(n<step)s.classList.add('completed');
    s.querySelector('.obs-num').textContent=n<step?'v':n;
  });
  document.querySelector(`#step-${step}`)?.classList.add('active');
  document.querySelector(`.ob-step[data-step="${step}"]`)?.classList.add('active');
  if(step===4)_runInit();
}
function toggleConnect(el){
  el.classList.toggle('connected');
  el.querySelector('.ic-status').textContent=el.classList.contains('connected')?'Connected':'Connect';
  _connected=document.querySelectorAll('.int-card.connected').length;
}
function handleFiles(files){
  Array.from(files).forEach(f=>{
    _files.push(f);
    const ext=f.name.split('.').pop().toUpperCase();
    const el=document.createElement('div');
    el.className='uf-item';
    el.innerHTML=`<span>+</span><span class="uf-name">${f.name}</span><span class="uf-size">${(f.size/1024).toFixed(0)} KB</span><span class="uf-remove" onclick="this.parentElement.remove()">x</span>`;
    document.getElementById('uploadedFiles')?.appendChild(el);
  });
}
function handleDrop(e){e.preventDefault();handleFiles(e.dataTransfer.files);}
const _initMsgs=['Analysing brand identity...','Learning tone and voice patterns...','Processing performance history...','Mapping audience psychology...','Building positioning model...','Calibrating strategic context...','Connecting integrations...','Brand Brain initialised.'];
function _runInit(){
  const log=document.getElementById('initLog');
  if(!log)return;
  log.innerHTML='';
  let i=0;
  const run=()=>{
    if(i>0){const p=log.lastChild;p?.classList.remove('active');p?.classList.add('done');}
    if(i>=_initMsgs.length){_showComplete();return;}
    const el=document.createElement('div');el.className='log-item active';el.textContent=_initMsgs[i];
    log.appendChild(el);i++;
    setTimeout(run,i<_initMsgs.length?680:900);
  };
  run();
}
function _showComplete(){
  setTimeout(()=>{
    document.querySelector('.ai-init')&&(document.querySelector('.ai-init').style.display='none');
    const ic=document.getElementById('initComplete');
    if(ic)ic.style.display='block';
    const n=document.getElementById('brandName2');
    if(n)n.textContent=document.getElementById('brandName')?.value||'Your Brand';
    const c=document.getElementById('connectedCount');
    if(c)c.textContent=_connected+' accounts';
  },400);
}
