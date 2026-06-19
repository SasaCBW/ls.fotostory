// ANIMAÇÃO AO ROLAR A PÁGINA

const elementos = document.querySelectorAll(
'.album, .sobre, .formulario, .contato'
);

function revelarElementos() {

const alturaTela = window.innerHeight;

elementos.forEach(elemento => {

const topoElemento =
elemento.getBoundingClientRect().top;

if(topoElemento < alturaTela - 100){

elemento.classList.add('ativo');

}

});

}

window.addEventListener(
'scroll',
revelarElementos
);

revelarElementos();


// BOTÃO VOLTAR AO TOPO

const botaoTopo = document.createElement('button');

botaoTopo.innerHTML = '↑';

botaoTopo.classList.add('topo-btn');

document.body.appendChild(botaoTopo);

window.addEventListener('scroll', () => {

if(window.scrollY > 400){

botaoTopo.style.display = 'block';

}else{

botaoTopo.style.display = 'none';

}

});

botaoTopo.addEventListener('click', () => {

window.scrollTo({

top:0,

behavior:'smooth'

});

});


// MENSAGEM DE BOAS-VINDAS

window.addEventListener('load', () => {

console.log(
'Bem-vindo à LS Fotostory'
);

});
.whatsapp{
position:fixed;
bottom:25px;
right:25px;
width:65px;
height:65px;
background:#25D366;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-size:32px;
color:white;
text-decoration:none;
box-shadow:0 0 20px rgba(0,0,0,.3);
z-index:999;
}

.whatsapp:hover{
transform:scale(1.1);
transition:.3s;
}
/* ANIMAÇÕES */

.album,
.sobre,
.formulario,
.contato{

opacity:0;

transform:translateY(40px);

transition:1s;

}

.ativo{

opacity:1;

transform:translateY(0);

}

/* BOTÃO TOPO */

.topo-btn{

position:fixed;

bottom:100px;

right:25px;

width:50px;

height:50px;

border:none;

border-radius:50%;

background:#d4af37;

color:black;

font-size:24px;

cursor:pointer;

display:none;

z-index:999;

font-weight:bold;

box-shadow:0 0 15px rgba(0,0,0,.4);

}

.topo-btn:hover{

transform:scale(1.1);

}
