/* win98.js — Portfolio interactivity */

/* ---- Skill details ---- */
const SKILL_DETAILS = {
  'entra': {
    icon: '🔐',
    title: 'Microsoft Entra ID',
    body: 'This is where I live for identity and access. I have run full governance audits, cleaned up ghost admin accounts, reduced Global Admin sprawl, and made sure least privilege actually means something. MFA, Conditional Access, and identity risk remediation are all part of my daily toolkit.'
  },
  'intune': {
    icon: '📱',
    title: 'Microsoft Intune',
    body: 'My endpoint management home base for both Windows and macOS. I have rebuilt entire tenants from the ground up, fixed conflicting policies, deployed apps, and locked things down without making people\'s lives harder. Configuration profiles, compliance policies, and app deployment are all in my wheelhouse.'
  },
  'apple-mdm': {
    icon: '🍎',
    title: 'Apple MDM (ABM)',
    body: 'I recovered a lost Apple Business Manager setup, integrated it with Intune, and built out Automated Device Enrollment so new Macs onboard themselves. Fewer hands on each device and a much smoother day one experience for new hires.'
  },
  'ai-admin': {
    icon: '🤖',
    title: 'Enterprise AI Admin',
    body: 'I managed a full Claude AI rollout from the initial Team pilot all the way to Enterprise deployment. That included SSO integration, secure tenant configuration, and automated user provisioning. AI tools done right, with security baked in from the start.'
  },
  'lifecycle': {
    icon: '👥',
    title: 'User Lifecycle Management',
    body: 'From day one provisioning all the way to secure offboarding, I own the whole journey. I have built structured onboarding programs that get new hires productive faster, and I make sure no one keeps access they should not have once they move on.'
  },
  'assets': {
    icon: '🖥️',
    title: 'Asset Management',
    body: 'Using Microsoft Graph API I have automated device inventory and resource tracking so nothing falls through the cracks. Knowing exactly what you have, where it is, and who has it is half the battle in any IT environment.'
  },
  'saas': {
    icon: '🔑',
    title: 'SaaS Access Control',
    body: 'I keep enterprise apps locked down to the right people. Browser extension lockdowns across Chrome, Edge, and Firefox, USB restriction policies with structured exception management, and the kind of access controls that protect data without slowing anyone down.'
  },
  'webdev': {
    icon: '💻',
    title: 'HTML / CSS / JavaScript',
    body: 'You are looking at it! This whole site was hand coded, no templates and no page builders. I love that web development gives me a creative outlet alongside the systems work, and it keeps my problem solving sharp in a totally different way.'
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

