// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current || link.textContent.trim().toLowerCase() === current) {
            link.classList.add('active');
        }
    });
});

// Notice rotator (for notices.html)
function rotateNotices() {
    const notices = document.querySelectorAll('.notice-item');
    let currentNotice = 0;
    
    setInterval(() => {
        notices.forEach(notice => notice.classList.remove('active'));
        notices[currentNotice].classList.add('active');
        currentNotice = (currentNotice + 1) % notices.length;
    }, 5000);
}