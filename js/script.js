document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const sections = document.querySelectorAll('section');
  const contactForm = document.querySelector('.contact-form');

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
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Simular una petición con un retraso
        setTimeout(() => {
          // Mostrar mensaje de éxito
          contactForm.innerHTML = `
            <div class="success-message">
              <h3>¡Mensaje enviado correctamente!</h3>
              <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
            </div>
          `;
        }, 1500);
      }
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
  }
  
  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    
    formGroup.classList.remove('error');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Animación de aparecer elementos al hacer scroll
  const animatedElements = document.querySelectorAll('.feature-item, .benefit-card, .section-title');
  
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
});