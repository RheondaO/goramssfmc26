// Global click listener
document.addEventListener('click', function (e) {
    // Open fullscreen modal
    if (e.target.id === 'openFullscreen' || e.target.closest('#openFullscreen')) {
        const modal = document.getElementById('iframeModal');
        if (modal) {
            modal.showModal();
            document.body.style.overflow = 'hidden'; // prevent background scroll
        }
    }

    // Close modal via close button or backdrop click
    if (
        e.target.classList.contains('close-calculator') ||
        e.target.id === 'iframeModal'
    ) {
        const modal = document.getElementById('iframeModal');
        if (modal) {
            modal.close();
            document.body.style.overflow = 'auto'; // restore scroll
        }
    }
});

// Escape key closes modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('iframeModal');
        if (modal && modal.open) {
            modal.close();
            document.body.style.overflow = 'auto';
        }
    }
});

/* document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('iframeModal');
    const openBtn = document.getElementById('openFullscreen');
    const closeBtn = document.getElementById('closeModal');

    openBtn.addEventListener('click', () => {
      modal.showModal();
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    });

    closeBtn.addEventListener('click', () => {
      modal.close();
    });

    modal.addEventListener('close', () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    });
  });
*/
