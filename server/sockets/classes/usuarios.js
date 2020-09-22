//




//
class Usuarios {

    constructor() {
        this.personas = [];
    }

    addPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        };
        this.personas.push(persona);
        return this.personas;
    }


    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonaPorSala(sala) {
        let personasPorSala = this.personas.filter(persona => persona.sala === sala);

        return personasPorSala;
    }

    borrarPersona(id) {

        let persona = this.getPersona(id);

        this.personas = this.personas.filter(persona => persona.id != id);

        return persona;
    }

}

module.exports = {
    Usuarios
}