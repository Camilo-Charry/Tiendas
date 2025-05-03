document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission
    const form = document.getElementById('formulario-cita');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Aquí normalmente enviarías los datos a un servidor
        // Por ahora, solo mostraremos un mensaje de confirmación
        alert(`Cita agendada para ${data.nombre} el ${data.fecha} a las ${data.hora} para ${data.servicio}`);
        form.reset();
    });

    // Animación de entrada para los servicios y toggle de descripciones
    const servicios = document.querySelectorAll('.servicio');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    servicios.forEach(servicio => {
        servicio.style.opacity = 0;
        servicio.style.transform = 'translateY(20px)';
        servicio.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(servicio);

        // Toggle service descriptions
        servicio.addEventListener('click', () => {
            const descripcion = servicio.querySelector('.servicio-descripcion');
            if (descripcion.style.display === 'block') {
                descripcion.style.display = 'none';
            } else {
                // Hide all other descriptions
                document.querySelectorAll('.servicio-descripcion').forEach(desc => {
                    desc.style.display = 'none';
                });
                descripcion.style.display = 'block';
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
});