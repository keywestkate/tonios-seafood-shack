/* ── Shared menu page functionality ── */
document.addEventListener('DOMContentLoaded', () => {

  // Announcement bar
  const track = document.getElementById('marquee-track');
  if (track && typeof CMS !== 'undefined' && CMS.announcement?.active) {
    const msgs = [...CMS.announcement.messages, ...CMS.announcement.messages];
    track.innerHTML = msgs.map(m => `<span>${m}</span><span class="marquee-dot">·</span>`).join('');
  }

  // Sticky nav
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Hamburger
  const burger = document.getElementById('burger');
  const mobMenu = document.getElementById('mob-menu');
  burger?.addEventListener('click', () => {
    const open = mobMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    burger?.classList.remove('open');
    document.body.style.overflow = '';
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobMenu?.classList.contains('open')) {
      mobMenu.classList.remove('open');
      burger?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
