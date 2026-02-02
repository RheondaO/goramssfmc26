  const modal = document.getElementById('iframeModal');
  const openBtn = document.querySelector('.open-modal');
  const closeBtn = document.querySelector('.close-modal');

  openBtn.onclick = () => {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    modal.showModal();
  };

  closeBtn.onclick = () => {
    modal.close();
  };

  modal.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  });
