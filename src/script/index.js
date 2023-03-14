//! Primeita parte - números:

// funções auxiliares:
function sum(valores_parametro) {
    return valores_parametro.reduce((total, item) => total + item, 0);
}

function max(valores_parametro) {
    return valores_parametro.reduce((max, curr) => {
        if (curr > max) max = curr;
        return max;
    });
}

function geraValores(num = 12, valoresEmbaralhados = 2) {
    /*  
    -> gera valores para os atributos de uma ficha de rpg
    :param num: quantidade de pontos a serem distribuídos (12 por padrão)
    :param embaralha_numeros: passa como parâmetro o valor de itens embaralhados para o método "embaralha_valores" 
    */

    const valores = [0, 0, 0, 0, 0, 0];

    const maximo = num;

    let cont = 0;
    
    while (sum(valores) < maximo) {
        const rand = Math.floor(Math.random() * 6) + 1;
        valores[cont] += rand;

        cont++;

        if (cont > 5){
            cont = 0;
        }


        //* Respeitar o valor máximo informado:
        const maiorValor = max(valores);
        if (sum(valores) > maximo) {
            for (let i = 0; i < valores.length; i++) {
                if (valores[i] == maiorValor) {
                    valores[i] -= (sum(valores) - maximo);
                }
            }
        }


        //* se for menor ou igual a 20, um atributo não pode passar de 5
        if (maximo <= 20) {
            for (let i = 0; i < valores.length; i++) {
                if (valores[i] > 5) {
                    valores[i] -= 5;
                }
            }
        }
    }

    organizaValores(valores);
    embaralhaValores(valores, valoresEmbaralhados);
    
    //const diferenca = (sum(valores) - maximo);

    
    //const soma = sum(valores);
    return valores;
}

function organizaValores(valores_param) {
    // Organiza os valores gerados em ordem decrescente.
    return valores_param.sort(function(a, b){return b-a});
}

function embaralhaValores(valores_param, valoresEmbaralhados) {
    // Embaralha os três valores mais altos do array pra garantir alguma variação de personagens.
    
    const embaralha = valores_param.slice(0,valoresEmbaralhados);
    embaralha.sort(() => Math.random() - 0.5);

    return valores_param.splice(0, valoresEmbaralhados, ...embaralha);
}

//! Segunda parte - classes
    //? O gerenciamento das funções de classe:
function executaClasse(classe, pontos) {
    /*
    -> Executa o método da classe escolhida, fazendo a distribuição dos valores de maneira mais coerente.
    :param num_escolha: é o valor escolhido no método "escolhe_classe", que será usado no pattern matching.
    :param num_atributos: é o valor de pontos a serem distribuídos (padrão: 12)
    */

    const embaralhaNumeros = 2;  // valor padrão

    const atributos = {'forca': 0, 'habilidade': 0, 'armadura': 0, 'resistencia': 0, 'mente': 0, 'pdf': 0, 'PV': 0, 'PF': 0, 'PM': 0}

    const personagem = {};
    personagem.classe = classe;
    personagem.pontosTotais = pontos;

    let atributosValores;
    let atributosClasse;

    switch (classe) {
        case 'guerreiro':
            atributosValores = geraValores(pontos, valoresEmbaralhados = 3);
            atributosClasse = guerreiro(atributos, atributosValores);
            personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822374.png";
            break;
        case 'arqueiro':
            atributosValores = geraValores(pontos, embaralhaNumeros);
            atributosClasse = arqueiro(atributos, atributosValores);
            personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822363.png";
            break;
        case 'mago':
            atributosValores = geraValores(pontos, embaralhaNumeros);
            atributosClasse = mago(atributos, atributosValores);
            personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822378.png";
            break;
        case 'ladino':
            atributosValores = geraValores(pontos, embaralhaNumeros);
            atributosClasse = ladino(atributos, atributosValores);
            personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822380.png";
            break;
        case 'capanga':
            atributosValores = geraValores(pontos, valoresEmbaralhados = 6);
            atributosClasse = capanga(atributos, atributosValores);
            personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822379.png";
            break;
        default:
            atributosValores = geraValores(pontos, valoresEmbaralhados = 6);
            atributosClasse = aleatorio(atributos, atributosValores);
            personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822371.png";
            break;
    }

    atributosClasse.PV = atributosClasse.resistencia * 5;
    atributosClasse.PF = atributosClasse.resistencia * 5;
    atributosClasse.PM = atributosClasse.mente * 5;

    if (atributosClasse.PV < 1) {
        atributosClasse.PV = 1;
    }
    if (atributosClasse.PF < 1) {
        atributosClasse.PF = 1;
    }
    if (atributosClasse.PM < 1) {
        atributosClasse.PM = 1;
    }

    personagem.atributos = atributosClasse;

    return personagem;
}

    //? As classes em si:
