import { geraValores } from "./numeros.js";

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
                atributosValores = geraValores(pontos, geraValores.valoresEmbaralhados = 3);
                atributosClasse = guerreiro(atributos, atributosValores);
                personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822374.png";
                personagem.imgGrande = "https://i.pinimg.com/564x/c5/4c/d6/c54cd67d639b87171d13ba578193ca23.jpg";
                break;
            case 'arqueiro':
                atributosValores = geraValores(pontos, embaralhaNumeros);
                atributosClasse = arqueiro(atributos, atributosValores);
                personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822363.png";
                personagem.imgGrande = "https://i.pinimg.com/564x/c7/96/b0/c796b0272157341a12cd9ddd63ff2ec5.jpg";
                break;
            case 'mago':
                atributosValores = geraValores(pontos, embaralhaNumeros);
                atributosClasse = mago(atributos, atributosValores);
                personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822378.png";
                personagem.imgGrande = "https://i.pinimg.com/564x/37/79/8f/37798f3a9200d3f7b5f4976eafa7a0bc.jpg";
                break;
            case 'ladino':
                atributosValores = geraValores(pontos, embaralhaNumeros);
                atributosClasse = ladino(atributos, atributosValores);
                personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822380.png";
                personagem.imgGrande = "https://i.pinimg.com/564x/58/a0/db/58a0db3a94f6413b329ecf024ac641b1.jpg";
                break;
            case 'capanga':
                atributosValores = geraValores(pontos, geraValores.valoresEmbaralhados = 6);
                atributosClasse = capanga(atributos, atributosValores);
                personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822379.png";
                personagem.imgGrande = "https://i.pinimg.com/564x/5a/28/a6/5a28a613464c3991e51b73231de52c6a.jpg";
                break;
            default:
                atributosValores = geraValores(pontos, geraValores.valoresEmbaralhados = 6);
                atributosClasse = aleatorio(atributos, atributosValores);
                personagem.img = "https://cdn-icons-png.flaticon.com/512/2822/2822371.png";
                personagem.imgGrande = "https://i.pinimg.com/564x/1f/ce/11/1fce11a20fcbed8c17769b46efde750c.jpg";
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

export {executaClasse};