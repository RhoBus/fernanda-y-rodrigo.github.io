// Countdown Timer Logic
const weddingDate = new Date("Oct 11, 2025 12:30:00").getTime();
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timer);
        if (countdownElement) {
            countdownElement.innerHTML = "¡LA FIESTA YA COMENZÓ!";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = String(days).padStart(2, '0');
    }
    if (document.getElementById("hours")) {
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    }
    if (document.getElementById("minutes")) {
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    }
    if (document.getElementById("seconds")) {
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// Fade-in on Scroll Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('header, section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Guest Section Logic
async function loadGuestSection() {
    const urlParams = new URLSearchParams(window.location.search);
    const familyKey = urlParams.get("flia")?.toLowerCase();;

    if (!familyKey) return;

    try {
        const response = await fetch("assets/guests.json");
        const guestsData = await response.json();

        if (guestsData[familyKey]) {
            const guestSection = `
                <section class="text-center py-20 px-4 floral-background">
                    <p class="font-script text-3xl sm:text-4xl md:text-5xl mb-8">Invitación Especial</p>
                    <p class="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-md mx-auto animate-pulse-grow">
                        ${guestsData[familyKey]}
                    </p>
                    <p class="mt-6 font-light text-sm sm:text-base">
                        NOS ENCANTARÍA SU COMPAÑÍA EN ESTE DÍA TAN ESPECIAL.
                    </p>
                </section>
            `;
            const guestSectionContainer = document.getElementById("guest-section");
            if (guestSectionContainer) {
                guestSectionContainer.innerHTML = guestSection;
            }
        }
    } catch (error) {
        console.error("Error cargando guests.json:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadGuestSection);