import { executaClasse } from "./classes.js";


//! Terceira parte - interação com o usuário (receber e exibir dados):
const botao = document.getElementById('btn');
botao.addEventListener('click', () => {
    // Pegando os pontos informados pelo usuário.
        //? passar como parâmetro do gerador de pontos
    let pontosTotais = parseInt(document.querySelector('input#pontosTotais').value);
    
    // Pegando a classe selecionada pelo usuário:
    //? passar como parâmetro do seletor de classes.
    const classes = document.querySelector('select#classes-escolher');
    let classeEscolhida = classes.options[classes.selectedIndex].value;
    
    // Tratando erros
    if (pontosTotais < 0 || pontosTotais > 1000) {
        alert("Use valores entre 0 e 1000.");
        return;
    }
    
    if (classeEscolhida === '') {
        classeEscolhida = 'aleatorio';
    }

    if (isNaN(pontosTotais) && classeEscolhida === 'capanga') {
        pontosTotais = 5;
    }
    else if (isNaN(pontosTotais) && classeEscolhida !== 'capanga') {
        pontosTotais = 12;
    }

    const personagem = executaClasse(classeEscolhida, pontosTotais);

    exibeDados(personagem);
})

function exibeDados(personagem) {
    //* atributos de base:
    const forca = document.querySelector('span#for-valor');
    const habilidade = document.querySelector('span#hab-valor');
    const armadura = document.querySelector('span#arm-valor');
    const resistencia = document.querySelector('span#res-valor');
    const mente = document.querySelector('span#men-valor');
    const pdf = document.querySelector('span#pdf-valor');

    forca.textContent = personagem.atributos.forca;
    habilidade.textContent = personagem.atributos.habilidade;
    armadura.textContent = personagem.atributos.armadura;
    resistencia.textContent = personagem.atributos.resistencia;
    mente.textContent = personagem.atributos.mente;
    pdf.textContent = personagem.atributos.pdf;
    
    //* pontos de saúde:
    const pv = document.querySelector('p#pv-valor');
    const pf = document.querySelector('p#pf-valor');
    const pm = document.querySelector('p#pm-valor');

    pv.textContent = personagem.atributos.PV;
    pf.textContent = personagem.atributos.PF;
    pm.textContent = personagem.atributos.PM;

    //* Imagem do personagem:
    const img = document.querySelector('img#personagem-img');
    img.src = personagem.img;

    const abbr = document.querySelector('abbr#info-classe');
    abbr.title = personagem.classe;
    
    console.log(personagem);
}