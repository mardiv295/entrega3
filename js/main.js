//objeto Usuario
function Usuario(nombre, apellido, cantidadPrestamo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.cantidadPrestamo = cantidadPrestamo;
}

//array para almacenar los objetos Usuario
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Función nuevo usuario
function agregarUsuario(nombre, apellido, cantidadPrestamo) {
    let nuevoUsuario = new Usuario(nombre, apellido, cantidadPrestamo);
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarUsuarios();
}

// Método de búsqueda: encontrar un usuario por nombre
function buscarPorNombre(nombre) {
    return usuarios.find(usuario => usuario.nombre === nombre);
}

// Método de filtrado: obtener usuarios con préstamos mayores a una cantidad
function filtrarPorPrestamo(minCantidad) {
    return usuarios.filter(usuario => usuario.cantidadPrestamo > minCantidad);
}

// Función os transformar datos de usuarios
function transformarUsuarios() {
    return usuarios.map(usuario => ({
        nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
        cantidadPrestamo: usuario.cantidadPrestamo
    }));
}

// Función para mostrar usuarios en el DOM
function mostrarUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nombre} ${usuario.apellido} - Préstamo: $${usuario.cantidadPrestamo}`;
        listaUsuarios.appendChild(li);
    });
}

// Función para calcular el interés total del préstamo
const tasaInteresAnual = 0.35; // 35% anual
const plazoPago = 5; // 5 años
function calcularInteresTotal(cantidad, tasaInteres, plazo) {
    return cantidad * tasaInteres * plazo;
}

// Capturar entrada del usuario y agregar al array
document.getElementById('usuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let cantidadPrestamo = parseFloat(document.getElementById('cantidadPrestamo').value);
    agregarUsuario(nombre, apellido, cantidadPrestamo);

    // Calcular el interés total y mostrarlo
    let interesTotal = calcularInteresTotal(cantidadPrestamo, tasaInteresAnual, plazoPago);
    alert(`Hola ${nombre} ${apellido}, el interés total de tu préstamo es: $${interesTotal.toFixed(2)}`);
    console.log(`Usuario: ${nombre} ${apellido}, Préstamo: $${cantidadPrestamo}, Interés Total: $${interesTotal.toFixed(2)}`);
});

// Mostrar usuarios al cargar la página
mostrarUsuarios();