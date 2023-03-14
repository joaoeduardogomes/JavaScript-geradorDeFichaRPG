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

    let atributosValores;
    let atributosClasse;

    switch (classe) {
        case 'guerreiro':
            atributosValores = geraValores(pontos, valoresEmbaralhados = 3);
            atributosClasse = guerreiro(atributos, atributosValores);
            break;
        case 'arqueiro':
            atributosValores = geraValores(pontos, embaralhaNumeros);
            //atributosClasse = 
    }

    atributosClasse.PV = atributosClasse.resistencia * 5;
    atributosClasse.PF = atributosClasse.resistencia * 5;
    atributosClasse.PM = atributosClasse.mente * 5;

    console.log({classe, pontos, atributos, atributosClasse})
}

    //? As classes em si:
function guerreiro(atributos, atributosValores) {
    const atributosGuerreiro = {...atributos};

    atributosGuerreiro.forca = atributosValores[0];
    atributosGuerreiro.armadura = atributosValores[1];
    atributosGuerreiro.resistencia = atributosValores[2];
    atributosGuerreiro.habilidade = atributosValores[3];
    atributosGuerreiro.mente = atributosValores[4];
    atributosGuerreiro.pdf = atributosValores[5];

    return atributosGuerreiro;
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

    executaClasse(classeEscolhida, pontosTotais);

    console.log(pontosTotais, classeEscolhida);
})

console.log(geraValores())
console.log(geraValores(num = 15))
console.log(geraValores(num = 25))
console.log(geraValores(num = 30))