const navLinks = document.querySelectorAll('.nav a[href^="#"]');

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (navSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  navSections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll('[data-open-dialog]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.openDialog);
    if (dialog) dialog.showModal();
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  const closeBtn = dialog.querySelector('.case-dialog-close');
  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
