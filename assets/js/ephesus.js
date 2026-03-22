/* =====================================================
   IDE Portfolio — ephesus.js
   ===================================================== */

// ── THEME ─────────────────────────────────────────────

function toggleNightMode() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme') || 'dark';
  var next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcons(next);
}

function updateThemeIcons(theme) {
  var moonIcons = document.querySelectorAll('.icon-moon');
  var sunIcons  = document.querySelectorAll('.icon-sun');
  var lbl       = document.getElementById('st-theme-lbl');

  if (theme === 'dark') {
    moonIcons.forEach(function(el) { el.style.display = ''; });
    sunIcons.forEach(function(el)  { el.style.display = 'none'; });
    if (lbl) lbl.textContent = '☀️';
  } else {
    moonIcons.forEach(function(el) { el.style.display = 'none'; });
    sunIcons.forEach(function(el)  { el.style.display = ''; });
    if (lbl) lbl.textContent = '🌙';
  }

  // Swap theme-sensitive logo/avatar
  var avatar = document.getElementById('about-avatar');
  if (avatar) {
    var base = avatar.src.replace(/logo-(dark|light)\.png/, '');
    avatar.src = base + (theme === 'dark' ? 'logo-dark.png' : 'logo-light.png');
  }
}

// ── SECTION SWITCHING ─────────────────────────────────

var _currentSection = 'about';

function switchSection(name) {
  // If we are on a post page, clicking about/write/etc. navigates away
  var ideApp = document.querySelector('.ide-app');
  if (ideApp && ideApp.dataset.isPost === 'true') {
    if (name === 'write') {
      window.location.href = '/#write';
    } else {
      window.location.href = '/#' + name;
    }
    return;
  }

  _currentSection = name;

  // Hide all panels
  var panels = document.querySelectorAll('.sec-panel');
  panels.forEach(function(p) { p.classList.remove('sec-active'); });

  // Show target panel
  var target = document.getElementById('sec-' + name);
  if (target) {
    target.classList.add('sec-active');
    // Scroll content pane to top
    var pane = document.getElementById('content-pane');
    if (pane) pane.scrollTop = 0;
  }

  // Update tab bar
  var tabs = document.querySelectorAll('.editor-tab');
  tabs.forEach(function(t) {
    t.classList.remove('tab-active');
    if (t.dataset.section === name) t.classList.add('tab-active');
  });

  // Update sidebar tree
  var items = document.querySelectorAll('.tree-item');
  items.forEach(function(i) {
    i.classList.remove('tree-active');
    if (i.dataset.section === name) i.classList.add('tree-active');
  });

  // Update mobile nav
  var mobBtns = document.querySelectorAll('.mob-btn');
  mobBtns.forEach(function(b) {
    b.classList.remove('mob-active');
    if (b.dataset.section === name) b.classList.add('mob-active');
  });

  // Update status bar filename
  var stFile = document.getElementById('st-file');
  if (stFile) stFile.textContent = name + '.md';

  // Update URL hash without scroll
  try { history.replaceState(null, '', '#' + name); } catch(e) {}

  // Close sidebar on mobile
  if (window.innerWidth < 768) closeSidebar();
}

// ── ACTIVITY BAR ──────────────────────────────────────

function setActivity(panel) {
  // Update button active states
  var btns = document.querySelectorAll('.act-btn[id^="act-"]');
  btns.forEach(function(b) { b.classList.remove('act-active'); });
  var active = document.getElementById('act-' + panel);
  if (active) active.classList.add('act-active');

  // Toggle sidebar panels
  var spExplorer = document.getElementById('sp-explorer');
  var spSearch   = document.getElementById('sp-search');

  if (panel === 'explorer') {
    spExplorer.classList.remove('sp-hidden');
    spSearch.classList.add('sp-hidden');
    openSidebar();
  } else if (panel === 'search') {
    spSearch.classList.remove('sp-hidden');
    spExplorer.classList.add('sp-hidden');
    openSidebar();
    setTimeout(function() {
      var inp = document.getElementById('search-input');
      if (inp) inp.focus();
    }, 100);
  }
}

