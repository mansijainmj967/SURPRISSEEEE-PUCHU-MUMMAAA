// ============================================
// ASTRA — DASHBOARD JS
// ============================================

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleNotifications() {
  // Notification panel placeholder
  showToast('3 new insights from Astra — click to view details.');
}

function handleTopSearch(e) {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) showAIModal(q);
  }
}

function handleAiChat(e) {
  if (e.key === 'Enter') submitAiChat();
}

function submitAiChat() {
  const input = document.getElementById('aiChatInput');
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;
  showAIModal(q);
  input.value = '';
}

const aiResponses = {
  default: `Based on your Brand Brain and current data, here's what I found:

Your overall performance is trending positively — ROAS is up 18% and CAC has dropped 18% MoM. The key driver is a shift toward UGC content formats, which align much more closely with your brand's historically conversational positioning.

The critical risk right now is the combination of creative fatigue (Studio Set B at day 47) and brand tone drift (61/100 consistency score). These two factors together could erode your current ROAS gains in the next 2–3 weeks if unaddressed.

**Recommended immediate actions:**
1. Brief creative team on Studio Set B rotation — new UGC variants within 5 days
2. Run all live campaign copy through brand voice check
3. Scale Founder Story format — highest CTR at 4.2%

**Strategic implication:** Your authenticity positioning is under pressure from a competitor who's pivoting toward trust messaging. The window to reinforce your narrative is 2–3 weeks.`,

  roas: `**Why ROAS improved this month:**

The 18% ROAS improvement (3.6× → 4.2×) is driven primarily by two factors:

1. **Creative format shift** — UGC content entered rotation and is generating 2.3× higher CTR than studio content. Since CTR directly impacts Quality Score and CPM on Meta, this has a multiplier effect on efficiency.

2. **Audience refinement** — The 25–34 urban segment is converting at a 34% lower CAC than the broader targeting. More spend concentration here is improving blended performance.

**What to watch:** The ROAS gain is fragile. Studio Set B fatigue will drag blended numbers down in the next 2 weeks unless you rotate. Recommend maintaining the UGC mix above 60% of Meta spend.`,

  tone: `**Brand tone drift analysis:**

Your brand consistency score has dropped from 82 to 78 over the past 30 days. The primary cause is a 40% shift toward corporate language in your Q4 campaign copy.

**Specific patterns I'm detecting:**
- Use of terms like "world-class," "enterprise-grade," and "scalable solutions"
- Shift from first-person plural ("we built this") to third-person ("the platform enables")
- CTAs becoming more transactional ("Get Started") vs relational ("Let's do this")

**Why this matters:** Your peak performance (5.8× ROAS, Q2 2024) came from campaigns that scored 91+/100 on brand alignment. The correlaton is strong — brand drift costs you performance.

**Fix:** Use the Content Engine to regenerate current live ad copy with Brand Brain guidance active.`,

  creative: `**Creative scaling recommendation:**

Based on 90 days of performance data and Brand Brain context, here's what to scale:

**Scale immediately (3× budget):**
→ Founder Story video — 4.2% CTR, most on-brand content you've produced
→ UGC Creator Pack A — 3.8% CTR, strong Gen Z resonance

**Hold and refresh:**
→ Lifestyle Video Series — slowing down at day 28, needs new cut/angle

**Pause immediately:**
→ Studio Set B — 47 days, 1.1% CTR. Every day this runs it's diluting your Meta account quality score.

**New creative brief (AI-generated):** Upload a brief to the Content Engine and I'll generate a UGC creator brief based on your Brand Brain and current top-performing patterns.`,
};

function getAIResponse(q) {
  const lower = q.toLowerCase();
  if (lower.includes('roas') || lower.includes('improve') || lower.includes('perform')) return aiResponses.roas;
  if (lower.includes('tone') || lower.includes('brand') || lower.includes('drift') || lower.includes('consistent')) return aiResponses.tone;
  if (lower.includes('creative') || lower.includes('scale') || lower.includes('ad')) return aiResponses.creative;
  return aiResponses.default;
}

function showAIModal(question) {
  const modal = document.getElementById('aiModal');
  if (!modal) return;
  const response = document.getElementById('aiResponse');
  response.innerHTML = `<div style="margin-bottom:12px;font-size:13px;color:var(--text-muted)">Your question: <em style="color:var(--text)">"${question}"</em></div>` +
    getAIResponse(question).split('\n').map(line => {
      if (line.startsWith('**') && line.endsWith('**')) return `<strong style="color:var(--text);display:block;margin:12px 0 4px">${line.slice(2,-2)}</strong>`;
      if (line.startsWith('→')) return `<div style="padding:6px 0 6px 12px;border-left:2px solid var(--brand);margin:4px 0;font-size:13px">${line}</div>`;
      if (line.startsWith('#')) return `<h4 style="margin:8px 0 4px;font-size:14px">${line.slice(2)}</h4>`;
      return line ? `<p style="margin:4px 0">${line}</p>` : '<br/>';
    }).join('');
  modal.style.display = 'flex';
}

function closeAiModal() {
  const modal = document.getElementById('aiModal');
  if (modal) modal.style.display = 'none';
}

function generateReport() {
  showToast('Generating executive report... This will be ready in a moment.');
  setTimeout(() => {
    window.location.href = 'deck-builder.html';
  }, 1500);
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 1000;
    background: var(--bg-elevated); border: 1px solid var(--border);
    border-radius: 10px; padding: 14px 20px; font-size: 13px;
    box-shadow: var(--shadow-lg); max-width: 360px; line-height: 1.5;
    display: flex; align-items: flex-start; gap: 10px;
    animation: slideIn 0.3s ease;
  `;
  toast.innerHTML = `<span style="color:var(--brand);font-size:16px">✦</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('aiModal');
  if (modal && e.target === modal) closeAiModal();
});

// Animate progress bars on load
window.addEventListener('load', () => {
  document.querySelectorAll('.pb-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0';
    requestAnimationFrame(() => {
      bar.style.transition = 'width 1s ease';
      bar.style.width = target;
    });
  });
});
