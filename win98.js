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


/* =====================================================
   SOUND SYSTEM
   Sounds are synthesized with the Web Audio API so no
   external audio files are needed. Default ON; user can
   toggle via the speaker icon in the system tray.
   ===================================================== */
let soundEnabled = true;
try {
  const stored = localStorage.getItem('win98-sound');
  if (stored === 'off') soundEnabled = false;
} catch (e) { /* private mode, ignore */ }

let audioCtx = null;
function getCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return null; }
  }
  return audioCtx;
}

function playTone(freq, duration, type, gain) {
  if (!soundEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') { try { ctx.resume(); } catch(e){} }
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type || 'square';
  osc.frequency.value = freq;
  g.gain.value = gain || 0.08;
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playClick() {
  playTone(800, 0.04, 'square', 0.05);
}

function playDing() {
  if (!soundEnabled) return;
  playTone(880, 0.12, 'sine', 0.1);
  setTimeout(function(){ playTone(1320, 0.18, 'sine', 0.08); }, 90);
}

function playChime() {
  if (!soundEnabled) return;
  const notes = [523, 659, 784, 1047];
  notes.forEach(function(n, i) {
    setTimeout(function(){ playTone(n, 0.25, 'sine', 0.07); }, i * 120);
  });
}

function playError() {
  if (!soundEnabled) return;
  playTone(220, 0.15, 'square', 0.08);
  setTimeout(function(){ playTone(180, 0.2, 'square', 0.08); }, 120);
}

function updateSoundIcon() {
  const icon = document.getElementById('sound-toggle');
  if (icon) icon.textContent = soundEnabled ? '\u{1F50A}' : '\u{1F507}';
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  try { localStorage.setItem('win98-sound', soundEnabled ? 'on' : 'off'); } catch(e){}
  updateSoundIcon();
  if (soundEnabled) {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    playDing();
  }
}

// Click sound on Win98 buttons and icons
document.addEventListener('click', function(e) {
  const t = e.target.closest('.win-btn, .toolbar-btn, .win-ctrl-btn, .start-btn, .taskbar-win-btn, .d-icon, .start-item, .skill-modal-btn, .win-skill-tile');
  if (t) playClick();
});

// Set the icon on every page load
document.addEventListener('DOMContentLoaded', updateSoundIcon);

/* =====================================================
   RECYCLE BIN
   ===================================================== */
const recycleBinContents = [
  { icon: '\u{1F4C4}', name: 'imposter_syndrome.txt', size: '0 KB' },
  { icon: '\u{1F310}', name: 'Internet_Explorer_6.exe', size: '404 KB' },
  { icon: '\u{1F4CE}', name: 'clippy.exe', size: '1.21 MB' },
  { icon: '\u{1F4C4}', name: 'old_portfolio_v1.html', size: '12 KB' },
  { icon: '\u{1F4C4}', name: 'passwords.txt', size: '0 KB' },
  { icon: '\u{1F5BC}', name: 'monday_motivation.gif', size: '88 KB' },
  { icon: '\u{1F4C4}', name: 'buggy_code.js', size: '666 KB' },
  { icon: '\u{1F4C4}', name: 'meetings_that_couldve_been_emails.docx', size: '4.2 MB' }
];

function openRecycleBin() {
  playDing();
  if (document.getElementById('recycle-bin-window')) return;
  const overlay = document.createElement('div');
  overlay.id = 'recycle-bin-window';
  overlay.className = 'rb-overlay';

  let rows = '';
  recycleBinContents.forEach(function(item) {
    rows += '<div class="rb-item" onclick="rbItemClick(this)">' +
              '<span class="rb-item-icon">' + item.icon + '</span>' +
              '<span class="rb-item-name">' + item.name + '</span>' +
              '<span class="rb-item-size">' + item.size + '</span>' +
            '</div>';
  });

  overlay.innerHTML =
    '<div class="rb-window">' +
      '<div class="win-titlebar">' +
        '<div class="win-titlebar-left"><span class="win-titlebar-icon">\u{1F5D1}</span> Recycle Bin</div>' +
        '<div class="win-controls">' +
          '<button class="win-ctrl-btn" title="Close" onclick="closeRecycleBin()">\u2715</button>' +
        '</div>' +
      '</div>' +
      '<div class="win-menubar">' +
        '<span class="win-menu-item">File</span>' +
        '<span class="win-menu-item">Edit</span>' +
        '<span class="win-menu-item">View</span>' +
        '<span class="win-menu-item">Help</span>' +
      '</div>' +
      '<div class="rb-body">' +
        '<div class="rb-header">' +
          '<span class="rb-col rb-col-name">Name</span>' +
          '<span class="rb-col rb-col-size">Size</span>' +
        '</div>' +
        '<div class="rb-list">' + rows + '</div>' +
        '<div class="rb-footer">' +
          '<button class="win-btn" onclick="rbEmpty()">Empty Recycle Bin</button>' +
          '<span class="rb-status">' + recycleBinContents.length + ' object(s)</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeRecycleBin();
  });
}

function closeRecycleBin() {
  const el = document.getElementById('recycle-bin-window');
  if (el) el.remove();
}

function rbItemClick(el) {
  document.querySelectorAll('.rb-item.selected').forEach(function(i){ i.classList.remove('selected'); });
  el.classList.add('selected');
}

function rbEmpty() {
  playError();
  const list = document.querySelector('.rb-list');
  const status = document.querySelector('.rb-status');
  if (list) list.innerHTML = '<div class="rb-empty-msg">\u{1F4ED} This folder is empty.<br><br>Just like my excuses for not updating this site more often.</div>';
  if (status) status.textContent = '0 object(s)';
}

// Esc closes Recycle Bin too
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeRecycleBin();
});

// Play chime on boot completion if sound is enabled
if (bootScreen && desktop) {
  const _origBootDone = bootScreen;
  // Hook into desktop reveal: poll briefly until desktop is shown
  let _chimePlayed = false;
  const _chimeCheck = setInterval(function() {
    if (!desktop.classList.contains('hidden') && !_chimePlayed) {
      _chimePlayed = true;
      playChime();
      clearInterval(_chimeCheck);
    }
  }, 200);
  // Stop polling after 12 seconds no matter what
  setTimeout(function(){ clearInterval(_chimeCheck); }, 12000);
}
