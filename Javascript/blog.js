 // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navbar = document.getElementById('navbar');
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            if (navbar.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            }
        });
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            });
        });
        // Blog Carousel functionality
        function initBlogCarousel() {
            const carouselInner = document.getElementById('blog-carousel-inner');
            const indicators = document.querySelectorAll('.blog-indicator');
            const prevBtn = document.getElementById('blog-prev-btn');
            const nextBtn = document.getElementById('blog-next-btn');
            let currentSlide = 0;
            const totalSlides = document.querySelectorAll('.blog-carousel-item').length;
            function updateCarousel() {
                carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
                // Update indicators
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }
            // Next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }
            // Previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }
            // Event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    currentSlide = index;
                    updateCarousel();
                });
            });
            // Auto slide every 6 seconds
            setInterval(nextSlide, 6000);
        }
        // Video player functionality with thumbnail - CORREGIDA
        function playVideo(button) {
            const videoPlayer = button.closest('.video-player');
            const video = videoPlayer.querySelector('video');
            const thumbnail = videoPlayer.querySelector('.video-thumbnail');
            const playButton = videoPlayer.querySelector('.play-button');
            
            if (video.paused) {
                video.style.display = 'block';
                thumbnail.style.display = 'none';
                playButton.style.display = 'none';
                video.play();
                
                // Pausar el video cuando termine
                video.onended = function() {
                    thumbnail.style.display = 'block';
                    playButton.style.display = 'flex';
                    video.style.display = 'none';
                };
            } else {
                video.pause();
                video.style.display = 'none';
                thumbnail.style.display = 'block';
                playButton.style.display = 'block';
            }
        }
        // Modal functionality for "Leer más"
        function openModal(title, date, author, image, text) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-date').textContent = date;
            document.getElementById('modal-author').textContent = author;
            document.getElementById('modal-image').src = image;
            document.getElementById('modal-text').textContent = text;
            document.getElementById('modal-overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        document.getElementById('modal-close').addEventListener('click', () => {
            document.getElementById('modal-overlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modal-overlay')) {
                document.getElementById('modal-overlay').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        // Video modal functionality - CORREGIDA
        function openVideoModal(videoSrc, title = 'Video Educativo') {
            const videoPlayer = document.getElementById('video-modal-player');
            const videoTitle = document.getElementById('video-modal-title');
            const videoModal = document.getElementById('video-modal-overlay');
            
            // Limpiar fuente anterior
            videoPlayer.src = '';
            
            // Establecer nueva fuente
            videoPlayer.src = videoSrc;
            videoTitle.textContent = title;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Cargar y reproducir video
            videoPlayer.load();
            
            // Intentar reproducir (puede fallar por políticas de autoplay)
            videoPlayer.play().catch(error => {
                console.log('Autoplay bloqueado:', error);
                // El usuario tendrá que hacer clic en play manualmente
            });
        }
        // Función para cerrar modal de video
        function closeVideoModal() {
            const videoPlayer = document.getElementById('video-modal-player');
            const videoModal = document.getElementById('video-modal-overlay');
            
            // Pausar video
            videoPlayer.pause();
            
            // Limpiar fuente para liberar recursos
            videoPlayer.src = '';
            
            // Cerrar modal
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        // Event listeners para cerrar modal de video
        document.getElementById('video-modal-close').addEventListener('click', closeVideoModal);
        document.getElementById('video-modal-overlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('video-modal-overlay')) {
                closeVideoModal();
            }
        });
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('video-modal-overlay').classList.contains('active')) {
                closeVideoModal();
            }
        });
        // Initialize carousel and chatbot when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initBlogCarousel();
            initChatbot();
        });
        // Theme switching
        function setTheme(theme) {
            document.body.className = '';
            if (theme !== 'light') {
                document.body.classList.add(`theme-${theme}`);
            }
            // Update active button
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = theme === 'light' 
                ? document.querySelector('.theme-btn-light') 
                : document.querySelector(`.theme-btn-${theme}`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
        // Load saved theme
        const savedTheme = 'light';
        setTheme(savedTheme);
        // Chatbot functionality
        function initChatbot() {
            const chatbotToggle = document.getElementById('chatbot-toggle');
            const chatbotWindow = document.getElementById('chatbot-window');
            const chatbotClose = document.getElementById('chatbot-close');
            const chatbotInput = document.getElementById('chatbot-input');
            const chatbotSend = document.getElementById('chatbot-send');
            const chatbotMessages = document.getElementById('chatbot-messages');
            // Toggle chatbot window
            chatbotToggle.addEventListener('click', () => {
                chatbotWindow.classList.toggle('active');
            });
            // Close chatbot window
            chatbotClose.addEventListener('click', () => {
                chatbotWindow.classList.remove('active');
            });
            // Send message
            function sendMessage() {
                const message = chatbotInput.value.trim();
                if (message === '') return;
                // Add user message
                addMessage(message, 'user');
                chatbotInput.value = '';
                // Simulate bot response
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'bot');
                }, 1000);
            }
            // Add message to chat
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
                messageDiv.textContent = text;
                chatbotMessages.appendChild(messageDiv);
                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
            // Get bot response based on user message
            function getBotResponse(message) {
                const lowerMessage = message.toLowerCase();
                if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes')) {
                    return '¡Hola! 👋 ¿Cómo puedo ayudarte hoy? Puedo informarte sobre nuestros proyectos, cómo donar, o responder cualquier pregunta que tengas.';
                } 
                else if (lowerMessage.includes('donar') || lowerMessage.includes('donación') || lowerMessage.includes('aportar')) {
                    return '¡Gracias por tu interés en donar! 💚 Puedes hacer donaciones financieras, en especie, o participar como voluntario. Visita la sección "Cómo Donar" en nuestro sitio web para más información.';
                } 
                else if (lowerMessage.includes('proyecto') || lowerMessage.includes('objetivos') || lowerMessage.includes('actividades')) {
                    return 'Nuestro proyecto se enfoca en la conservación y educación ambiental. Tenemos 4 objetivos principales: Educación Ambiental, Conservación de Ecosistemas, Prácticas Sostenibles e Investigación y Monitoreo. ¡Visita nuestras secciones para conocer más!';
                } 
                else if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('email')) {
                    return 'Puedes contactarnos por email a contacto@ep-lirio.com, por teléfono al +52 55 1234 5678, o a través de nuestro formulario de contacto. ¡También estamos en WhatsApp!';
                } 
                else if (lowerMessage.includes('gracias') || lowerMessage.includes('thank you')) {
                    return '¡De nada! 😊 Es un placer ayudarte. Si tienes más preguntas, no dudes en preguntar.';
                } 
                else if (lowerMessage.includes('adiós') || lowerMessage.includes('hasta luego') || lowerMessage.includes('chao')) {
                    return '¡Hasta pronto! 🌱 Recuerda que estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un excelente día!';
                } 
                else {
                    return 'Gracias por tu mensaje. 😊 Puedo ayudarte con información sobre nuestros proyectos, cómo donar, o responder preguntas específicas. ¿Podrías ser más específico con tu consulta?';
                }
            }
            // Event listeners
            chatbotSend.addEventListener('click', sendMessage);
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }