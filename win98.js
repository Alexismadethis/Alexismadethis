/* win98.js — Portfolio interactivity */

/* ---- Skill details ---- */
const SKILL_DETAILS = {
  'entra': {
    icon: '🔐',
    title: 'Microsoft Entra ID',
    body: 'Conduct governance audits, clean up legacy admin accounts, and enforce least-privilege access. MFA and Conditional Access are part of my standard toolkit.'
  },
  'intune': {
    icon: '📱',
    title: 'Microsoft Intune',
    body: 'Manage company devices across both Windows and macOS environments. I\'ve taken over Intune setups with conflicting policies, reviewed and refined what was salvageable, and rebuilt the rest from scratch. The goal is always a clean, secure environment that doesn\'t disrupt end users.'
  },
  'apple-mdm': {
    icon: '🍎',
    title: 'Apple MDM (ABM)',
    body: 'Configured Apple Business Manager and integrated it with Intune to enable Automated Device Enrollment. New Macs now onboard themselves, giving new hires a seamless day-one experience.'
  },
  'ai-admin': {
    icon: '🤖',
    title: 'Enterprise AI Admin',
    body: 'Led a full Claude AI rollout, scaling from a Team pilot to enterprise-wide deployment. The work included SSO integration, secure tenant configuration, and automated user provisioning.'
  },
  'lifecycle': {
    icon: '👥',
    title: 'User Lifecycle Management',
    body: 'Own the full employee tech journey, from automated provisioning on day one to secure offboarding. I\'ve built onboarding programs that get new hires productive faster and ensure access is properly revoked when someone moves on.'
  },
  'assets': {
    icon: '🖥️',
    title: 'Asset Management',
    body: 'Automate device inventory and resource tracking using the Microsoft Graph API. Knowing exactly what hardware exists, where it is, and who has it is essential to running a secure IT environment.'
  },
  'saas': {
    icon: '🔑',
    title: 'SaaS Access Control',
    body: 'Manage access to enterprise applications and enforce security baselines, including browser extension lockdowns and structured USB restriction policies. The goal is protecting data without slowing anyone down.'
  },
  'webdev': {
    icon: '💻',
    title: 'HTML / CSS / JavaScript',
    body: 'You\'re looking at it. I built this site by using HTML, CSS, and JavaScript. Web development gives me a creative outlet alongside my systems work and keeps my problem-solving skills sharp.'
  }
};

function openSkill(key) {
  const data = SKILL_DETAILS[key];
  if (!data) return;
  let overlay = document.getElementById('skill-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'skill-modal-overlay';
    overlay.className = 'skill-modal-overlay';
    overlay.innerHTML = `
      <div class="skill-modal" role="dialog" aria-modal="true">
        <div class="skill-modal-titlebar">
          <div class="skill-modal-titlebar-left">
            <span id="skill-modal-tb-icon">ℹ️</span>
            <span id="skill-modal-tb-title">Properties</span>
          </div>
          <button class="win-ctrl-btn" onclick="closeSkill()" title="Close">✕</button>
        </div>
        <div class="skill-modal-body">
          <div class="skill-modal-icon" id="skill-modal-icon">🔐</div>
          <div class="skill-modal-content">
            <h3 id="skill-modal-title">Skill</h3>
            <p id="skill-modal-body-text">Description.</p>
          </div>
        </div>
        <div class="skill-modal-footer">
          <button class="skill-modal-btn" onclick="closeSkill()">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSkill();
    });
  }
  document.getElementById('skill-modal-icon').textContent = data.icon;
  document.getElementById('skill-modal-tb-icon').textContent = data.icon;
  document.getElementById('skill-modal-tb-title').textContent = data.title + ' Properties';
  document.getElementById('skill-modal-title').textContent = data.title;
  document.getElementById('skill-modal-body-text').textContent = data.body;
  overlay.classList.remove('hidden');
}

function closeSkill() {
  const overlay = document.getElementById('skill-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSkill();
});


/* ---- Clock ---- */
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const timeStr = h + ':' + m + ' ' + ampm;
  const c1 = document.getElementById('taskbar-clock');
  const c2 = document.getElementById('win-clock');
  if (c1) c1.textContent = timeStr;
  if (c2) c2.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 10000);

/* ---- Start Menu ---- */
function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  if (menu) menu.classList.toggle('hidden');
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('start-menu');
  const btn = document.getElementById('start-btn');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

/* ---- Minimize / Restore ---- */
function minimizeWindow() {
  const win = document.getElementById('main-window');
  const float = document.getElementById('taskbar-float');
  if (win) win.style.display = 'none';
  if (float) float.style.display = 'block';
}

function restoreWindow() {
  const win = document.getElementById('main-window');
  const float = document.getElementById('taskbar-float');
  if (win) win.style.display = 'block';
  if (float) float.style.display = 'none';
}

/* ---- Boot Screen (index.html only) ---- */
const bootScreen = document.getElementById('boot-screen');
const desktop = document.getElementById('desktop');

if (bootScreen && desktop) {
  const messages = [
    'Starting Windows 98...',
    'Loading system files...',
    'Initializing hardware...',
    'Loading Alexis\'s Portfolio...',
    'Almost ready...',
    'Welcome!'
  ];

  const fill = document.getElementById('boot-bar-fill');
  const msg = document.getElementById('boot-msg');
  let step = 0;
  const totalSteps = messages.length;

  function bootStep() {
    if (step < totalSteps) {
      if (msg) msg.textContent = messages[step];
      if (fill) fill.style.width = Math.round(((step + 1) / totalSteps) * 100) + '%';
      step++;
      const delay = step === totalSteps ? 600 : 400 + Math.random() * 300;
      setTimeout(bootStep, delay);
    } else {
      setTimeout(function() {
        bootScreen.style.opacity = '0';
        bootScreen.style.transition = 'opacity 0.4s ease';
        setTimeout(function() {
          bootScreen.style.display = 'none';
          desktop.classList.remove('hidden');
        }, 400);
      }, 300);
    }
  }

  setTimeout(bootStep, 500);
}

