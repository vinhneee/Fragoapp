const SWIPE_THRESHOLD = 180;
const container = document; // Use document or a specific parent container like document.querySelector(".profiles-container")
let isDragging = false;
let currentCard = null;
let offsetX = 0;
let offsetY = 0;

// Function to initialize drag behavior for a single card
function initializeDrag(card) {
    card.style.position = "relative"; // Ensure position: relative
    card.style.transition = "transform 0.3s ease, opacity 0.3s ease"; // Default transition
}

// Mouse events
container.addEventListener("mousedown", (e) => {
    const card = e.target.closest(".profile:not(.hidden)");
    if (!card || isDragging) return;
    
    isDragging = true;
    currentCard = card;
    offsetX = e.clientX;
    offsetY = e.clientY;
    card.classList.add("dragging");
    document.body.style.userSelect = "none";
});

container.addEventListener("mousemove", (e) => {
    if (!isDragging || !currentCard) return;
    const deltaX = e.clientX - offsetX;
    const deltaY = e.clientY - offsetY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`;
    }
});

container.addEventListener("mouseup", (e) => {
    if (!isDragging || !currentCard) return;
    isDragging = false;
    currentCard.classList.remove("dragging");
    document.body.style.userSelect = "";
    const deltaX = e.clientX - offsetX;
    const deltaY = e.clientY - offsetY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        currentCard.style.transform = `translateX(${deltaX > 0 ? 1000 : -1000}px) rotate(${deltaX / 5}deg)`;
        currentCard.style.opacity = 0;
        setTimeout(() => {
            currentCard.remove();
            showNextHiddenProfile();
            currentCard = null;
        }, 300);
    } else {
        currentCard.style.transform = "";
        currentCard = null;
    }
});

container.addEventListener("mouseleave", () => {
    if (isDragging && currentCard) {
        isDragging = false;
        currentCard.classList.remove("dragging");
        document.body.style.userSelect = "";
        currentCard.style.transform = "";
        currentCard = null;
    }
});

// Touch events
container.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    const card = e.target.closest(".profile:not(.hidden)");
    if (!card || isDragging) return;

    isDragging = true;
    currentCard = card;
    offsetX = e.touches[0].clientX;
    offsetY = e.touches[0].clientY;
    card.classList.add("dragging");
});

container.addEventListener("touchmove", (e) => {
    if (!isDragging || !currentCard || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - offsetX;
    const deltaY = e.touches[0].clientY - offsetY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`;
    }
});

container.addEventListener("touchend", (e) => {
    if (!isDragging || !currentCard) return;
    isDragging = false;
    currentCard.classList.remove("dragging");
    const deltaX = e.changedTouches[0].clientX - offsetX;
    const deltaY = e.changedTouches[0].clientY - offsetY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        currentCard.style.transform = `translateX(${deltaX > 0 ? 1000 : -1000}px) rotate(${deltaX / 5}deg)`;
        currentCard.style.opacity = 0;
        setTimeout(() => {
            currentCard.remove();
            showNextHiddenProfile();
            currentCard = null;
        }, 300);
    } else {
        currentCard.style.transform = "";
        currentCard = null;
    }
});

// Function to show the next hidden profile
function showNextHiddenProfile() {
    const hiddenProfile = document.querySelector(".profile.hidden");
    if (hiddenProfile) {
        hiddenProfile.classList.remove("hidden");
        hiddenProfile.style.opacity = 0;
        hiddenProfile.offsetHeight; // Force reflow
        hiddenProfile.style.transition = "opacity 0.3s ease";
        hiddenProfile.style.opacity = 1;
        initializeDrag(hiddenProfile); // Ensure new profile has correct styles
    }
}

// Initialize existing profiles

function applyBrowserResolution() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const body = document.body;
    const content = document.querySelector('.content');
    const container = document.querySelector('.container');

    // Apply viewport resolution to body
    body.style.width = `${viewportWidth}px`;
    body.style.height = `${viewportHeight}px`;

    // Apply content dimensions, respecting min/max constraints
    content.style.width = `${Math.min(Math.max(viewportWidth, 375), 430)}px`;
    content.style.height = `${Math.min(Math.max(viewportHeight, 667), 932)}px`;

    // Adjust container height to fit within body, accounting for safe areas, padding, and nav
    const safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '12');
    const safeAreaBottom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0');
    const containerHeight = viewportHeight - safeAreaTop - safeAreaBottom - 24 - 64;
    container.style.height = `${Math.min(containerHeight, 932 - 64 - 24)}px`;

    // Log for debugging
    console.log(`Viewport: ${viewportWidth}x${viewportHeight}px`);
    console.log(`Body: ${body.style.width}x${body.style.height}`);
    console.log(`Content: ${content.style.width}x${content.style.height}`);
    console.log(`Container Height: ${container.style.height}`);
}

// Run on load
applyBrowserResolution();

// Update on resize, orientation change, or scroll (for address bar collapse)
window.addEventListener('resize', applyBrowserResolution);
window.addEventListener('orientationchange', applyBrowserResolution);
window.addEventListener('scroll', applyBrowserResolution);

// Single-choice: chỉ những nhóm không có class "multi"
document.querySelectorAll('.optionGroup:not(.multi)').forEach(group => {
  const options = group.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
});

// Multi-choice
document.querySelectorAll('.optionGroup.multi').forEach(group => {
  const options = group.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
    });
  });
});

// Form next page button
function goToPage(direction) {
    const pages = document.querySelectorAll('.formPage');
    let currentIndex = Array.from(pages).findIndex(page => !page.classList.contains('hidden'));

    // Tính index trang mới
    let newIndex = currentIndex;

    if(direction === 'next') {
        newIndex = Math.min(currentIndex + 1, pages.length - 1); // dừng ở cuối
    } else if(direction === 'back') {
        newIndex = Math.max(currentIndex - 1, 0); // dừng ở đầu
    }

    if(newIndex === currentIndex) {
        window.location.href = 'premium.html';
    }

    // Ẩn trang hiện tại
    pages[currentIndex].classList.add('hidden');
    // Hiển thị trang mới
    pages[newIndex].classList.remove('hidden');
    const backBtn = document.getElementById('back-btn');
    if(newIndex === 0){
        backBtn.style.visibility = 'hidden';
    } else {
        backBtn.style.visibility = 'visible';
    }
}
function ifUserSupplier(x=0) {
    if (x === 0) {
        // Ẩn tất cả formForSupplier
        document.querySelectorAll('.formForSupplier').forEach(el => el.classList.add('hidden'));
        // Hiển thị tất cả formForUser
        document.querySelectorAll('.formForUser').forEach(el => el.classList.remove('hidden'));
    } else if (x === 1) {
        // Ẩn tất cả formForUser
        document.querySelectorAll('.formForUser').forEach(el => el.classList.add('hidden'));
        // Hiển thị tất cả formForSupplier
        document.querySelectorAll('.formForSupplier').forEach(el => el.classList.remove('hidden'));
    }
    localStorage.setItem("ifUserSupplier", x);
}

window.onload = function () {
    const option = parseInt(localStorage.getItem("ifUserSupplier") ?? 0, 10);
    document.getElementById("homeForUser").classList.toggle("hidden", option !== 0);
    document.getElementById("homeForSupplier").classList.toggle("hidden", option !== 1);
}