/**
 * contact.js
 * Funcionalidad JavaScript para la página de contacto
 */

document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            console.log('Datos del formulario:', formDataObj);

            setTimeout(() => {
                showFormSuccess();

                incrementInteractionCount('form_submit');
            }, 1000);
        });
    }
    
    function showFormSuccess() {
        contactForm.style.display = 'none';
        formSuccess.classList.remove('hidden');
        setTimeout(() => {
            formSuccess.classList.add('show');
        }, 10);
    }

    window.resetForm = function() {
        formSuccess.classList.remove('show');
        setTimeout(() => {
            formSuccess.classList.add('hidden');
            contactForm.reset();
            contactForm.style.display = 'flex';
        }, 300);
    };
    
    function incrementInteractionCount(type) {
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
        
        console.log('Interacción registrada:', type, interactions[type]);
    }
});
