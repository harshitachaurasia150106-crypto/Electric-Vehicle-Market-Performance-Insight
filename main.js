(function () {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function loadFrame(panel) {
    const frame = panel.querySelector('iframe');
    const loader = panel.querySelector('.loader');
    if (!frame) return;
    if (!frame.getAttribute('src')) {
      frame.addEventListener('load', () => { if (loader) loader.style.display = 'none'; }, { once: true });
      frame.setAttribute('src', frame.dataset.src);
    } else if (loader) {
      frame.addEventListener('load', () => { loader.style.display = 'none'; }, { once: true });
    }
  }

  function activate(key, updateUrl) {
    tabs.forEach(t => {
      const on = t.dataset.tab === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
    });
    panels.forEach(p => {
      const on = p.id === 'panel-' + key;
      p.classList.toggle('active', on);
      if (on) loadFrame(p);
    });
    if (updateUrl) history.replaceState(null, '', '/' + key + '#viz');
  }

  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab, true)));

  document.querySelectorAll('[data-tab-link]').forEach(a => {
    a.addEventListener('click', () => {
      activate(a.dataset.tabLink, true);
      navLinks.classList.remove('open');
    });
  });

  const initial = document.querySelector('.panel.active');
  if (initial) loadFrame(initial);

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open')));
})();
