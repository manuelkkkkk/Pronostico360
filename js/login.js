// Selección del formulario de inicio de sesión y escucha del evento de envío
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores de correo electrónico y contraseña del formulario
    const email = document.querySelector('#correo').value;
    const password = document.querySelector('#clave').value;

    // Obtener usuarios almacenados en el localStorage o inicializar como un array vacío
    const Users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar un usuario válido que coincida con el correo electrónico y la contraseña proporcionados
    const validUser = Users.find(user => user.email === email && user.password === password);

    // Si no se encuentra un usuario válido, mostrar una alerta de credenciales incorrectas
    if (!validUser) {
        return alert('Usuario y/o contraseña incorrectos!');
    }

    // Si se encuentra un usuario válido, mostrar un mensaje de bienvenida con el nombre del usuario
    alert(`Bienvenido ${validUser.name}`);

    // Almacenar la información del usuario en localStorage como "login_success"
    localStorage.setItem('login_success', JSON.stringify(validUser));

    // Redirigir a la página de inicio
    window.location.href = 'inicio.html';
});

// Selección del formulario de registro y escucha del evento de envío
const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores de nombre, correo electrónico y contraseña del formulario
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Obtener usuarios almacenados en el localStorage o inicializar como un array vacío
    const Users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario ya está registrado por su correo electrónico
    const isUserRegistered = Users.find(user => user.email === email);

    // Si el usuario ya está registrado, mostrar una alerta de usuario existente
    if (isUserRegistered) {
        return alert('El usuario ya está registrado!');
    }

    // Agregar un nuevo usuario al array de usuarios
    Users.push({ name: name, email: email, password: password });

    // Almacenar la lista actualizada de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(Users));

    // Mostrar una alerta de registro exitoso
    alert('Registro Exitoso!');
});

// Selección de elementos DOM para la funcionalidad de cambio entre formularios
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnLinkPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// Escuchar el evento de clic en el enlace de registro para mostrar el formulario de registro
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active'); // Agregar la clase 'active' al contenedor principal
});

// Escuchar el evento de clic en el enlace de inicio de sesión para ocultar el formulario de registro
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active'); // Eliminar la clase 'active' del contenedor principal
});

// Escuchar el evento de clic en el botón de inicio de sesión para mostrar el formulario de inicio de sesión
btnLinkPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup'); // Agregar la clase 'active-popup' al contenedor principal
});

// Escuchar el evento de clic en el icono de cierre para ocultar el formulario de inicio de sesión
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup'); // Eliminar la clase 'active-popup' del contenedor principal
});
