/* =======================================================
   NOOR AI — MAIN JAVASCRIPT FILE
   Each feature is written as its own small, simple section
   so it's easy to read and easy to edit.
======================================================= */


/* -------------------------------------------------------
   1. SHOW CURRENT YEAR IN FOOTER
------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();


/* -------------------------------------------------------
   2. DARK / LIGHT MODE TOGGLE
   We just switch a "data-theme" attribute on <body>.
   All colors are controlled by CSS variables, so this
   single line changes the whole website's color scheme.
------------------------------------------------------- */
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }
});


/* -------------------------------------------------------
   3. HAMBURGER MENU (MOBILE)
   Clicking the hamburger icon opens/closes the mobile
   side menu and a dark overlay behind it.
------------------------------------------------------- */
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay    = document.getElementById("overlay");

function openMenu() {
  mobileMenu.classList.add("open");
  overlay.classList.add("open");
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("open");
}

hamburger.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);

// Close the menu automatically when a link inside it is clicked
document.querySelectorAll("#mobile-menu a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});


/* -------------------------------------------------------
   4. STICKY NAVBAR + SCROLL-TO-TOP BUTTON
   Both features depend on how far the user has scrolled,
   so we check the scroll position once and update both.
------------------------------------------------------- */
const navbar    = document.getElementById("navbar");
const scrollTop = document.getElementById("scroll-top");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;

  // Add shadow/border to navbar once page is scrolled a bit
  if (scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Show the scroll-to-top button after scrolling down 400px
  if (scrollY > 400) {
    scrollTop.classList.add("visible");
  } else {
    scrollTop.classList.remove("visible");
  }
});

// Smooth scroll back to the top when the button is clicked
scrollTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* -------------------------------------------------------
   5. CONTACT FORM VALIDATION
   We check each field one by one. If a field is invalid,
   we add the "invalid" class to it (CSS shows a red
   border + the matching error message automatically).
------------------------------------------------------- */
const form        = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");

// Change this if your backend runs somewhere other than localhost:5000
// (for example, your live Render/Railway URL after you deploy it).
const API_URL = "http://localhost:5000/api/contact";

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // stop the page from reloading

  let isValid = true;

  // Check name (must be at least 2 characters)
  if (nameInput.value.trim().length < 2) {
    nameInput.classList.add("invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("invalid");
  }

  // Check email (simple pattern: something@something.something)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailInput.classList.add("invalid");
    isValid = false;
  } else {
    emailInput.classList.remove("invalid");
  }

  // Check message (must be at least 10 characters)
  if (messageInput.value.trim().length < 10) {
    messageInput.classList.add("invalid");
    isValid = false;
  } else {
    messageInput.classList.remove("invalid");
  }

  // Stop here if the browser-side checks failed
  if (!isValid) {
    formMessage.textContent = "❌ Please fix the highlighted fields.";
    formMessage.className = "form-message fail";
    return;
  }

  // Data looks good — send it to the backend, which saves it in MongoDB
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      formMessage.textContent = "✅ Thank you! Your message has been sent.";
      formMessage.className = "form-message success";
      form.reset();
    } else {
      formMessage.textContent = "❌ " + (result.error || "Could not send your message.");
      formMessage.className = "form-message fail";
    }

  } catch (error) {
    // This runs if the backend server isn't running or isn't reachable
    formMessage.textContent = "❌ Could not reach the server. Is the backend running?";
    formMessage.className = "form-message fail";
    console.error("Contact form error:", error);

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
});

// Remove the red "invalid" state as soon as the user starts typing again
[nameInput, emailInput, messageInput].forEach(function (input) {
  input.addEventListener("input", function () {
    input.classList.remove("invalid");
  });
});
