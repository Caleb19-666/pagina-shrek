/**
 * cv.js
 * Funcionalidad JavaScript para la página de CV
 */

document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-level');
    const skillSection = document.querySelector('.skills-container');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100 &&
            rect.bottom >= 0
        );
    }

    function animateSkillBars() {
        if (skillSection && isInViewport(skillSection)) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
            window.removeEventListener('scroll', animateSkillBars);
        }
    }

    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    window.simulateDownload = function() {
        alert('¡El CV se descargaría en formato PDF aquí! En una implementación real, este botón enlazaría a un archivo PDF generado.');

        const downloadBtn = document.getElementById('cv-download-btn');
        downloadBtn.classList.add('animating');
        setTimeout(() => {
            downloadBtn.classList.remove('animating');
        }, 1000);
        
        trackInteraction('download_cv');
    };
    
    function trackInteraction(type) {
        let interactions = localStorage.getItem('shrek-page-interactions') || '{}';
        
        try {
            interactions = JSON.parse(interactions);
        } catch (e) {
            interactions = {};
        }

        if (!interactions[type]) {
            interactions[type] = 0;
        }

        interactions[type]++;

        localStorage.setItem('shrek-page-interactions', JSON.stringify(interactions));
        
        console.log('Interacción CV registrada:', type, interactions[type]);

        if (typeof initVisitCounter === 'function') {
            initVisitCounter();
        }
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-dot').style.transform = 'scale(1.5)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-dot').style.transform = 'scale(1)';
        });
    });

    const profilePhoto = document.querySelector('.profile-placeholder');
    if (profilePhoto) {
        profilePhoto.addEventListener('click', function() {
            console.log('¡ROAAAR! - Sonido de Shrek');
            alert('¡ROAAAR! - Este es mi pantano');

            trackInteraction('shrek_roar');
        });
    }
});
