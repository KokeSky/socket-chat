///

var params = new URLSearchParams(window.location.search);

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

// Referencia de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

/// Funciones para renderizar usuarios
function renderizarUsuarios(personas) { //[{..},{..},{..}]
    //console.log(personas);

    var html = '';
    html += '<li>';
    html += '   <a href="javascript:voi" class="active">Chat de <span>' + usuario.sala + ' </span></a>';
    html += '</li>';

    let j = 0;
    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        j++;
        html += '<li>';
        html += '   <a data-id="' + persona.id + '" href="javascript:void(0)"><img src="assets/images/users/' + j + '.jpg" alt="user-img" class="img-circle"> <span>' + persona.nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
        if (j === 8) {
            j = 0;
        }
    }
    html += '<li class="p-20"></li>';

    divUsuarios.html(html);

    // html += '<li>';
    // html += '<a href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>Varun Dhavan <small class="text-success">online</small></span></a>';
    // html += '</li>';


}

function renderizarMensajes(mensaje, yo) {
    var html = '';

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<!--chat Row -->';
        html += '<li class="reverse">';
        html += '   <div class="chat-content">';
        html += '       <h5>' + mensaje.nombre + '</h5>';
        html += '       <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '   </div>';
        html += '   <div class="chat-img"> <img src="assets/images/users/5.jpg"alt = "user" /> </div>';
        html += '   <div class="chat-time">' + hora + '</div>';
        html += '</li> ';
        html += '<!--chat Row -->';

    } else {

        html += '<!--chat Row -->';
        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '   <div class="chat-content">';
        html += '       <h5>' + mensaje.nombre + '</h5>';
        html += '       <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '   </div>';
        html += '   <div class="chat-time">' + hora + '</div>';
        html += '<li/>';
        html += '<!--chat Row -->';
    }


    divChatbox.append(html);


}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


//listeners
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});


formEnviar.on('submit', function(e) {
    //console.log('submit');
    //console.log(txtMensaje.val());

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: usuario.nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});







//