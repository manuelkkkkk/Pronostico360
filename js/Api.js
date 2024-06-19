

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

/*api*/

// Selecciona elementos del DOM
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Agrega un evento click al botón de búsqueda
search.addEventListener('click', () => {
    // Clave de la API de OpenWeatherMap
    const APIKey = '258330fb51e9c9b258389df135c4bae1';
    // Obtiene el valor del campo de entrada de búsqueda (ciudad)
    const city = document.querySelector('.search-box input').value;

    // Verifica si el campo de búsqueda está vacío
    if (city === '')
        return;

    // Realiza una solicitud fetch a la API de OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${APIKey}`)
        .then(response => response.json()) // Convierte la respuesta a formato JSON
        .then(json => {
            // Comprueba si la respuesta indica un error (404: Ciudad no encontrada)
            if (json.cod === '404') {
                // Configura la visualización para mostrar el mensaje de error 404
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn'); // Agrega una animación de fade-in al elemento
                return;
            }

            // Oculta el mensaje de error 404 si no se produjo un error
            error404.style.display = 'none';
            error404.classList.remove('fadeIn'); // Elimina la animación de fade-in

            // Selecciona elementos para mostrar la información del clima
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Asigna una imagen según el estado del tiempo principal
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/assest/img/clear.png';
                    break;
                case 'Rain':
                    image.src = '/assest/img/rain.png';
                    break;
                case 'Snow':
                    image.src = '/assest/img/snow.png';
                    break;
                case 'Clouds':
                    image.src = '/assest/img/cloud.png';
                    break;
                case 'Haze':
                    image.src = '/assest/img/mist.png';
                    break;
                default:
                    image.src = ''; // Por defecto, no se muestra ninguna imagen
            }

            // Muestra la temperatura, la descripción, la humedad y la velocidad del viento
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Muestra los contenedores de información del clima
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn'); // Agrega animación de fade-in al contenedor del clima
            weatherDetails.classList.add('fadeIn'); // Agrega animación de fade-in al detalle del clima
            container.style.height = '590px'; // Ajusta la altura del contenedor principal
        });
});
