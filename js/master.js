/**
 * EXsipo - master.js
 * Membaca data.json lalu mengisi konten halaman secara dinamis.
 * Jika data.json tidak ada, halaman tetap tampil dengan nilai kosong.
 */

(function () {
  'use strict';

  // ── Mobile nav ──────────────────────────────────────────────
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openNav() {
    if (mobileNav) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNav() {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeNav);
  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeNav();
    });
  }

  // ── Header Scroll Shadow ─────────────────────────────────────
  const brandBar = document.querySelector('.brand-bar');
  if (brandBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        brandBar.classList.add('scrolled');
      } else {
        brandBar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── Tombol Print CV ─────────────────────────────────────────
  const printBtn = document.getElementById('printCvBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  // ── Helper: set text jika elemen ada ────────────────────────
  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  }

  function setHref(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(el => { el.href = value; });
  }

  function show(selector) {
    document.querySelectorAll(selector).forEach(el => el.removeAttribute('hidden'));
  }

  function hide(selector) {
    document.querySelectorAll(selector).forEach(el => el.setAttribute('hidden', ''));
  }

  // ── Populate berdasarkan halaman ─────────────────────────────
  function populate(data) {

    // Semua halaman
    setText('[data-field="name"]', data.name);
    setText('[data-field="headline"]', data.headline);
    setText('[data-field="location"]', data.location);

    // ── index.html ──────────────────────────────────────────
    setText('[data-field="about-short"]', data.about);

    // ── projects.html ───────────────────────────────────────
    const projectsContainer = document.getElementById('projects-grid');
    if (projectsContainer && Array.isArray(data.projects) && data.projects.length) {
      projectsContainer.innerHTML = '';
      data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const tagsHtml = (project.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('');
        const extIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:3px; vertical-align:middle;"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`;
        const demoLink = project.url ? `<a href="${project.url}" target="_blank" rel="noopener" class="project-link">Demo${extIcon}</a>` : '';
        const repoLink = project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="project-link">GitHub${extIcon}</a>` : '';

        card.innerHTML = `
          <div>
            <div class="project-header">
              <h3 class="project-title">${project.name}</h3>
            </div>
            <p class="project-desc">${project.description || ''}</p>
          </div>
          <div>
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-links">${demoLink}${repoLink}</div>
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    }

    // ── about.html ──────────────────────────────────────────
    setText('[data-field="about"]', data.about);

    // Skills
    const skillsContainer = document.getElementById('skills-grid');
    if (skillsContainer && Array.isArray(data.skills) && data.skills.length) {
      skillsContainer.innerHTML = '';
      data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
      });
    }

    // Experience
    const expContainer = document.getElementById('experience-list');
    if (expContainer && Array.isArray(data.experience) && data.experience.length) {
      expContainer.innerHTML = '';
      show('#experience-section');
      data.experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'exp-item';
        item.innerHTML = `
          <div class="exp-header">
            <span class="exp-title">${exp.title}</span>
            <span class="exp-period">${exp.period || ''}</span>
          </div>
          <div class="exp-company">${exp.company}</div>
          ${exp.description ? `<p class="exp-desc">${exp.description}</p>` : ''}
        `;
        expContainer.appendChild(item);
      });
    }

    // Education
    const eduContainer = document.getElementById('education-list');
    if (eduContainer && Array.isArray(data.education) && data.education.length) {
      eduContainer.innerHTML = '';
      show('#education-section');
      data.education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'exp-item';
        item.innerHTML = `
          <div class="exp-header">
            <span class="exp-title">${edu.degree}</span>
            <span class="exp-period">${edu.year || ''}</span>
          </div>
          <div class="exp-company">${edu.school}</div>
        `;
        eduContainer.appendChild(item);
      });
    }

    // ── contact.html ─────────────────────────────────────────
    setText('[data-field="email"]', data.email || '');
    setText('[data-field="phone"]', data.phone || '');
    setText('[data-field="website"]', data.website || '');
    setHref('[data-href="website"]', data.website);

    // Sembunyikan card kontak yang kosong
    if (!data.email) hide('[data-contact-card="email"]');
    if (!data.phone) hide('[data-contact-card="phone"]');
    if (!data.website) hide('[data-contact-card="website"]');

    // Social links - tampilkan hanya yang ada URL-nya
    const socials = data.social || {};
    ['linkedin', 'github', 'twitter', 'instagram'].forEach(platform => {
      const el = document.querySelector(`[data-social="${platform}"]`);
      if (!el) return;
      if (socials[platform]) {
        el.href = socials[platform];
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    });
  }

  // ── Fetch data.json ──────────────────────────────────────────
  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('data.json not found');
      return res.json();
    })
    .then(data => populate(data))
    .catch(() => {
      // data.json tidak ada - halaman tetap tampil apa adanya
      console.info('EXsipo: data.json tidak ditemukan. Salin data.default.json ke data.json dan isi datamu.');
    });

})();