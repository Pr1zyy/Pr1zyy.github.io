document.body.classList.add('loading');
document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');

    window.onload = function() {
        
        if(preloader) {
            preloader.classList.add('preloader-hidden');
        }

        document.body.classList.remove('loading');

        setTimeout(() => {
            if (preloader) {
                preloader.remove();
            }
        }, 500); 
    };

    const textElement = document.getElementById('typing-text');
    const textToType = "EXPLORE 14K";
    const typingSpeed = 100; 
    let charIndex = 0;

    const mainHeader = document.querySelector('.header-container');
    const headerWrapper = document.querySelector('.background-header-hero');
    const scrollTrigger = 50; 

    function handleScroll() {
        if (window.scrollY >= scrollTrigger) {
            mainHeader.classList.add('sticky');
            headerWrapper.classList.add('sticky-active');
        } else {
            mainHeader.classList.remove('sticky');
            headerWrapper.classList.remove('sticky-active');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const cards = document.querySelectorAll('.cards-three');
    const maxTilt = 10; 

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { clientWidth: width, clientHeight: height } = card;
            const { offsetX, offsetY } = e;
            const x = (offsetX / width) - 0.5;
            const y = (offsetY / height) - 0.5;
            const rotateY = x * (maxTilt * 2); 
            const rotateX = -y * (maxTilt * 2); 

            card.style.transition = 'transform 0.05s linear'; 
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease-out'; 
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    const counters = document.querySelectorAll('.counter');
    const animationDuration = 2000; 

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    };

    const observerOptions = { threshold: 0.25 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    function animateCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const startTime = Date.now(); 

        function updateCounter() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(1, elapsedTime / animationDuration);
            const currentValue = Math.floor(progress * target);

            counterElement.innerText = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOptions = { root: null, threshold: 0.15, rootMargin: '0px' };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    const parallaxElement = document.querySelector('.background');
    const speed = 0.3; 

    function applyParallax() {

        const scrollPosition = window.scrollY; 
        
        const yOffset = scrollPosition * speed * -1; 
        
        if (parallaxElement) {
            parallaxElement.style.transform = `translateY(${yOffset}px)`;
        }
    }


    window.addEventListener('scroll', applyParallax);


    applyParallax();

    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookie');
    const rejectBtn = document.getElementById('reject-cookie');

    function hideConsent() {
        if (cookieConsent) {
            cookieConsent.classList.remove('show');

            setTimeout(() => {
                cookieConsent.remove();
            }, 500);
        }
    }

    function showConsentWithDelay() {

        if (cookieConsent) { 
            setTimeout(() => {

                cookieConsent.classList.add('show');
            }, 5000); 
        }
    }


    acceptBtn.addEventListener('click', () => {
        console.log("Согласие на cookie дано.");
        hideConsent();
    });

    rejectBtn.addEventListener('click', () => {
        console.log("Согласие на cookie отклонено.");
        hideConsent();
    });


    showConsentWithDelay();

    function typeWriter() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    textElement.addEventListener('DOMSubtreeModified', function () {
        if (textElement.textContent.length === textToType.length) {
            textElement.style.borderRight = 'none';
        }
    }, { once: true }); 

    typeWriter();
});