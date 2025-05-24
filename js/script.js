/**
 * script.js
 * Funcionalidades JavaScript para la página web estilo Shrek
 */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    setupEasterEgg();
      async function initVisitCounter() {        const contadorElement = document.getElementById('contador');

        contadorElement.textContent = '...';
        
        try {
            console.log('🔄 Conectando al contador global (hits.sh)...');
            //uso de hits.sh 
            const response = await fetch('https://hits.sh/caleb19-666.github.io/pagina-shrek.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📡 Respuesta de hits.sh:', data);
            
            if (data && typeof data.count === 'number') {
                contadorElement.textContent = data.count;
                console.log('✅ Contador global funcionando:', data.count);

                localStorage.setItem('last-global-count', data.count);
            } else {
                throw new Error('Respuesta inválida de hits.sh: ' + JSON.stringify(data));
            }
            
        } catch (error) {
            console.error('❌ Error al obtener contador global:', error);
            console.log('🔄 Intentando con contador alternativo...');
            
            try {
                const fallbackResponse = await fetch('https://count.getloli.com/get/@pagina-shrek-brad-ucsp?theme=rule34');
                if (fallbackResponse.ok) {
                    const svgText = await fallbackResponse.text();
                    const countMatch = svgText.match(/(\d+)/);
                    if (countMatch) {
                        const count = parseInt(countMatch[1]);
                        contadorElement.textContent = count;
                        console.log('✅ Contador alternativo funcionando:', count);
                        localStorage.setItem('last-global-count', count);
                        return;
                    }
                }
            } catch (fallbackError) {
                console.error('❌ Error en contador alternativo:', fallbackError);
            }
            
            const lastGlobalCount = localStorage.getItem('last-global-count');
            
            if (lastGlobalCount) {
                const estimatedCount = parseInt(lastGlobalCount) + 1;
                contadorElement.textContent = estimatedCount + ' (aprox)';
                console.log('📊 Usando estimación basada en último contador:', estimatedCount);
            } else {

                let visits = localStorage.getItem('shrek-page-visits');
                if (!visits) {
                    visits = 1;
                } else {
                    visits = parseInt(visits) + 1;
                }
                localStorage.setItem('shrek-page-visits', visits);
                contadorElement.textContent = visits + ' (local)';
                console.log('🏠 Usando contador local:', visits);
            }
        }

        setTimeout(() => {
            contadorElement.classList.add('animate');
            setTimeout(() => {
                contadorElement.classList.remove('animate');
            }, 500);
        }, 1000);

        registerVisit();
    }    async function registerVisit() {
        const visitData = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent.substring(0, 100) 
        };
        
        console.log('Registrando visita:', visitData);

        trackPageVisit(window.location.pathname);

        try {
            const pageName = window.location.pathname.replace(/\.html$/, '').replace(/^\/+/, '') || 'home';
            const pageCountResponse = await fetch(`https://api.countapi.xyz/hit/pagina-shrek-brad-ucsp/${pageName}`);
            const pageCountData = await pageCountResponse.json();
            console.log(`Página ${pageName} visitada ${pageCountData.value} veces`);
        } catch (error) {
            console.error('Error al registrar visita por página:', error);
        }
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

    async function getVisitStats() {
        try {
            const response = await fetch('https://api.countapi.xyz/get/pagina-shrek-brad-ucsp/visits');
            const data = await response.json();
            return data.value || 0;
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            return 0;
        }
    }

    async function showStats() {
        const totalVisits = await getVisitStats();
        console.log(`📊 Estadísticas del sitio:
        Total de visitas: ${totalVisits}
        Página actual: ${window.location.pathname}
        Referrer: ${document.referrer || 'Directo'}
        Timestamp: ${new Date().toLocaleString()}`);
    }

    setTimeout(showStats, 2000); 
    window.testCounter = async function() {
        console.log('🧪 Probando conexión al contador...');
        try {
            const response = await fetch('https://hits.sh/caleb19-666.github.io/pagina-shrek.json');
            const data = await response.json();
            console.log('✅ Contador actual (sin incrementar):', data.count);
            return data.count;
        } catch (error) {
            console.error('❌ Error en la prueba:', error);
            return null;
        }
    };

    window.incrementCounter = async function() {
        console.log('➕ Incrementando contador...');
        try {
            const response = await fetch('https://hits.sh/caleb19-666.github.io/pagina-shrek.json');
            const data = await response.json();
            console.log('✅ Valor actual:', data.count);
            document.getElementById('contador').textContent = data.count;
            return data.count;
        } catch (error) {
            console.error('❌ Error al verificar contador:', error);
            return null;
        }
    };
});
