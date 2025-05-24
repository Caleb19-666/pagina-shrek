/**
 * script.js
 * Funcionalidades JavaScript para la página web estilo Shrek
 */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    setupEasterEgg();
    
    function initVisitCounter() {
        let visits = localStorage.getItem('shrek-page-visits');

        if (!visits) {
            visits = 1;
        } else {
            visits = parseInt(visits) + 1;
        }

        localStorage.setItem('shrek-page-visits', visits);
        
        const contadorElement = document.getElementById('contador');
        contadorElement.textContent = visits;

        setTimeout(() => {
            contadorElement.classList.add('animate');

            setTimeout(() => {
                contadorElement.classList.remove('animate');
            }, 500);
        }, 1000);

        registerVisit();
    }

    function registerVisit() {

        const visitData = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent
        };
        
        console.log('Registrando visita:', visitData);

        trackPageVisit(window.location.pathname);
        
        // En una implementación real, se enviaría mediante fetch:
        /*
        fetch('https://tu-servidor.com/api/register-visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitData)
        })
        .then(response => response.json())
        .then(data => console.log('Visita registrada:', data))
        .catch(error => console.error('Error al registrar visita:', error));
        */
    }

    function trackPageVisit(page) {
        let pageVisits = localStorage.getItem('shrek-page-specific-visits') || '{}';
        
        try {
            pageVisits = JSON.parse(pageVisits);
        } catch (e) {
            pageVisits = {};
        }

        const pageName = page.replace(/\.html$/, '').replace(/^\/+/, '') || 'home';

        if (!pageVisits[pageName]) {
            pageVisits[pageName] = 0;
        }
        pageVisits[pageName]++;

        localStorage.setItem('shrek-page-specific-visits', JSON.stringify(pageVisits));
        
        console.log('Página visitada:', pageName, pageVisits[pageName]);
    }

    initVisitCounter();

    const sections = document.querySelectorAll('.section');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100 &&
            rect.bottom >= 0
        );
    }

    function handleScrollAnimation() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('fade-in')) {
                section.classList.add('fade-in');
            }
        });
    }
    
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    console.log("%c¡Bienvenido a mi pantano!", "color: #8bc34a; font-size: 20px; font-weight: bold;");
    console.log("%cComo diría Shrek: Las cebollas tienen capas, los ogros tienen capas, ¡esta página web también!", "color: #5d4037; font-size: 14px;");

    function setupEasterEgg() {
        const easterEgg = document.getElementById('footer-easter-egg');
        if (!easterEgg) return;
        
        let clickCount = 0;
        
        easterEgg.addEventListener('click', function() {
            clickCount++;
 
            this.style.transform = `scale(${1 + (clickCount * 0.05)}) rotate(${clickCount * 10}deg)`;

            console.log(`Click #${clickCount} en el Easter Egg de Shrek!`);
            
            if (clickCount === 5) {
                activateShrekMode();
                clickCount = 0;
                setTimeout(() => {
                    this.style.transform = 'scale(0.8)';
                }, 3000);
            }
        });
    }

    function activateShrekMode() {
        console.log("%c¡MODO SHREK ACTIVADO! ¡ESTE ES MI PANTANO AHORA!", "color: green; font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 10px;");
        
        document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="%238bc34a"/><text x="16" y="20" font-size="16" text-anchor="middle" fill="white">🧅</text></svg>'), auto`;
        
        document.body.classList.add('shrek-mode');
        
        setTimeout(() => {
            document.body.style.cursor = '';
            document.body.classList.remove('shrek-mode');
        }, 5000);
    }
});
