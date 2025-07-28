const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const form = document.querySelector(".contact-form");
const successMessage = document.getElementById("success-message");
const menuIcon = document.getElementById("menu-toggle"); // ndryshimi kryesor këtu
const navUl = document.querySelector("nav ul");

// Scrolli për aktivizimin e linkut në navbar
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Submit i formës
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000); // mesazhi fshihet pas 5 sekondash
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
});


// Hamburger menu toggle
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("open");
  navUl.classList.toggle("open");
});

// Mbyllja e menusë kur klikohet një link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("open");
    navUl.classList.remove("open");
  });
});

// 1. Krijo observer-in SË PARI
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

// 2. Pastaj selekto dhe vëzhgo elementët .hidden
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));