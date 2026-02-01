    // Click to enlarge functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = document.querySelector('.close-modal');
    const wireframeCards = document.querySelectorAll('.wireframe-card');

    wireframeCards.forEach(card => {
        card.addEventListener('click', function() {
            const imageSrc = this.dataset.image;
            const title = this.dataset.title;
            const desc = this.dataset.desc;
            
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
