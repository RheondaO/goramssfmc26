 // 1. Listen for clicks on the entire document
document.addEventListener('click', function (e) {
    
    // Check if the user clicked a wireframe card (or something inside it)
    const card = e.target.closest('.wireframe-card');
    
    if (card) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');

        // Only proceed if the modal elements actually exist in the current HTML
        if (modal && modalImage) {
            modalImage.src = card.dataset.image;
            modalImage.alt = card.dataset.title;
            modalTitle.textContent = card.dataset.title;
            modalDesc.textContent = card.dataset.desc;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        }
    }

    // Check if the user clicked the close button OR the dark backdrop
    if (e.target.classList.contains('close-modal') || e.target.id === 'imageModal') {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }
});

// 2. Handle the Escape key (Global listener)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});
