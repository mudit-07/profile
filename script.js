// ========================================
// SDG 12: Responsible Consumption & Production
// JavaScript for Interactivity and Data Visualization
// ========================================

// =====================================
// NAVIGATION & SCROLL EFFECTS
// =====================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active navigation link
    updateActiveNavLink();
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// =====================================
// CHART.JS DATA VISUALIZATION
// =====================================

// Chart configuration defaults
Chart.defaults.font.family = "'Poppins', sans-serif";
Chart.defaults.color = '#5D6D7E';

// Color palette for charts
const chartColors = {
    green: 'rgba(107, 191, 89, 0.8)',
    blue: 'rgba(142, 197, 232, 0.8)',
    orange: 'rgba(244, 162, 97, 0.8)',
    yellow: 'rgba(255, 183, 77, 0.8)',
    red: 'rgba(231, 76, 60, 0.8)',
    purple: 'rgba(155, 89, 182, 0.8)',
    teal: 'rgba(26, 188, 156, 0.8)',
    pink: 'rgba(231, 151, 174, 0.8)'
};

// Wait for DOM to load before creating charts
document.addEventListener('DOMContentLoaded', () => {
    createWasteBySectorChart();
    createFoodWasteChart();
    createConsumptionTrendChart();
    createPlasticWasteChart();
    createRecyclingRatesChart();
});

// Chart 1: Global Waste Generation by Sector (Bar Chart)
function createWasteBySectorChart() {
    const ctx = document.getElementById('wasteBySectr');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Municipal', 'Industrial', 'Construction', 'Agricultural', 'Electronic', 'Medical'],
            datasets: [{
                label: 'Annual Waste (Million Tonnes)',
                data: [2010, 2500, 1300, 1200, 54, 85],
                backgroundColor: [
                    chartColors.green,
                    chartColors.blue,
                    chartColors.orange,
                    chartColors.yellow,
                    chartColors.red,
                    chartColors.purple
                ],
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 191, 89, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Chart 2: Global Food Waste Distribution (Pie Chart)
function createFoodWasteChart() {
    const ctx = document.getElementById('foodWasteChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Household', 'Food Service', 'Retail', 'Processing', 'Production'],
            datasets: [{
                data: [570, 244, 118, 126, 210],
                backgroundColor: [
                    chartColors.green,
                    chartColors.blue,
                    chartColors.orange,
                    chartColors.yellow,
                    chartColors.teal
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return {
                                        text: `${label}: ${percentage}%`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value} million tonnes`;
                        }
                    }
                }
            }
        }
    });
}

// Chart 3: Material Consumption Growth (Line Chart)
function createConsumptionTrendChart() {
    const ctx = document.getElementById('consumptionTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2000', '2003', '2006', '2009', '2012', '2015', '2018', '2021', '2023'],
            datasets: [
                {
                    label: 'Global Material Consumption',
                    data: [54, 59, 65, 68, 75, 84, 92, 97, 101],
                    borderColor: chartColors.green,
                    backgroundColor: 'rgba(107, 191, 89, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: chartColors.green,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Sustainable Threshold',
                    data: [50, 50, 50, 50, 50, 50, 50, 50, 50],
                    borderColor: chartColors.red,
                    borderWidth: 2,
                    borderDash: [10, 5],
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} billion tonnes`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 191, 89, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + 'B';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Chart 4: Plastic Waste by Source (Horizontal Bar Chart)
function createPlasticWasteChart() {
    const ctx = document.getElementById('plasticWasteChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Packaging', 'Textiles', 'Consumer Products', 'Transportation', 'Building', 'Electronics'],
            datasets: [{
                label: 'Annual Plastic Waste (Million Tonnes)',
                data: [146, 42, 37, 19, 16, 13],
                backgroundColor: [
                    chartColors.blue,
                    chartColors.green,
                    chartColors.orange,
                    chartColors.yellow,
                    chartColors.teal,
                    chartColors.purple
                ],
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 191, 89, 0.1)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Chart 5: Recycling Rates by Material Type (Bar Chart)
function createRecyclingRatesChart() {
    const ctx = document.getElementById('recyclingRatesChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Paper', 'Steel', 'Aluminum', 'Glass', 'Plastic', 'E-Waste', 'Textiles', 'Food Waste'],
            datasets: [
                {
                    label: 'Current Recycling Rate (%)',
                    data: [66, 70, 50, 27, 9, 20, 15, 5],
                    backgroundColor: chartColors.green,
                    borderRadius: 8
                },
                {
                    label: 'Target Rate (%)',
                    data: [80, 85, 75, 60, 50, 50, 40, 30],
                    backgroundColor: chartColors.blue,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(107, 191, 89, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// =====================================
// SMOOTH SCROLL FOR NAVIGATION
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================
// CARD ANIMATIONS ON HOVER
// =====================================

// Add parallax effect to cards
const cards = document.querySelectorAll('.problem-card, .highlight-card, .action-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// =====================================
// STATISTICS COUNTER ANIMATION
// =====================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Observe stat items and animate when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const calcNumber = entry.target.querySelector('.calc-number');
            
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(number)) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber, number);
                }
            }
            
            if (calcNumber && !calcNumber.classList.contains('animated')) {
                const text = calcNumber.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(number)) {
                    calcNumber.classList.add('animated');
                    animateCounter(calcNumber, number);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item, .calc-stat').forEach(item => {
    statObserver.observe(item);
});

// =====================================
// IMAGE LAZY LOADING
// =====================================

const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// =====================================
// CONSOLE MESSAGE
// =====================================

console.log('%c🌍 SDG 12: Responsible Consumption & Production', 'color: #6BBF59; font-size: 20px; font-weight: bold;');
console.log('%cTogether, we can create a sustainable future! 🌱', 'color: #5D6D7E; font-size: 14px;');
console.log('%cLearn more at: https://sdgs.un.org/goals/goal12', 'color: #8EC5E8; font-size: 12px;');

// =====================================
// PERFORMANCE OPTIMIZATION
// =====================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based logic here
    });
}, { passive: true });

// =====================================
// INITIALIZE ON PAGE LOAD
// =====================================

window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize any other features
    console.log('✅ SDG 12 Website Loaded Successfully');
});
