// ============================================
// ASTRA — ONBOARDING JS
// ============================================

let currentStep = 1;
let connectedCount = 0;
const uploadedFiles = [];

function nextStep(step) {
  document.querySelector(`#step-${currentStep}`).classList.remove('active');
  document.querySelectorAll('.ob-step').forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.remove('active');
    if (n < step) s.classList.add('completed');
    s.querySelector('.obs-num').textContent = n < step ? '✓' : n;
  });
  currentStep = step;
  const next = document.querySelector(`#step-${step}`);
  if (next) {
    next.classList.add('active');
    document.querySelector(`.ob-step[data-step="${step}"]`)?.classList.add('active');
  }
  if (step === 4) runAIInit();
}

function toggleConnect(el) {
  el.classList.toggle('connected');
  el.querySelector('.ic-status').textContent = el.classList.contains('connected') ? '✓ Connected' : 'Connect';
  connectedCount = document.querySelectorAll('.int-card.connected').length;
}

function handleFiles(files) {
  Array.from(files).forEach(f => {
    uploadedFiles.push(f);
    renderFile(f);
  });
}

function handleDrop(e) {
  e.preventDefault();
  handleFiles(e.dataTransfer.files);
  document.getElementById('uploadZone').classList.remove('dragover');
}

function renderFile(file) {
  const el = document.createElement('div');
  el.className = 'uf-item';
  const ext = file.name.split('.').pop().toUpperCase();
  const icons = { PDF: '📄', DOCX: '📝', XLSX: '📊', CSV: '📊', PPT: '📑', PPTX: '📑', PNG: '🖼️', JPG: '🖼️', JPEG: '🖼️' };
  el.innerHTML = `
    <span class="uf-icon">${icons[ext] || '📄'}</span>
    <span class="uf-name">${file.name}</span>
    <span class="uf-size">${(file.size / 1024).toFixed(0)} KB</span>
    <span class="uf-remove" onclick="this.parentElement.remove()">✕</span>
  `;
  document.getElementById('uploadedFiles').appendChild(el);
}

const initMessages = [
  '⚡ Analysing brand identity...',
  '🧠 Learning tone and voice patterns...',
  '📊 Processing performance history...',
  '👥 Mapping audience psychology...',
  '🎯 Building positioning model...',
  '✦ Calibrating strategic context...',
  '🔗 Connecting integrations...',
  '✓ Brand Brain initialised.',
];

function runAIInit() {
  const log = document.getElementById('initLog');
  log.innerHTML = '';
  let i = 0;
  const run = () => {
    if (i > 0) {
      const prev = log.lastChild;
      prev.classList.remove('active');
      prev.classList.add('done');
    }
    if (i >= initMessages.length) {
      showInitComplete();
      return;
    }
    const item = document.createElement('div');
    item.className = 'log-item active';
    item.textContent = initMessages[i];
    log.appendChild(item);
    i++;
    setTimeout(run, i < initMessages.length ? 700 : 1000);
  };
  run();
}

function showInitComplete() {
  setTimeout(() => {
    document.querySelector('.ai-init').style.display = 'none';
    document.getElementById('initComplete').style.display = 'block';
    const nameEl = document.getElementById('brandName2');
    const name = document.getElementById('brandName')?.value || 'Your Brand';
    nameEl.textContent = name || 'Your Brand';
    document.getElementById('connectedCount').textContent = connectedCount + ' accounts';
  }, 500);
}
