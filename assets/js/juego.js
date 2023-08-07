const juego = (() => {

    const MSG_CPU = "La CPU ha ganado la partida!!", MSG_JUG = "El jugador 1 ha ganado la partida";
    const META = 21;
    const cartas = [
        "2C", "2D", "2H", "2S",
        "3C", "3D", "3H", "3S",
        "4C", "4D", "4H", "4S",
        "5C", "5D", "5H", "5S",
        "6C", "6D", "6H", "6S",
        "7C", "7D", "7H", "7S",
        "8C", "8D", "8H", "8S",
        "9C", "9D", "9H", "9S",
        "10C", "10D", "10H", "10S",
        "AC", "AD", "AH", "AS",
        "JC", "JD", "JH", "JS",
        "KC", "KD", "KH", "KS",
        "QC", "QD", "QH", "QS"
    ]

    let tablero; // ElementHTML
    let contadorJug1 = 0, contadorCpu = 0; // int
    let turnoJugador1 = true;
    let cartasJugador1 = [], cartasCpu = []; // arrays
    let baraja = [];

    /**
     * Iniciar Script
     */
    window.onload = () => {
        document.body.className = "bg-success";
        cabeceraJuego();
        nuevoJuego();
    }

    /**
     * Crear cabecera en el DOM
     */
    const cabeceraJuego = () => {
        const header = crearElementoHTML("div", "header bg-dark mb-3 p-2 d-flex flex-row justify-content-center align-items-center");
        header.appendChild(crearElementoHTML("span", "h2 titulo text-white me-3", "BlackJack"));
        let greyBack = crearElementoHTML("img", "grey-back");
        greyBack.src = "assets/cartas/grey_back.png";
        let redBack = crearElementoHTML("img", "red-back");
        redBack.src = "assets/cartas/red_back.png";
        header.appendChild(greyBack);
        header.appendChild(redBack);
        document.querySelector("#app").appendChild(header);
    }

    /**
     * Iniciar el juego
     */
    const nuevoJuego = () => {
        // limpiar tablero
        limpiarTablero();
        // crear tablero nuevo
        crearTablero();
        // cargar los botones del juego
        cargarBotonesJuego();
        // añadir jugadores al tablero
        addJugadores();
        // mezclar baraja
        baraja = baraja.concat(cartas);
        mezclarBaraja();
    }

    /**
     * Crea el tablero en el DOM
     */
    const crearTablero = () => {
        tablero = crearElementoHTML("div", "tablero");
        document.querySelector("#app").appendChild(tablero);
    }

    /**
     * Crea los botones del juego y los añade al DOM
     */
    const cargarBotonesJuego = () => {
        let zoneBtns = crearElementoHTML("div", "zone-btns my-2 d-flex flex-wrap flex-row justify-content-center align-items-center");

        let btnNuevoJuego = crearElementoHTML("button", "btnNuevoJuego p-2 bg-primary border border-2 text-white shadow rounded-3 m-2", "Nuevo Juego");
        btnNuevoJuego.addEventListener("click", nuevoJuego);

        let btnPedirCarta = crearElementoHTML("button", "btnPedirCarta border border-2 text-white shadow rounded-3 p-2 bg-secondary m-2", "Pedir Carta");
        btnPedirCarta.addEventListener("click", pedirCarta);

        let btnDetener = crearElementoHTML("button", "btnDetener border border-2 text-white shadow rounded-3 p-2 bg-danger m-2", "Detener");
        btnDetener.addEventListener("click", detenerJuego);

        zoneBtns.appendChild(btnNuevoJuego);
        zoneBtns.appendChild(btnPedirCarta);
        zoneBtns.appendChild(btnDetener);

        tablero.appendChild(zoneBtns);
    }

    /**
     * Crea y añade los jugadores al DOM
     */
    const addJugadores = () => {
        let jugador1 = crearElementoHTML("div", "jugador1 m-2");
        let textJugador1 = crearElementoHTML("span", "textJugador1 h2", "Jugador 1 - ");
        let contJugador1 = crearElementoHTML("span", "contJugador1");
        contJugador1.innerHTML = contadorJug1;

        textJugador1.appendChild(contJugador1);
        jugador1.appendChild(textJugador1);
        jugador1.appendChild(crearElementoHTML("div", "zoneCardJugador1 d-flex flex-row"));

        tablero.appendChild(jugador1);

        let cpu = crearElementoHTML("div", "cpu m-2");
        let textCpu = crearElementoHTML("span", "textCpu h2", "CPU - ");

        let contCpu = crearElementoHTML("span", "contCpu");
        contCpu.innerHTML = contadorCpu;

        textCpu.appendChild(contCpu);
        cpu.appendChild(textCpu);
        cpu.appendChild(crearElementoHTML("div", "zoneCardCpu d-flex flex-row"));

        tablero.appendChild(cpu);
    }

    /**
     * Función que muestra una nueva carta en el juego
     */
    const pedirCarta = () => {
        if (turnoJugador1) {
            if (contadorJug1 < META) {
                // añadimos carta a la lista de cartas del jugador 1
                let indiceCarta = baraja.length - 1;
                if (baraja[indiceCarta]) {
                    let numeroCarta = obtenerNumeroCarta(baraja[indiceCarta]);
                    cartasJugador1.push([baraja[indiceCarta], numeroCarta]);
                    contadorJug1 += numeroCarta;
                    document.getElementsByClassName("contJugador1")[0].innerHTML = contadorJug1;
                    mostrarCartaTablero(baraja[indiceCarta], "zoneCardJugador1");
                    baraja.pop();
                }
            }
            if (contadorJug1 == META || contadorJug1 > META) {
                turnoJugador1 = false;
                juegoCPU();
            }
        }
    }

    /**
     * Función que inicia la partida de la computadora cuando termina la del jugador
     */
    const juegoCPU = () => {
        if (!turnoJugador1) {
            // baraja = [];
            // baraja = baraja.concat(cartas);
            // mezclarBaraja();
            while (contadorCpu < META) {
                let indiceCarta = baraja.length - 1;
                if (baraja[indiceCarta]) {
                    let numeroCarta = obtenerNumeroCarta(baraja[indiceCarta]);
                    if (((contadorCpu > contadorJug1) && (contadorCpu + numeroCarta) > META)) break;
                    cartasCpu.push([baraja[indiceCarta], numeroCarta]);
                    contadorCpu += numeroCarta;
                    document.getElementsByClassName("contCpu")[0].innerHTML = contadorCpu;
                    mostrarCartaTablero(baraja[indiceCarta], "zoneCardCpu");
                    baraja.pop();
                    if ((contadorCpu > contadorJug1) || contadorJug1 > META) break;
                }
            }
            mostrarResultados();
        }
    }

    /**
     * Función que detiene la partida del jugador y comienza la de la computadora
     */
    const detenerJuego = () => {
        turnoJugador1 = false;
        if (contadorCpu == 0) juegoCPU();
    }

    /**
     * Función que obtiene el valor de la carta que se le pasa como argumento
     * @param {String} nombreCarta nombre de la carta
     * @returns {Number} retorna el valor/número de la carta
     */
    const obtenerNumeroCarta = (nombreCarta) => {
        let numeroCarta = 0;
        let aDatosCarta = nombreCarta.split("");
        if (aDatosCarta.length > 0) {
            numeroCarta = aDatosCarta.length > 2 ? aDatosCarta[0] + aDatosCarta[1] : aDatosCarta[0];
            switch (numeroCarta) {
                case "J":
                case "Q":
                case "K":
                    numeroCarta = "10";
                    break;
                case "A":
                    numeroCarta = "11";
                default:
                    break;
            }
        }

        return parseInt(numeroCarta);
    }

    /**
     * Función que pinta la carta en el tablero
     * @param {String} nombreCarta 
     * @param {HTMLElement} zonaClase 
     */
    const mostrarCartaTablero = (nombreCarta, zonaClase) => {
        let zonaCartas = document.getElementsByClassName(zonaClase)[0];
        let carta = crearElementoHTML("img", `carta`);
        carta.src = `assets/cartas/${nombreCarta}.png`;
        zonaCartas.appendChild(carta);
    }

    /**
     * Función que limpia el tablero para volver a jugar
     */
    const limpiarTablero = () => {
        if (tablero) document.querySelector("#app").removeChild(tablero);
        baraja = [];
        contadorCpu = 0;
        contadorJug1 = 0;
        turnoJugador1 = true;
    }

    /**
     * Función que desordena aleatoriamente el contenido de la baraja
     */
    const mezclarBaraja = () => {
        baraja.sort((a, b) => {
            return 0.5 - Math.random();
        })
    }

    /**
     * Función que muestra con un alert el resultado del juego
     */
    const mostrarResultados = () => {
        if (contadorJug1 == META && (contadorCpu < META || contadorCpu > META)) {
            setTimeout(() => alert(MSG_JUG), 500);
        }

        if (contadorJug1 < META && (contadorCpu > META || contadorJug1 > contadorCpu)) {
            setTimeout(() => alert(MSG_JUG), 500);
        }

        if (contadorCpu == META && (contadorJug1 < META || contadorJug1 > META)) {
            setTimeout(() => alert(MSG_CPU), 500);
        }

        if (contadorCpu < META && (contadorJug1 > META || contadorCpu > contadorJug1)) {
            setTimeout(() => alert(MSG_CPU), 500);
        }

        if ((contadorJug1 > META && contadorCpu > META)) setTimeout(() => alert("Nadie gana"), 500);

        if (contadorCpu == contadorJug1) setTimeout(() => alert("Empate!!"), 500)

    }

    /**
     * Función para crear elementos HTML
     * @param {String} elemento elemento HTML que se quiere crear
     * @param {String} clase clases que se quieran añadir al elemento
     * @param {String} texto texto que se quiera añadir al elemento
     * @returns {HTMLElement} retorna un elemento HTML
     */
    const crearElementoHTML = (elemento, clase, texto) => {
        let ele = document.createElement(elemento);
        if (clase && clase.length > 0) ele.className = clase;
        if (texto && texto.length > 0) ele.innerHTML = texto;
        return ele;
    }

    return "Play BackJack!"
})()
