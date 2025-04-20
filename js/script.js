document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const sections = document.querySelectorAll('section');
  const contactForm = document.querySelector('.contact-form');
  const newsletterForm = document.querySelector('.newsletter-form');

  // Función para el menú móvil
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });
  }

  // Cerrar el menú cuando se hace clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Navegación suave al hacer clic en los enlaces del menú
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Solo para enlaces internos
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Calcular la posición de desplazamiento con un pequeño offset
          const offset = 80; // Ajustar según la altura de la barra de navegación
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Resaltar el enlace activo durante el desplazamiento
  function highlightActiveLink() {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Comprobar si estamos en la parte superior de la página
    if (window.scrollY < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
    }
  }
  
  // Verificar la posición del scroll al cargar la página
  highlightActiveLink();
  
  // Añadir evento de scroll para actualizar los enlaces activos
  window.addEventListener('scroll', highlightActiveLink);

  // Funcionalidad para las FAQ
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Cerrar todas las demás FAQ
      faqQuestions.forEach(item => {
        if (item !== question) {
          item.setAttribute('aria-expanded', 'false');
          item.parentElement.classList.remove('active');
        }
      });
      
      // Toggle actual FAQ
      question.setAttribute('aria-expanded', !isExpanded);
      faqItem.classList.toggle('active');
    });
  });

  // Validación del formulario de contacto
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validar campos
      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');
      const empresa = document.getElementById('empresa');
      let isValid = true;
      
      if (!nombre.value.trim()) {
        showError(nombre, 'Por favor ingrese su nombre');
        isValid = false;
      } else {
        removeError(nombre);
      }
      
      if (!email.value.trim()) {
        showError(email, 'Por favor ingrese su correo electrónico');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Por favor ingrese un correo electrónico válido');
        isValid = false;
      } else {
        removeError(email);
      }
      
      if (!mensaje.value.trim()) {
        showError(mensaje, 'Por favor ingrese su mensaje');
        isValid = false;
      } else {
        removeError(mensaje);
      }
      
      // Si el formulario es válido, enviar datos
      if (isValid) {
        // Simulación de envío exitoso
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="button-text">Enviando...</span>';
        
        // Simular una petición con un retraso
        setTimeout(() => {
          // Mostrar mensaje de éxito
          const formCard = document.querySelector('.form-card');
          formCard.innerHTML = `
            <div class="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3>¡Mensaje enviado correctamente!</h3>
              <p>Gracias por contactarnos. Nuestro equipo te responderá lo antes posible.</p>
            </div>
          `;
        }, 1500);
      }
    });
  }

  // Validación del formulario de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitButton = newsletterForm.querySelector('button');
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = '#dc3545';
        return;
      }
      
      // Simular suscripción exitosa
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      
      setTimeout(() => {
        submitButton.textContent = '¡Suscrito!';
        submitButton.style.backgroundColor = '#28a745';
        emailInput.value = '';
        
        // Restablecer el botón después de un tiempo
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }

  // Funciones de utilidad para la validación de formularios
  function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    formGroup.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
  }
  
  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    
    formGroup.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Animación de aparecer elementos al hacer scroll
  const animatedElements = document.querySelectorAll('.feature-item, .benefit-card, .section-title, .form-card, .contact-info');
  
  const animateOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('animate');
      }
    });
  };
  
  // Ejecutar la función al cargar la página
  animateOnScroll();
  
  // Y cada vez que se hace scroll
  window.addEventListener('scroll', animateOnScroll);

  // Contador de estadísticas para la sección de beneficios (opcional)
  const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // duración en ms
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        counter.textContent = Math.round(current);
        
        if (current < target) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };
  
  // Iniciar contadores cuando la sección de beneficios está en el viewport
  const benefitsSection = document.getElementById('benefits');
  
  if (benefitsSection) {
    const checkScrollPosition = () => {
      const sectionPosition = benefitsSection.getBoundingClientRect();
      
      if (sectionPosition.top < window.innerHeight && sectionPosition.bottom > 0) {
        startCounters();
        window.removeEventListener('scroll', checkScrollPosition);
      }
    };
    
    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Verificar al cargar la página
  }
});