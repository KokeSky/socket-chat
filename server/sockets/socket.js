const { io } = require('../server');

const { crearMensaje } = require('../utilidades/utilidades');

const {
    Usuarios
} = require('./classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {
        console.log(data);
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es requerido'
            })
        }

        client.join(data.sala);

        let personas = usuarios.addPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonaPorSala(data.sala));

        callback(usuarios.getPersonaPorSala(data.sala));
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',
            crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`)
        );

        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', {
            personas: usuarios.getPersonaPorSala(personaBorrada.sala)
        });

    });

    //Mensajes privadod
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    })


});