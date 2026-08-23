// ============================================
// RAHI CREW — Website Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---------- Active nav link on scroll (waypoints) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => linkObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Gallery filter ---------- */
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.g-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox ? lightbox.querySelector('img') : null;
  const lbCap = lightbox ? lightbox.querySelector('.lb-cap') : null;
  let currentIndex = 0;
  let visibleItems = [];

  function refreshVisible() {
    visibleItems = Array.from(document.querySelectorAll('.g-item:not(.hide)'));
  }

  function openLightbox(item) {
    refreshVisible();
    currentIndex = visibleItems.indexOf(item);
    showCurrent();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showCurrent() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = item.dataset.caption || img.alt || '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  if (lightbox) {
    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lightbox.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
    lightbox.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); step(1); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }

  function step(dir) {
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    showCurrent();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- Contact form -> WhatsApp / mailto handoff ---------- */
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const eventType = data.get('event-type') || '';
      const date = data.get('date') || '';
      const location = data.get('location') || '';
      const guests = data.get('guests') || '';
      const message = data.get('message') || '';

      const text =
`Hi Rahi Crew, I'd like to enquire about staffing for an event.
Name: ${name}
Event type: ${eventType}
Date: ${date}
Location: ${location}
Guest count: ${guests}
Notes: ${message}`;

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/919540259307?text=${encoded}`, '_blank');
    });
  }

  /* ---------- Destination cards -> filtered gallery ---------- */
  document.querySelectorAll('.dest-card[data-goto]').forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.dataset.goto;
      const tab = document.querySelector(`.filter-tab[data-filter="${filter}"]`);
      if (tab) tab.click();
      const workSection = document.getElementById('work');
      if (workSection) workSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
