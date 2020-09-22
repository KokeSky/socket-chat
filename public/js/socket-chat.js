var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('el nombre y sala son requeridos')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    console.log(usuario);
    socket.emit('entrarChat',
        usuario,
        function(resp) {
            console.log('Usuarios conectados', resp);
        });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });


// Escuchar informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});


// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(usuarios) {

    console.log('Servidor:', usuarios);

});

//mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});








//