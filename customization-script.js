// ===== Floor Visualizer Data =====
const floorData = {
    ground: {
        standard: 'images/ground-floor-standard.png',
        custom: 'images/ground-floor-custom.png',
        rooms: {
            bedroom1: {
                name: 'Bedroom 1',
                standard: 'Botticino Classico Light Tiles',
                custom: 'Italian Botticino Marble'
            },
            kitchen: {
                name: 'Kitchen',
                standard: 'Botticino Classico Light Tiles',
                custom: 'Italian Botticino Marble'
            }
        }
    },
    first: {
        standard: 'images/first-floor-standard.png',
        custom: 'images/first-floor-custom.png',
        rooms: {
            bedroom2: {
                name: 'Bedroom 2',
                standard: 'Botticino Classico Light Tiles',
                custom: 'Italian Botticino Marble'
            },
            master: {
                name: 'Master Bedroom',
                standard: 'Laminated Wooden Flooring',
                custom: 'Italian Botticino Marble'
            },
            lounge: {
                name: 'Family Lounge',
                standard: 'Botticino Classico Light Tiles',
                custom: 'Italian Botticino Marble'
            }
        }
    },
    second: {
        standard: 'images/second-floor-standard.png',
        custom: 'images/second-floor-custom.png',
        rooms: {
            bedroom3: {
                name: 'Bedroom 3',
                standard: 'Botticino Classico Light Tiles',
                custom: 'Italian Botticino Marble'
            },
            theatre: {
                name: 'Home Theatre',
                standard: 'Laminated Wooden Flooring',
                custom: 'Italian Botticino Marble'
            }
        }
    }
};

// ===== State Management =====
let currentFloor = 'ground';
let currentView = 'standard';

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initializeVisualizer();
    initializeMaterialTabs();
    initializeScrollEffects();
});

// ===== Visualizer Functions =====
function initializeVisualizer() {
    // View Toggle (Standard vs Custom)
    const viewToggles = document.querySelectorAll('.view-toggle');
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            viewToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            currentView = toggle.dataset.view;
            updateVisualizerImage();
        });
    });

    // Floor Selector
    const floorButtons = document.querySelectorAll('.floor-btn');
    floorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            floorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFloor = btn.dataset.floor;
            updateVisualizerImage();
            updateFloorInfo();
        });
    });

    // Initial load
    updateVisualizerImage();
    updateFloorInfo();
}

function updateVisualizerImage() {
    const visualizerImg = document.getElementById('visualizer-main');
    const imageUrl = floorData[currentFloor][currentView];
    visualizerImg.src = imageUrl;
}

function updateFloorInfo() {
    const infoDiv = document.getElementById('visualizer-info');
    const rooms = floorData[currentFloor].rooms;
    
    let html = `
        <h4>${currentFloor.charAt(0).toUpperCase() + currentFloor.slice(1)} Floor - ${currentView.charAt(0).toUpperCase() + currentView.slice(1)} Configuration</h4>
        <div style="display: grid; gap: 1rem; margin-top: 1rem;">
    `;
    
    Object.keys(rooms).forEach(roomKey => {
        const room = rooms[roomKey];
        html += `
            <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid var(--color-primary);">
                <strong style="color: var(--color-primary);">${room.name}</strong>
                <p style="margin-top: 0.5rem; color: var(--color-gray);">
                    ${currentView === 'standard' ? room.standard : room.custom}
                </p>
            </div>
        `;
    });
    
    html += '</div>';
    infoDiv.innerHTML = html;
}

// ===== Material Tabs =====
function initializeMaterialTabs() {
    const tabs = document.querySelectorAll('.material-tab');
    const cards = document.querySelectorAll('.material-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter cards
            cards.forEach(card => {
                if (card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Show flooring by default
    cards.forEach(card => {
        if (card.dataset.category !== 'flooring') {
            card.style.display = 'none';
        }
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Effects =====
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe package cards and floor sections
    document.querySelectorAll('.package-card, .floor-section, .material-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Package Card Interactions =====
document.querySelectorAll('.package-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const packageNum = btn.closest('.package-card').dataset.package;
        alert(`Request quote for Package ${packageNum}\n\nThis would open a contact form or redirect to a quote request page.`);
    });
});

// ===== CTA Button Interactions =====
document.querySelectorAll('.cta-section .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (btn.textContent.includes('Quote')) {
            alert('Opening quote request form...\n\nIn production, this would open a modal or navigate to a contact page.');
        } else if (btn.textContent.includes('Site Visit')) {
            alert('Scheduling site visit...\n\nIn production, this would open a calendar booking interface.');
        }
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
