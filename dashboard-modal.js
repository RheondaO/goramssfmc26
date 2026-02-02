document.addEventListener('DOMContentLoaded', () => {
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




