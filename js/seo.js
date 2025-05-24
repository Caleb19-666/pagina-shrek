/**
 * seo.js
 * Funcionalidades adicionales para mejorar SEO y posicionamiento
 */

document.addEventListener('DOMContentLoaded', function() {
    //mejoras de SEO
    setTimeout(() => {
        addStructuredData();
        enhanceMetaTags();
        addVisitMetrics();
        optimizeForSearch();
    }, 1000);

    function addStructuredData() {        const nombreAmigo = document.getElementById('nombre-amigo')?.textContent || 'Brad Caleb Lopez';
        const nombreCompleto = document.getElementById('nombre-completo')?.textContent || 'Brad Caleb López Parizaca';
        const carrera = document.getElementById('carrera')?.textContent || 'Administración de Negocios';
        const emailContacto = document.getElementById('email-contacto')?.textContent || 'brad.lopez@ucsp.edu.pe';

        const personSchema = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': nombreCompleto,
            'description': `Estudiante de ${carrera} en la Universidad Católica San Pablo, Arequipa, Perú`,
            'email': emailContacto,
            'affiliation': {
                '@type': 'EducationalOrganization',
                'name': 'Universidad Católica San Pablo',
                'url': 'https://ucsp.edu.pe/'
            },
            'url': window.location.href,
            'sameAs': [
                document.getElementById('linkedin-url')?.getAttribute('href'),
                document.getElementById('github-url')?.getAttribute('href')
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(personSchema);
        document.head.appendChild(script);
        
        console.log('Datos estructurados añadidos para SEO');
    }

    function enhanceMetaTags() {        const nombreAmigo = document.getElementById('nombre-amigo')?.textContent || 'Brad Caleb Lopez';

        document.title = document.title.replace('[NOMBRE DE TU AMIGO]', nombreAmigo);
        
        if (!document.querySelector('meta[name="description"]')) {
            const metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = `Sitio web personal de ${nombreAmigo}, estudiante de la Universidad Católica San Pablo (UCSP) en Arequipa, Perú.`;
            document.head.appendChild(metaDescription);
        }
        
        addMetaTag('og:title', document.title);
        addMetaTag('og:description', `Sitio web personal de ${nombreAmigo}, estudiante de la Universidad Católica San Pablo (UCSP) en Arequipa, Perú.`);
        addMetaTag('og:url', window.location.href);
        addMetaTag('og:image', window.location.origin + '/images/shrek.png');
        addMetaTag('og:type', 'website');

        addMetaTag('twitter:card', 'summary');
        addMetaTag('twitter:title', document.title);
        addMetaTag('twitter:description', `Sitio web personal de ${nombreAmigo}, estudiante de la Universidad Católica San Pablo (UCSP) en Arequipa, Perú.`);
        addMetaTag('twitter:image', window.location.origin + '/images/shrek.png');
    }
    
    function addMetaTag(name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[property="${name}"]`) || document.querySelector(`meta[name="${name}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            if (name.startsWith('og:')) {
                meta.setAttribute('property', name);
            } else {
                meta.setAttribute('name', name);
            }
            document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
    }
    
    function setupInteractionTracking() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                trackInteraction('external_link', link.getAttribute('href'));
            });
        });

        const navLinks = document.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                trackInteraction('navigation', link.getAttribute('href'));
            });
        });

        let startTime = new Date();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((new Date() - startTime) / 1000);
            trackInteraction('time_on_page', timeSpent);
        });
        
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercentage > maxScroll) {
                maxScroll = scrollPercentage;
                if (maxScroll % 25 === 0) { 
                    trackInteraction('scroll_depth', maxScroll);
                }
            }
        });
    }
    
    function trackInteraction(type, value) {
        let interactions = localStorage.getItem('shrek-interactions-detail') || '{}';
        
        try {
            interactions = JSON.parse(interactions);
        } catch (e) {
            interactions = {};
        }

        if (!interactions[type]) {
            interactions[type] = [];
        }
        
        interactions[type].push({
            value: value,
            timestamp: new Date().toISOString()
        });
        
        if (interactions[type].length > 100) {
            interactions[type] = interactions[type].slice(-100);
        }

        localStorage.setItem('shrek-interactions-detail', JSON.stringify(interactions));
        
        console.log('Interacción registrada:', type, value);
    }    async function addVisitMetrics() {
        try {
            const response = await fetch('https://hits.sh/caleb19-666.github.io/pagina-shrek.json');
            const data = await response.json();
            const visitCount = data.count || 0;

            addMetaTag('site:visits', visitCount.toString());
            addMetaTag('site:popularity', visitCount > 100 ? 'high' : visitCount > 50 ? 'medium' : 'growing');
            
            console.log(`SEO: Sitio con ${visitCount} visitas registradas`);
        } catch (error) {
            console.error('Error al obtener métricas para SEO:', error);
        }
    }

    function optimizeForSearch() {
        const keywords = [
            'Brad Caleb López Parizaca',
            'UCSP',
            'Universidad Católica San Pablo',
            'Arequipa',
            'Perú',
            'Administración de Negocios',
            'Estudiante universitario',
            'Emprendimiento',
            'Liderazgo estudiantil'
        ];
        
        addMetaTag('keywords', keywords.join(', '));
        addMetaTag('author', 'Brad Caleb López Parizaca');
        addMetaTag('robots', 'index, follow');
        addMetaTag('googlebot', 'index, follow');

        const currentDescription = document.querySelector('meta[name="description"]')?.content || '';
        if (currentDescription && !currentDescription.includes('visitado')) {
            const enhancedDescription = currentDescription + ' Sitio visitado por estudiantes y profesionales interesados en administración de negocios.';
            document.querySelector('meta[name="description"]').content = enhancedDescription;
        }
    }
});
