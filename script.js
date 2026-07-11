// script.js - Interactivity for chris-lowe.net V1
// Handles Diagnostic Tool, Article Modal Reader, Inquiry Modal, and Waitlist UI

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Active State & Smooth Scroll
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // 2. Diagnostic Tool (Vault Health Check) Logic
  const diagnosticData = {
    pain1: {
      badge: "Protocol: Actionability Over Completeness",
      title: "Sniper, Not Sprayer Execution",
      desc: "In Commonplace, Todoist tracks doing and Obsidian tracks thinking. We eliminate task graveyards by enforcing the GTD Four-Criteria Filter (Context → Time Available → Energy → Priority) and aggressively cutting anything that doesn't earn its place."
    },
    pain2: {
      badge: "Protocol: Single Source of Truth",
      title: "Schema-Driven AI Architecture",
      desc: "Traditional vaults fail in the agent era because unbounded vocabularies create hallucinations. We enforce strict closed vocabularies in YAML frontmatter and a canonical schema.md file that every AI agent reads before taking a single action."
    },
    pain3: {
      badge: "Principle 12: Design for the AuDHD Brain",
      title: "Reflective Notes Carry Executive Load",
      desc: "Most systems assume an idealized, robotic human. We design for the Organic Brain: leading with emotional truth in standups, giving the win space, and collapsing daily execution to a single non-negotiable 'One Thing' when motivation drops."
    },
    pain4: {
      badge: "Protocol: The Tool-Tier Ladder",
      title: "Cheapest Tool First Discipline",
      desc: "Stop wasting time and AI tokens on heavy GUI automation or manual formatting. We enforce a strict escalation ladder: local filesystem notes → dedicated MCP API connectors → targeted search → browser automation as a last resort."
    }
  };

  const painBtns = document.querySelectorAll('.pain-btn');
  const solBadge = document.getElementById('solution-badge');
  const solTitle = document.getElementById('solution-title');
  const solDesc = document.getElementById('solution-desc');

  painBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      painBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-pain');
      if (window.sa_event) window.sa_event("diagnostic_selected_" + key);
      const data = diagnosticData[key];
      if (data) {
        solBadge.style.opacity = 0;
        solTitle.style.opacity = 0;
        solDesc.style.opacity = 0;
        setTimeout(() => {
          solBadge.textContent = data.badge;
          solTitle.textContent = data.title;
          solDesc.textContent = data.desc;
          solBadge.style.opacity = 1;
          solTitle.style.opacity = 1;
          solDesc.style.opacity = 1;
        }, 150);
      }
    });
  });

  // 3. Render Articles from articles.js
  const articlesContainer = document.getElementById('articles-grid');
  if (typeof ARTICLES_DATA !== 'undefined' && articlesContainer) {
    articlesContainer.innerHTML = ARTICLES_DATA.map(art => `
      <div class="article-card">
        <div>
          <div class="article-meta">
            <span class="article-pillar">${art.pillar}</span>
            <span>${art.readTime}</span>
          </div>
          <h3 class="article-title">${art.title}</h3>
          <p class="article-subtitle">${art.subtitle}</p>
        </div>
        <button class="read-btn" onclick="openArticleModal('${art.id}')">
          Read Foundational Draft <span>&rarr;</span>
        </button>
      </div>
    `).join('');
  }

  // 4. Modals Handling (Reader & Inquiry)
  const readerModal = document.getElementById('reader-modal');
  const inquiryModal = document.getElementById('inquiry-modal');

  window.openArticleModal = (id) => {
    const art = ARTICLES_DATA.find(a => a.id === id);
    if (!art || !readerModal) return;
    if (window.sa_event) window.sa_event("article_opened_" + id.replace(/-/g, "_"));
    document.getElementById('modal-article-pillar').textContent = art.pillar;
    document.getElementById('modal-article-title').textContent = art.title;
    document.getElementById('modal-article-subtitle').textContent = art.subtitle;
    document.getElementById('modal-article-body').innerHTML = art.content;
    readerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.openInquiryModal = (serviceType = 'General Inquiry') => {
    if (!inquiryModal) return;
    if (window.sa_event) window.sa_event("inquiry_modal_opened");
    const select = document.getElementById('inquiry-interest');
    if (select) select.value = serviceType;
    inquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModals = () => {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = 'auto';
  };

  // Close modal on outside click or Esc
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModals();
    });
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  // 5. Form Submissions (Inquiry & Waitlist) with UI Feedback
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = inquiryForm.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Sending Inquiry...';
      btn.disabled = true;
      setTimeout(() => {
        if (window.sa_event) window.sa_event("inquiry_form_submitted");
        btn.textContent = '✓ Inquiry Sent! I will be in touch.';
        btn.style.background = '#10B981';
        inquiryForm.reset();
        setTimeout(() => {
          closeModals();
          btn.textContent = origText;
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      }, 800);
    });
  }

  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = waitlistForm.querySelector('input[type="email"]');
      const btn = waitlistForm.querySelector('button[type="submit"]');
      if (input.value) {
        if (window.sa_event) window.sa_event("waitlist_form_submitted");
        btn.textContent = '✓ You are on the Waitlist!';
        btn.style.background = '#10B981';
        input.value = '';
        input.disabled = true;
        btn.disabled = true;
      }
    });
  }
});
