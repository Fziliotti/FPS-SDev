class Particula {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.dx = 0;
        this.dy = 0;
        this.radius = RADIUS;
        this.color = COLOR;
        this.opacity = 1;
        this.aliveFor = 0;
        this.ttl = TTL;
        this.isAlive = true;
    }

    efeitoChuva() {
        // Acelerando particula a ACCpx/tick^2 quando a particula tiver viva por 30 frames (0.5s)
        if (this.aliveFor >= PERMANENCIA) {
            this.dx += Math.cos(SENTIDO) * ACC;
            this.dy += Math.sin(SENTIDO) * ACC;
        }

        let v = this.aliveFor / this.ttl;
        v = 1 - v;

        // Atualizando tamanho de acordo com "idade" da particula
        this.radius = v * RADIUS;

        // Atualizando opacidade
        this.opacity = Math.sin(Math.PI * v);
        this.opacity *= this.opacity;
    }

    update() {
        // Rodando efeito
        this["efeito" + EFEITO]();

        // Somando velocidade na posição
        this.x += this.dx;
        this.y += this.dy;

        // Aumentando tempo de vida
        this.aliveFor++;

        // Removendo se mais velha que o necessário
        if (this.aliveFor >= this.ttl)
            this.isAlive = false;
    }

    draw(ctx) {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.TAU);
        ctx.fill();

        ctx.restore();
    }
}

(() => {
    const canvas = document.getElementById("particulas"),
        ctx = canvas.getContext("2d");

    const particulas = new Array();

    function frame() {
        // Atualizando tamanho
        if (canvas.width != canvas.clientWidth ||
            canvas.height != canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        // Limpando canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Atualizando e desenhando particulas
        particulas.forEach(p => p.update());
        particulas.forEach(p => p.draw(ctx));

        // Particulas abaixo da tela morrem
        particulas.forEach(p => {
            if (p.y - p.radius > canvas.height)
                p.isAlive = false;
        });

        // Removendo particulas que devem ser removidas
        particulas.filter(p => !p.isAlive)
            .forEach(p => particulas.splice(particulas.indexOf(p), 1));

        // Nova particula
        particulas.push(new Particula(Math.random() * canvas.width, Math.random() * canvas.height));

        // Chamando próximo frame
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();


var RADIUS = 4;
var COLOR = "#FFF";
var TTL = 70; // 60f = 1s pra maioria dos monitores
var ACC = 0.1; // Gravidade em px/frame^2
var EFEITO = "Chuva";
var SENTIDO = Math.PI / 2;
var PERMANENCIA = 30;
Math.TAU = 2 * 3.141592653589793238462643383279502;


// ALTERNANCIA DE ANIMAÇÕES

var bg = document.querySelector(".intro");
var introBrand = document.querySelector(".intro__brand");
var introTitle = document.querySelector(".intro__title");

var temas= [
    {colorBG: "#EF476F", colorPart: "#FFF" ,radius: 6, acc: 0.2, permanencia: 30, sentidoNumerador: 3},
    {colorBG: "#26547C", colorPart: "#001C55",radius: 4, acc: 0.1, permanencia: 30, sentidoNumerador: 2 },
    {colorBG: "#06beb6", colorPart: "#26547C",radius: 6, acc: 0.2, permanencia: 20, sentidoNumerador: 1 },
    {colorBG: "#FFD166", colorPart: "#fff",radius: 6, acc: 0.3, permanencia: 70, sentidoNumerador: 1 },
    {colorBG: "#94B0DA", colorPart: "#fff",radius: 7, acc: 0.2, permanencia: 60, sentidoNumerador: 4 },
    {colorBG: "#475B5A", colorPart: "#52D1DC",radius: 7, acc: 0.2, permanencia: 25, sentidoNumerador: 0.5 },
]


function alterarAnimation() {
   var temasSize = temas.length;
   var numRandom = getRandom(temasSize) -1 ;
   var temaEscolhido = temas[numRandom];

   RADIUS = temaEscolhido.radius;
   COLOR = temaEscolhido.colorPart;
   ACC = temaEscolhido.acc;
   SENTIDO = Math.PI / temaEscolhido.sentidoNumerador;
   PERMANENCIA =temaEscolhido.permanencia;


   bg.style.background = temaEscolhido.colorBG;
}
window.setInterval('alterarAnimation()', 4000);



function RandomColor() {
    hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    corAleatoria = "#";
    for (i = 0; i < 6; i++) {
        pos = getRandom(hexadecimal.length -1)
        corAleatoria += hexadecimal[pos]
    }
    return corAleatoria
}

function getRandom(max) {
    return Math.floor(Math.random() * max + 1)
}