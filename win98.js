/* win98.js — Portfolio interactivity */

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
