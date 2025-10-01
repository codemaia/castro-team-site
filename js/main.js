document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica do Menu Mobile ---
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Fechar menu mobile ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // --- Lógica do Carrossel (Hero Section) ---
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  if (totalSlides > 0) {
    // Inicializa o carrossel no primeiro slide
    showSlide(currentSlide);

    // Auto-play
    let interval = setInterval(nextSlide, 5000);

    // Botões (se existirem)
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        clearInterval(interval);
        prevSlide();
        interval = setInterval(nextSlide, 5000);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        clearInterval(interval);
        nextSlide();
        interval = setInterval(nextSlide, 5000);
      });
    }

    // (Opcional) swipe no mobile
    let startX = null;
    const area = document.getElementById("carousel");
    if (area) {
      area.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );
      area.addEventListener(
        "touchend",
        (e) => {
          if (startX === null) return;
          const endX = e.changedTouches[0].clientX;
          const diff = endX - startX;
          if (Math.abs(diff) > 50) {
            clearInterval(interval);
            diff < 0 ? nextSlide() : prevSlide();
            interval = setInterval(nextSlide, 5000);
          }
          startX = null;
        },
        { passive: true }
      );
    }
  }
});
