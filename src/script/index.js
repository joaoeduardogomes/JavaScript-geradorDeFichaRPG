//! Primeita parte - números:

// funções auxiliares:
function sum(n) {
    return n.reduce((total, item) => total + item, 0);
}

function geraValores(num = 12, embaralha_numeros = 3) {
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

        const maiorValor = valores.reduce((max, curr) => {
            if (curr > max) max = curr;
            return max;
        });
        if (sum(valores) > maximo) {
            for (let i = 0; i < valores.length; i++) {
                if (valores[i] == maiorValor) {
                    valores[i] -= (sum(valores) - maximo);
                }
            }
        }


        if (maximo <= 20) {
            // se for menor ou igual a 20, um atributo não pode passar de 5
            for (let i = 0; i < valores.length; i++) {
                if (valores[i] > 5) {
                    valores[i] -= 5;
                }
            }
        }
    }
    
    const diferenca = (sum(valores) - maximo);

    
    //valores.length = 6;
    const soma = sum(valores) 
    return {valores, soma, diferenca};
}

console.log(geraValores())
console.log(geraValores(num = 15))
console.log(geraValores(num = 25))
console.log(geraValores(num = 30))