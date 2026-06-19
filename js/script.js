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
