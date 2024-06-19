

// Configura el evento click para el botón de logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    alert('¡Hasta la próxima!'); // Muestra un mensaje de despedida
    localStorage.clear('login_success'); // Borra la información de autenticación del usuario en localStorage
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
});

// Configura el efecto de scroll en la navegación
let sections = document.querySelectorAll('section'); // Obtiene todas las secciones del documento
let navLinks = document.querySelectorAll('header nav a'); // Obtiene todos los enlaces de navegación en el encabezado
window.onscroll = () => { // Agrega un evento de desplazamiento
    sections.forEach(sec => { // Itera sobre cada sección
        let top = window.scrollY; // Obtiene la posición de desplazamiento vertical
        let offset = sec.offsetTop - 150; // Calcula el desplazamiento offset de la sección
        let height = sec.offsetHeight; // Obtiene la altura de la sección
        let id = sec.getAttribute('id'); // Obtiene el atributo 'id' de la sección
        if (top >= offset && top < offset + height) { // Comprueba si el usuario está en la sección visible
            navLinks.forEach(links => { // Itera sobre cada enlace de navegación
                links.classList.remove('active'); // Elimina la clase 'active' de todos los enlaces
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); // Agrega la clase 'active' al enlace correspondiente a la sección actual
            });
        }
    });
};