function guerreiro(atributos, atributosValores) {
    /*
    -> Gera uma ficha de classe Guerreiro.
    :param atributos: recupera o objrtos com os nomes dos atributos e os valores iniciais (0)
    :param atributos_valores: recupera os valores gerados no pattern matching do método "executaClasse" através do método "geraValores"
    */
    const atributosGuerreiro = {...atributos};

    atributosGuerreiro.forca = atributosValores[0];
    atributosGuerreiro.armadura = atributosValores[1];
    atributosGuerreiro.resistencia = atributosValores[2];
    atributosGuerreiro.habilidade = atributosValores[3];
    atributosGuerreiro.mente = atributosValores[4];
    atributosGuerreiro.pdf = atributosValores[5];

    return atributosGuerreiro;
}

function arqueiro(atributos, atributosValores) {
    const atributosArqueiro = {...atributos};

    atributosArqueiro.pdf = atributosValores[0];
    atributosArqueiro.habilidade = atributosValores[1];
    atributosArqueiro.armadura = atributosValores[2];
    atributosArqueiro.resistencia = atributosValores[3];
    atributosArqueiro.mente = atributosValores[4];
    atributosArqueiro.forca = atributosValores[5];

    return atributosArqueiro;
}

function mago(atributos, atributosValores) {
    const atributosMago = {...atributos};

    atributosMago.mente = atributosValores[0];
    atributosMago.habilidade = atributosValores[1];
    atributosMago.resistencia = atributosValores[2];
    atributosMago.armadura = atributosValores[3];
    atributosMago.forca = atributosValores[4];
    atributosMago.pdf = atributosValores[5];

    return atributosMago;
}

function ladino(atributos, atributosValores) {
    const atributosLadino = {...atributos};

    atributosLadino.habilidade = atributosValores[0];
    atributosLadino.resistencia = atributosValores[1];
    atributosLadino.forca = atributosValores[2];
    atributosLadino.pdf = atributosValores[3];
    atributosLadino.armadura = atributosValores[4];
    atributosLadino.mente = atributosValores[5];

    return atributosLadino;
}

function capanga(atributos, atributosValores) {
    const atributosCapanga = {...atributos};

    atributosCapanga.forca = atributosValores[0];
    atributosCapanga.habilidade = atributosValores[1];
    atributosCapanga.armadura = atributosValores[2];
    atributosCapanga.resistencia = atributosValores[3];
    atributosCapanga.mente = atributosValores[4];
    atributosCapanga.pdf = atributosValores[5];

    return atributosCapanga;
}

function aleatorio(atributos, atributosValores) {
    const atributosAleatorio = {...atributos};

    atributosAleatorio.forca = atributosValores[0];
    atributosAleatorio.habilidade = atributosValores[1];
    atributosAleatorio.armadura = atributosValores[2];
    atributosAleatorio.resistencia = atributosValores[3];
    atributosAleatorio.mente = atributosValores[4];
    atributosAleatorio.pdf = atributosValores[5];

    return atributosAleatorio;
}


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
    
    console.log(personagem);
}