// ── SIDEBAR TOGGLE ─────────────────────────────────────

function openSidebar() {
  var sb = document.getElementById('ide-sidebar');
  var ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.add('sidebar-open');
  if (ov) ov.classList.add('ov-visible');
}

function closeSidebar() {
  var sb = document.getElementById('ide-sidebar');
  var ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.remove('sidebar-open');
  if (ov) ov.classList.remove('ov-visible');
}

function toggleSidebar() {
  var sb = document.getElementById('ide-sidebar');
  if (sb && sb.classList.contains('sidebar-open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// ── FOLDER TOGGLE ──────────────────────────────────────

function toggleFolder(headerEl) {
  var root = headerEl.closest('.tree-root');
  if (root) root.classList.toggle('collapsed');
}

// ── TAB CLOSE ─────────────────────────────────────────

function closeTab(evt, section) {
  if (evt) { evt.stopPropagation(); evt.preventDefault(); }
  // Visual only: do nothing (all tabs stay open like a fresh IDE)
  // Could implement actual close behavior in future
}

// ── SEARCH ────────────────────────────────────────────

function doSearch(query) {
  var resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;

  query = query.trim().toLowerCase();

  if (!query) {
    resultsEl.innerHTML = '<div class="search-hint">Type to search…</div>';
    return;
  }

  var sections = window.IDE_SECTIONS || [];
  var posts    = window.IDE_POSTS    || [];

  var secMatches = sections.filter(function(s) {
    return s.name.indexOf(query) !== -1 || s.desc.toLowerCase().indexOf(query) !== -1;
  });

  var postMatches = posts.filter(function(p) {
    return p.title.toLowerCase().indexOf(query) !== -1;
  });

  if (!secMatches.length && !postMatches.length) {
    resultsEl.innerHTML = '<div class="search-hint">No results found.</div>';
    return;
  }

  var html = '';

  if (secMatches.length) {
    html += '<div class="search-group-label">Pages</div>';
    html += secMatches.map(function(s) {
      return '<div class="search-result" onclick="switchSection(\'' + s.name + '\');document.getElementById(\'search-input\').value=\'\';doSearch(\'\');">' +
        '<span class="search-result-title">' + escHtml(s.label) + '</span>' +
        '<span class="search-result-date">' + escHtml(s.name) + '</span>' +
      '</div>';
    }).join('');
  }

  if (postMatches.length) {
    html += '<div class="search-group-label">Posts</div>';
    html += postMatches.map(function(p) {
      return '<a class="search-result" href="' + p.url + '">' +
        '<span class="search-result-title">' + escHtml(p.title) + '</span>' +
        '<span class="search-result-date">' + p.date + '</span>' +
      '</a>';
    }).join('');
  }

  resultsEl.innerHTML = html;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── STATUS BAR ANIMATION ──────────────────────────────

function animateLineCol() {
  var el = document.getElementById('st-pos');
  if (!el) return;
  var ln = Math.floor(Math.random() * 60) + 1;
  var col = Math.floor(Math.random() * 40) + 1;
  el.textContent = 'Ln ' + ln + ', Col ' + col;
}

// ── INIT ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  // Apply saved/system theme
  var theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcons(theme);

  // Handle URL hash for direct section linking
  var hash = window.location.hash.replace('#', '');
  var validSections = ['about', 'write', 'videos', 'projects', 'contact'];
  if (hash && validSections.indexOf(hash) !== -1) {
    switchSection(hash);
  }

  // On tablet: act-explorer button opens sidebar
  var actExp = document.getElementById('act-explorer');
  if (actExp) {
    actExp.addEventListener('click', function() {
      if (window.innerWidth <= 1023) toggleSidebar();
    });
  }

  // Animate line:col occasionally
  animateLineCol();
  setInterval(animateLineCol, 8000);
});
