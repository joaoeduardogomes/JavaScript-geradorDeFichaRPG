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

export {geraValores, organizaValores, embaralhaValores};