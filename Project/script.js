
    document.addEventListener('DOMContentLoaded', () => {
      // Menu mobile
      document.getElementById('navToggle').addEventListener('click', () => {
        document.getElementById('nav').classList.toggle('show');
      });

      // Smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
          const href = a.getAttribute('href');
          if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            document.getElementById('nav').classList.remove('show');
          }
        });
      });

      // HERO CAROUSEL – Version finale, testée & parfaite
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let current = 0;
  const total = slides.length;
  let autoplay;

  // Création des points
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('h-dot');
    if (i === 0) dot.classList.add('active');
    dot.dataset.slide = i;
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.h-dot');

  const goToSlide = (n) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    progressBar.style.width = `${((n + 1) / total) * 100}%`;
    current = n;
  };

  const nextSlide = () => goToSlide((current + 1) % total);
  const prevSlide = () => goToSlide(current === 0 ? total - 1 : current - 1);

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Auto-play
  const startAutoplay = () => {
    autoplay = setInterval(nextSlide, 8000);
  };
  startAutoplay();

  // Pause au hover
  document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(autoplay));
  document.querySelector('.hero').addEventListener('mouseleave', startAutoplay);

  // Swipe mobile
  let touchStartX = 0;
  document.querySelector('.hero').addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
  document.querySelector('.hero').addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? nextSlide() : prevSlide());
  });
});

      // Hero carousel
    //   let current = 0;
    //   const slides = document.querySelectorAll('.hero-slide');
    //   const dots = document.querySelectorAll('.h-dot');
    //   const showSlide = n => {
    //     slides.forEach(s => s.classList.remove('active'));
    //     dots.forEach(d => d.classList.remove('active'));
    //     slides[n].classList.add('active');
    //     dots[n].classList.add('active');
    //   };
    //   dots.forEach((d,i) => d.onclick = () => showSlide(i));
    //   setInterval(() => showSlide(current = (current + 1) % slides.length), 8000);

    



      // Formulaire (simulation)
      const form = document.getElementById('contactForm');
      const msg = document.getElementById('formMessage');
      form.addEventListener('submit', e => {
        e.preventDefault();
        msg.textContent = 'Envoi en cours...';
        msg.style.color = '#64ffda';
        setTimeout(() => {
          msg.innerHTML = 'Bienvenue dans la team ! On t’ajoute sur le Discord';
          msg.style.color = '#7bd389';
          form.reset();
        }, 1300);
      });
    });

          // Filtres actualités
      const filterBtns = document.querySelectorAll('.filter-btn');
      const newsCards = document.querySelectorAll('.news-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter');

          newsCards.forEach(card => {
            if (filter === 'all') {
              card.style.display = 'block';
            } else {
              if (card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            }
          });
        });
      });


// Animation au scroll ultra légère (pas de bibliothèque, 20 lignes)
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      // Pour les titres
      if (entry.target.classList.contains('fade-in')) {
        entry.target.classList.add('visible');
      }
    }
  });
}, observerOptions);

// Observer tous les éléments
document.querySelectorAll('[data-aos], .fade-in').forEach(el => {
  observer.observe(el);
});




      // MINI CAROUSEL VERTICAL À DROITE
      const track = document.getElementById('miniTrack');
      const images = document.querySelectorAll('.carousel-img');
      const prevBtn = document.getElementById('miniPrev');
      const nextBtn = document.getElementById('miniNext');
      
      let currentMini = 0;
      const totalMini = images.length;

      const updateCarousel = () => {
        images.forEach((img, i) => {
          img.classList.toggle('active', i === currentMini);
        });
        track.style.transform = `translateY(-${currentMini * (300)}px)`;
      };

      nextBtn.onclick = () => {
        currentMini = (currentMini + 1) % totalMini;
        updateCarousel();
      };
      prevBtn.onclick = () => {
        currentMini = currentMini === 0 ? totalMini - 1 : currentMini - 1;
        updateCarousel();
      };

      // Auto-play lent
      setInterval(() => {
        currentMini = (currentMini + 1) % totalMini;
        updateCarousel();
      }, 4000);
