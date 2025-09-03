// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking nav links
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Hero Slider Functionality
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

// Auto-advance slider every 5 seconds
function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Set up auto-advance
let slideInterval = setInterval(autoSlide, 5000);

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
        // Reset auto-advance timer
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const submitButton = contactForm.querySelector(".submit-button");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous errors
    clearFormErrors();

    // Validate form
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    let hasErrors = false;

    if (!name) {
        showFieldError("name", "Name is required");
        hasErrors = true;
    }

    if (!email) {
        showFieldError("email", "Email is required");
        hasErrors = true;
    } else if (!isValidEmail(email)) {
        showFieldError("email", "Please enter a valid email address");
        hasErrors = true;
    }

    if (!message) {
        showFieldError("message", "Message is required");
        hasErrors = true;
    }

    if (hasErrors) return;

    // Show loading state
    submitButton.classList.add("loading");
    submitButton.textContent = "Sending...";

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Show success message
        showSuccessMessage();
        contactForm.reset();
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting your message. Please try again.");
    } finally {
        // Reset button state
        submitButton.classList.remove("loading");
        submitButton.textContent = "Send Message";
    }
});

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.parentElement;

    field.classList.add("error");

    // Remove existing error message
    const existingError = formGroup.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function clearFormErrors() {
    // Remove error classes and messages
    document
        .querySelectorAll(".form-group input, .form-group textarea")
        .forEach((field) => {
            field.classList.remove("error");
        });

    document.querySelectorAll(".error-message").forEach((error) => {
        error.remove();
    });

    // Hide success message
    const successMessage = document.querySelector(".success-message");
    if (successMessage) {
        successMessage.classList.remove("show");
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Create success message if it doesn't exist
    let successMessage = document.querySelector(".success-message");
    if (!successMessage) {
        successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent =
            "Thank you! Your message has been sent successfully.";
        contactForm.insertBefore(successMessage, contactForm.firstChild);
    }

    successMessage.classList.add("show");

    // Hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove("show");
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll(".service-card, .testimonial-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});
