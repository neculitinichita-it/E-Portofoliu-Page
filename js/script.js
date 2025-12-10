// Meniu hamburger pentru mobil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle meniu mobil
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Închide meniul când dai click pe un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Activează link-ul curent în navbar
const currentPage = window.location.pathname.split('/').pop();
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Galerie foto cu lightbox (pentru pagina galerie.html)
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    
    if (galleryImages.length > 0) {
        // Deschide lightbox la click pe imagine
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImageIndex = index;
                updateLightbox();
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Închide lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Navigare în lightbox
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightbox();
        });
        
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightbox();
        });
        
        // Închide cu Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        function updateLightbox() {
            const currentImg = galleryImages[currentImageIndex];
            lightboxImg.src = currentImg.src;
            lightboxCaption.textContent = currentImg.alt;
        }
    }
}

// Verifică dacă există placeholder pentru poza de profil
const profileImg = document.getElementById('profile-img');
const imgPlaceholder = document.getElementById('img-placeholder');

if (profileImg && imgPlaceholder) {
    // Ascunde placeholder-ul dacă există imaginea
    profileImg.onload = function() {
        if (this.naturalWidth > 0) {
            imgPlaceholder.style.display = 'none';
        }
    };
    
    // Dacă imaginea nu există, arată placeholder-ul
    profileImg.onerror = function() {
        this.style.display = 'none';
        imgPlaceholder.style.display = 'flex';
    };
    
    // Verifică inițial
    if (!profileImg.complete || profileImg.naturalWidth === 0) {
        profileImg.style.display = 'none';
        imgPlaceholder.style.display = 'flex';
    }
}

// Formular de contact placeholder
document.addEventListener('DOMContentLoaded', function() {
    // Verifică dacă suntem pe pagina de contact
    if (window.location.pathname.includes('contacte.html')) {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Formularul a fost trimis! (Acesta este un placeholder. Înlocuiți cu Google Forms)');
                this.reset();
            });
        }
    }
    
    // Inițializează galeria dacă există
    if (document.querySelector('.gallery-item')) {
        initGallery();
    }
    
    // Smooth scroll pentru link-uri interne
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Adaugă efect de hover pentru card-uri
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});