/**
 * sounds.js
 * Efectos de sonido aun no funcionando :c
 */

document.addEventListener('DOMContentLoaded', function() {
    const ShrekSounds = {  
        sounds: {
            roar: {
                text: "¡ROAAAR!",
                description: "Rugido de Shrek",
                file: "shrek-roar.mp3"
            },
            swamp: {
                text: "¡Este es mi pantano!",
                description: "Frase clásica de Shrek",
                file: "shrek-swamp.mp3"
            },
            layers: {
                text: "Las cebollas tienen capas. Los ogros tienen capas.",
                description: "Sobre las capas de los ogros",
                file: "shrek-layers.mp3"
            },
            donkey: {
                text: "¿Y en la mañana? ¡Haré waffles!",
                description: "Frase del Burro",
                file: "donkey-waffles.mp3"
            },
            farquaad: {
                text: "Algunos de ustedes pueden morir, pero es un sacrificio que estoy dispuesto a hacer.",
                description: "Lord Farquaad",
                file: "farquaad-sacrifice.mp3"
            }
        },

        interactiveElements: {
            logo: '.shrek-logo',
            hero: '.hero-section',
            navigation: '.navigation a',
            headers: '.section-title'
        },

        init: function() {
            this.setupSoundEffects();
            this.createSoundButton();
            console.log('🧅 Efectos de sonido Shrek inicializados');
        },

        setupSoundEffects: function() {
            const logoElement = document.querySelector(this.interactiveElements.logo);
            if (logoElement) {
                logoElement.addEventListener('click', () => {
                    this.playRandomSound('roar', 'swamp');
                });
                logoElement.style.cursor = 'pointer';
            }

            const headers = document.querySelectorAll(this.interactiveElements.headers);
            headers.forEach(header => {
                header.addEventListener('click', () => {
                    this.playRandomSound();
                });
                header.style.cursor = 'pointer';
            });

            const navLinks = document.querySelectorAll(this.interactiveElements.navigation);
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    const randomSound = this.getRandomSound();
                    this.showTooltip(link, randomSound.text);
                });
                
                link.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() === 's') {
                    this.playRandomSound();
                }
            });
        },

        createSoundButton: function() {
            const soundButton = document.createElement('div');
            soundButton.className = 'floating-sound-button';
            soundButton.innerHTML = '🔊';
            soundButton.title = 'Hacer sonido de Shrek';
            
            soundButton.addEventListener('click', () => {
                this.playRandomSound();
                this.animateSoundButton(soundButton);
            });
            
            document.body.appendChild(soundButton);

            const style = document.createElement('style');
            style.textContent = `
                .floating-sound-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--shrek-green);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    z-index: 1000;
                    transition: all 0.3s ease;
                }
                
                .floating-sound-button:hover {
                    transform: scale(1.1);
                    background-color: var(--shrek-dark-green);
                }
                
                .floating-sound-button.animate {
                    animation: pulsate 0.5s ease;
                }
                
                @keyframes pulsate {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                
                .shrek-tooltip {
                    position: absolute;
                    background-color: var(--swamp-brown);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    max-width: 250px;
                    z-index: 1001;
                    opacity: 0;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: none;
                    transform: translateY(8px);
                    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    font-weight: 500;
                    border: 2px solid var(--shrek-green);
                }
                  /* Flecha para tooltip normal (apuntando hacia abajo) */
                .shrek-tooltip::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -8px;
                    border-width: 8px;
                    border-style: solid;
                    border-color: var(--swamp-brown) transparent transparent transparent;
                }
                
                /* Flecha para tooltip cuando está debajo del elemento (apuntando hacia arriba) */
                .shrek-tooltip.arrow-top::after {
                    top: auto;
                    bottom: 100%;
                    border-color: transparent transparent var(--swamp-brown) transparent;
                }
            `;
            document.head.appendChild(style);
        },
        playRandomSound: function(...specificSounds) {
            const sound = specificSounds.length > 0 
                ? this.getRandomFromArray(specificSounds.map(key => this.sounds[key])) 
                : this.getRandomSound();

            this.showSoundPopup(sound.text);

            if (sound.file) {
                try {

                    const audioPath = `./audio/${sound.file}`;
                    const audio = new Audio(audioPath);

                    if (!localStorage.getItem('shrek-sound-notice-shown')) {
                        console.info('⚠️ Necesitas descargar los archivos de audio para escuchar los sonidos de Shrek. ' +
                                     'Consulta el README.md para más información sobre cómo añadirlos.');
                        localStorage.setItem('shrek-sound-notice-shown', 'true');
                    }

                    audio.play().catch(error => {
                        console.warn(`No se pudo reproducir el audio: ${error.message}`);
                    });
                } catch (e) {
                    console.warn(`Error al cargar el audio: ${e.message}`);
                }
            }
            
            console.log(`🔊 Sonido de Shrek: ${sound.text} (${sound.description})`);
            
            this.trackSoundInteraction(sound.description);
        },

        getRandomSound: function() {
            const soundKeys = Object.keys(this.sounds);
            const randomKey = soundKeys[Math.floor(Math.random() * soundKeys.length)];
            return this.sounds[randomKey];
        },

        getRandomFromArray: function(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        
        showSoundPopup: function(text) {
            if (!document.querySelector('.shrek-sound-popup')) {
                const popup = document.createElement('div');
                popup.className = 'shrek-sound-popup';
                document.body.appendChild(popup);

                const style = document.createElement('style');
                style.textContent = `
                    .shrek-sound-popup {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(0);
                        background-color: var(--swamp-brown);
                        color: white;
                        padding: 20px 30px;
                        border-radius: 15px;
                        font-size: 1.2rem;
                        font-weight: bold;
                        text-align: center;
                        z-index: 1002;
                        opacity: 0;
                        transition: transform 0.3s ease, opacity 0.3s ease;
                        pointer-events: none;
                        max-width: 80%;
                    }
                    
                    .shrek-sound-popup.show {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    
                    .shrek-sound-popup::before {
                        content: '🔊';
                        display: block;
                        font-size: 2rem;
                        margin-bottom: 10px;
                    }
                `;
                document.head.appendChild(style);
            }

            const popup = document.querySelector('.shrek-sound-popup');
            popup.textContent = text;
            popup.classList.add('show');
            
            setTimeout(() => {
                popup.classList.remove('show');
            }, 2000);
        },

        animateSoundButton: function(button) {
            button.classList.add('animate');
            setTimeout(() => {
                button.classList.remove('animate');
            }, 500);
        },
        showTooltip: function(element, text) {
            if (!document.querySelector('.shrek-tooltip')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'shrek-tooltip';
                document.body.appendChild(tooltip);
            }
            
            const tooltip = document.querySelector('.shrek-tooltip');
            tooltip.textContent = text;

            tooltip.style.opacity = '0';
            tooltip.style.display = 'block';
            
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const tooltipWidth = tooltip.offsetWidth;
                const tooltipHeight = tooltip.offsetHeight;
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                const scrollX = window.scrollX || document.documentElement.scrollLeft;
                const spaceAbove = rect.top;
                const shouldPlaceBelow = spaceAbove < tooltipHeight + 15;

                let tooltipTop = rect.top + scrollY - tooltipHeight - 10;
                let tooltipLeft = rect.left + scrollX + (rect.width / 2) - (tooltipWidth / 2);

                if (shouldPlaceBelow) {
                    tooltipTop = rect.bottom + scrollY + 10;
                    tooltip.classList.add('arrow-top');
                } else {
                    tooltip.classList.remove('arrow-top');
                }
                
                tooltip.style.left = tooltipLeft + 'px';
                tooltip.style.top = tooltipTop + 'px';

                const viewportWidth = window.innerWidth;
                if (tooltipLeft < 10 + scrollX) {
                    tooltip.style.left = (10 + scrollX) + 'px';
                } else if (tooltipLeft + tooltipWidth > viewportWidth - 10 + scrollX) {
                    tooltip.style.left = (viewportWidth - tooltipWidth - 10 + scrollX) + 'px';
                }
                requestAnimationFrame(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(0)';
                });
            }, 10);
        },
        hideTooltip: function() {
            const tooltip = document.querySelector('.shrek-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(8px)';

                setTimeout(() => {
                    if (tooltip.style.opacity === '0') {
                        tooltip.style.display = 'none';
                    }
                }, 300);
            }
        },
        
        trackSoundInteraction: function(soundDesc) {
            let interactions = localStorage.getItem('shrek-page-interactions') || '{}';
            
            try {
                interactions = JSON.parse(interactions);
            } catch (e) {
                interactions = {};
            }
            
            if (!interactions.sounds) {
                interactions.sounds = {};
            }

            if (!interactions.sounds[soundDesc]) {
                interactions.sounds[soundDesc] = 0;
            }
            interactions.sounds[soundDesc]++;

            if (!interactions.total_sounds) {
                interactions.total_sounds = 0;
            }
            interactions.total_sounds++;

            localStorage.setItem('shrek-page-interactions', JSON.stringify(interactions));
            
            console.log('Interacción de sonido registrada:', soundDesc, interactions.sounds[soundDesc]);
        }
    };

    ShrekSounds.init();
});
