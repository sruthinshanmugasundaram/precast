(function () {
  const loader = document.getElementById('site-loader');
  const loaderCard = document.getElementById('loader-card');

  // Utility: show/hide loader
  const showLoader = () => {
    if (!loader) return;
    loader.setAttribute('aria-hidden', 'false');
    loader.style.pointerEvents = 'auto';
  };

  const hideLoader = () => {
    if (!loader || !loaderCard) return;
    loaderCard.classList.add('hidden-fast');
    setTimeout(() => {
      loader.setAttribute('aria-hidden', 'true');
      loaderCard.classList.remove('hidden-fast');
      loader.style.pointerEvents = 'none';
    }, 220);
  };

  // 1) Hide loader when window fully loads
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 120);
  });

  // 2) Safety hide if already loaded
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 80);
  }

  // 3) Show loader on internal navigation
  function isSameOriginHref(href) {
    try {
      const url = new URL(href, location.href);
      return url.origin === location.origin;
    } catch (e) { return false; }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.target && a.target.toLowerCase() === '_blank') return;
    if (a.hasAttribute('download')) return;
    if (!a.href) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#')) return;
    if (isSameOriginHref(a.href)) showLoader();
  }, { capture: true });

  // 4) Show loader on form submit
  document.addEventListener('submit', (e) => showLoader(), true);

  // 5) Patch history API for SPA transitions
  (function patchHistory() {
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    history.pushState = function (...args) {
      showLoader();
      return origPush.apply(this, args);
    };
    history.replaceState = function (...args) {
      showLoader();
      return origReplace.apply(this, args);
    };
    window.addEventListener('popstate', () => showLoader());
  })();

  // 6) Safety timeout (if loader fails)
  setTimeout(() => {
    if (loader && loader.getAttribute('aria-hidden') !== 'true') hideLoader();
  }, 15000);
})();



// ===== HEADER LOGIC =====
window.addEventListener("load", () => {
  const loader = document.getElementById("site-loader");
  if (loader) setTimeout(() => loader.setAttribute("aria-hidden", "true"), 300);
});


// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}


// ===== ENABLE SUBMENU TOGGLE (MOBILE) =====
document.querySelectorAll(".dropdown > a").forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle("open");
    }
  });
});


// ===== SCROLL TO TOP BUTTON =====
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// ===== SHRINK HEADER ON SCROLL =====
window.addEventListener("scroll", function () {
  const header = document.querySelector(".main-header");
  if (!header) return;
  if (window.scrollY > 80) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});






// about page js

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });

  document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));








//project completed section
document.addEventListener("DOMContentLoaded", () => {
  const fills = document.querySelectorAll(".progress-fill");
  fills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = "0";
    setTimeout(() => {
      fill.style.width = width;
    }, 300);
  });
});









//hollow core slabs img slider
  const track = document.querySelector('.slider-track');
  let position = 0;

  function autoSlide() {
    position -= 310; // image width + margin
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  }

  setInterval(autoSlide, 2000);





  //OVERVIEW PAGE 

  // Fade-in animation on scroll
  const fadeEls = document.querySelectorAll(".fade-in");
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => appearOnScroll.observe(el));






//SPECIAL PURPOSE TANKS FAQ
  document.querySelectorAll(".faqPage-question").forEach(item => {
      item.addEventListener("click", () => {
        const parent = item.parentElement;
        parent.classList.toggle("active");
      });
    });



    (function(){
  // defensive: wait until DOM ready
  function ready(fn){ if(document.readyState!='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }

  ready(function(){
    const wrapper = document.getElementById('faqX-wrapper');
    if(!wrapper) return;

    // Event delegation for performance and to avoid conflicts
    wrapper.addEventListener('click', function(e){
      const btn = e.target.closest('.faqX-q');
      if(!btn) return;
      const item = btn.parentElement;
      const answer = item.querySelector('.faqX-a');

      // toggle visibility using aria-expanded + hidden attribute
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // close all if you want only-one-open at a time — comment next block to allow multiple open
      wrapper.querySelectorAll('.faqX-q').forEach(b => {
        if(b !== btn){ b.setAttribute('aria-expanded','false'); const a = b.parentElement.querySelector('.faqX-a'); if(a) a.hidden = true; b.parentElement.classList.remove('faqX-open'); }
      });

      // toggle clicked item
      if(isOpen){
        btn.setAttribute('aria-expanded','false');
        if(answer) answer.hidden = true;
        item.classList.remove('faqX-open');
      } else {
        btn.setAttribute('aria-expanded','true');
        if(answer) answer.hidden = false;
        item.classList.add('faqX-open');
      }
    });

    // optional: keyboard accessibility (Enter / Space)
    wrapper.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        const btn = e.target.closest('.faqX-q');
        if(!btn) return;
        e.preventDefault();
        btn.click();
      }
    });
  });
})();











//Manhole Chambers / Utility Chambers PAGE
    (function(){
      const items = document.querySelectorAll('.mhc-gallery-item');
      const modal = document.getElementById('mhcModal');
      const modalImg = document.getElementById('mhcModalImg');
      const modalClose = document.getElementById('mhcModalClose');

      items.forEach(it => {
        it.addEventListener('click', () => {
          const full = it.getAttribute('data-full') || it.querySelector('img').src;
          modalImg.src = full;
          modal.setAttribute('aria-hidden','false');
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      function closeModal(){
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden','true');
        modalImg.src = '';
        document.body.style.overflow = '';
      }

      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) closeModal();
      });
    })();












//Pre-stressed Purlins PAGE
     (function(){
    const section = document.querySelector('.purlins-gallery');
    if (!section) return;
    const track = section.querySelector('.purlins-gal-track');
    const imgs = Array.from(track.querySelectorAll('img'));
    const prev = section.querySelector('.purlins-prev');
    const next = section.querySelector('.purlins-next');

    let idx = 0;
    function show(i){
      idx = (i + imgs.length) % imgs.length;
      const offset = -idx * 100;
      track.style.transform = 'translateX(' + offset + '%)';
      section.setAttribute('data-current', idx);
    }
    prev.addEventListener('click', () => show(idx - 1));
    next.addEventListener('click', () => show(idx + 1));

    // Auto-advance every 3s
    let auto = setInterval(() => show(idx + 1), 3000);
    section.addEventListener('mouseenter', () => clearInterval(auto));
    section.addEventListener('mouseleave', () => { auto = setInterval(() => show(idx + 1), 3000); });

    // make track width depend on number of images
    track.style.width = (imgs.length * 100) + '%';
    imgs.forEach(img => img.style.width = (100 / imgs.length) + '%');

    // init
    show(0);
  })();