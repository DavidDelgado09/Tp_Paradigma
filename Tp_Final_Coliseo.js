class Armas {
    constructor (tipo, nombre){
        this.tipo = tipo;
        this.nombre = nombre;
    }

}
class ArmaDeFilo extends Armas {
    constructor(tipo, nombre, filo, longitud){
        super(tipo,nombre)
        this.filo = filo;
        this.longitud = longitud;
        this.daño = this.filo * this.longitud;
    }
}
class ArmaContundente extends Armas {
    constructor (tipo, nombre, peso){
        super(tipo, nombre)
        this.peso = peso;
        this.daño = this.peso;
    }
}
class Armaduras {
    constructor (tipo){
        this.tipo = tipo;
    }
}
class Cascos extends Armaduras {
    constructor(tipo){
        super (tipo)
        this.puntosDeDefensaExtra = 10;
    }
}
class Escudos extends Armaduras {
    constructor(tipo){
        super(tipo)
        this.puntosDeDefensaExtra = 5;
        this.destrezaExtra = 0.1;
    }
}
class Gladiador {
    constructor(tipo, fuerza, destreza, nombre) {
        this.tipo = tipo;
        this.fuerza = fuerza;
        this.destreza = destreza;
        this.nombre = nombre;
        this.vida = 100;
        this.armas = [];
        this.armaduras = [];
    }

    agregarArma(arma) {
        this.armas.push(arma);
    }

    equiparArmadura(armadura) {
        this.armaduras.push(armadura);
    }

    calcularDefensa() {
        const puntosArmadura = this.armaduras.reduce(
            (total, armadura) => total + (armadura.puntosDeDefensaExtra || 0),
            0
        );
        return puntosArmadura;
    }

    calcularAtaque() {
        const DañoDeArmas = this.armas.reduce((total, arma) => total + arma.daño, 0);
        return DañoDeArmas + this.fuerza;
    }

    atacar(otroGladiador) {
        const ataque = this.calcularAtaque();
        const defensa = otroGladiador.calcularDefensa();
        const daño = Math.max(0, ataque - defensa);
        otroGladiador.vida -= daño;
        console.log(`${this.nombre} inflige ${daño} de daño a ${otroGladiador.nombre}`);
    }

    pelearContra(otroGladiador) {
        while (this.vida > 0 && otroGladiador.vida > 0) {
            this.atacar(otroGladiador);
            if (otroGladiador.vida <= 0) break;
            otroGladiador.atacar(this);
        }
        const ganador = this.vida > 0 ? this : otroGladiador;
        console.log(`¡El ganador es ${ganador.nombre} con ${ganador.vida} puntos de vida restantes!`);
    }
}

class Mirmillon extends Gladiador {
    constructor(nombre, fuerza, destreza) {
        super("Mirmillon", fuerza, destreza, nombre);
    }

    calcularDefensa() {
        const defensaBase = super.calcularDefensa();
        return defensaBase + this.destreza;
    }
}

class Dimachaerus extends Gladiador {
    constructor(nombre, fuerza, destreza) {
        super("Dimachaerus", fuerza, destreza, nombre);
    }

    calcularDefensa() {
        return Math.max(5, this.destreza / 2 + super.calcularDefensa());
    }

    atacar(otroGladiador) {
        super.atacar(otroGladiador);
        this.destreza++;
    }
}


class Coliseo {
    constructor() {
        this.gladiadores = [];
    }

    agregarGladiador(gladiador) {
        this.gladiadores.push(gladiador);
    }

    asignarArma(gladiador, arma) {
        gladiador.agregarArma(arma);
    }

    generarYAgregarArma(gladiador) {
        const tipos = ["filo", "contundente"];
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];

        if (tipo === "filo") {
            const filo = Math.random(); // Filo entre 0 y 1
            const longitud = Math.floor(Math.random() * 100) + 50; // Longitud entre 50 y 150 cm
            const nuevaArma = new ArmaDeFilo("Espada", "Arma de filo aleatoria", filo, longitud);
            this.asignarArma(gladiador, nuevaArma);
        } else if (tipo === "contundente") {
            const peso = Math.floor(Math.random() * 15) + 1; // Peso entre 1 y 15
            const nuevaArma = new ArmaContundente("Maza", "Arma contundente aleatoria", peso);
            this.asignarArma(gladiador, nuevaArma);
        }
    }

    iniciarPelea() {
        if (this.gladiadores.length !== 2) {
            console.log("El Coliseo necesita exactamente 2 gladiadores para iniciar la pelea.");
            return;
        }

        const [gladiador1, gladiador2] = this.gladiadores;
        console.log(`¡Empieza el combate entre ${gladiador1.nombre} y ${gladiador2.nombre}!`);
        gladiador1.pelearContra(gladiador2);
    }
}

// Crear el Coliseo
const coliseo = new Coliseo();
const mirmillon = new Gladiador("Mirmillon", 18, 15, "Máximo");
const dimachaerus = new Gladiador("Dimachaerus", 12, 12, "Spartacus");

// Agregar gladiadores al Coliseo
coliseo.agregarGladiador(mirmillon);
coliseo.agregarGladiador(dimachaerus);

// Generar y asignar armas aleatorias
coliseo.generarYAgregarArma(mirmillon);
coliseo.generarYAgregarArma(dimachaerus);

// Iniciar la pelea
coliseo.iniciarPelea();
