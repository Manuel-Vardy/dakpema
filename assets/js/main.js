/**
 * Nyab Dakpema Naa Digital Initiative (NDNDI)
 * Interactive Script: Tab Menus, Application Modal, Donation Modal, Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Tab Menus System (Faithful to "TAB MENUS")
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateTab(tabId) {
    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(btn => {
      const target = btn.getAttribute('data-tab');
      if (target === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === tabId) {
        panel.style.display = 'block';
        panel.classList.add('active');
      } else {
        panel.style.display = 'none';
        panel.classList.remove('active');
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      activateTab(tabId);
      history.replaceState(null, null, `#${tabId}`);
    });
  });

  // Handle direct hash navigation
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const matchingBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (matchingBtn) {
      activateTab(hash);
    }
  }

  // Modals Controller (Apply Here & Donate Button)
  const applyModal = document.getElementById('applyModal');
  const donateModal = document.getElementById('donateModal');
  const applyTriggers = document.querySelectorAll('.open-apply-modal, a[href="#apply"]');
  const donateTriggers = document.querySelectorAll('.open-donate-modal, a[href="#donate"]');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-cancel');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  applyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(applyModal);
    });
  });

  donateTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(donateModal);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close modal when clicking overlay backdrop
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });

  // Close modal with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // Handle Application Form Submission
  const applicationForm = document.getElementById('applicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = applicationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Application...';

      setTimeout(() => {
        submitBtn.innerHTML = 'Application Submitted!';
        submitBtn.style.backgroundColor = '#2d6a4f';
        
        setTimeout(() => {
          alert('Thank you for applying to the Nyab Dakpema Naa Digital Initiative (NDNDI). Your application has been received for the Entry Stage verification.');
          closeModal(applyModal);
          applicationForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 800);
      }, 1200);
    });
  }

  // Handle Donation / Partnership Form Submission
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = donationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Processing Pledge...';

      setTimeout(() => {
        submitBtn.innerHTML = 'Thank You!';
        submitBtn.style.backgroundColor = '#c88a24';

        setTimeout(() => {
          alert('Thank you for partnering with the Nyab Dakpema Naa Digital Initiative. Our team will connect with your institution shortly.');
          closeModal(donateModal);
          donationForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 800);
      }, 1200);
    });
  }

  // Handle Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      setTimeout(() => {
        alert('Thank you for reaching out to the Nyab Dakpema Naa Digital Initiative. We will get back to you shortly.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    });
  }
});


  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const body = trigger.nextElementSibling;

      // Close all
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.classList.add('open');
      }
    });
  });
