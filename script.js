document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Typing effect
  const typingText = document.getElementById("typing-text");
  const texts = ["Programmer", "Designer", "Creator"]; // Ganti dengan nama Anda atau teks lain
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 150);
    }
  }

  // Start typing effect
  setTimeout(type, 1000);

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-bar");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      if (isElementInViewport(bar)) {
        bar.style.width = width;
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Check on load and scroll
  animateSkillBars();
  window.addEventListener("scroll", animateSkillBars);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert(
        `Terima kasih, ${name}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda melalui email (${email}).`
      );

      // Reset form
      contactForm.reset();
    });
  }
});
