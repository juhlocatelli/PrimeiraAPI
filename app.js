import http from 'http';//feita em tempo de compilação, forma assíncrona.
import fs from 'fs';
import rotas from './routes.js';

fs.writeFile('./mensagem.txt', 'Olá, Tic em Trilhas do arquivo!', 'utf-8', (erro) =>{
    if (erro){
        console.log('Falha ao escrever o arquivo', erro);
        return;
    };
    console.log('Arquivo foi criado com sucesso');
});

fs.readFile('./mensagem.txt', 'utf-8', (erro, conteudo) => {
    if (erro){
        console.log('Falaha na leitura do arquivo', erro);
        return;//encerramos ela com a chamada do return
    }

    console.log(`Conteudo: ${conteudo}`);
    iniciaServidorHttp(conteudo);
    
})

//ENCAPSULAMENTO:
function iniciaServidorHttp(conteudo) {//ao fazer deste jeito, a mensagem ficará visível no terminal e no servidor também
    const servidor = http.createServer((req, res) => {
        /*
        INSTANCIAÇÂO
        res.statusCode = 200;//estrutura básica http
        res.setHeader('Content-type', 'text/plain; charset=utf-8');
        res.end(mensagem);
        */
        rotas(req, res, {conteudo});
    });
    
    const porta = 3000;
    const host = 'localhost';// atende as requisições
    
    servidor.listen(porta, host, () => {
        console.log(`Servidor executando em http://${host}:${porta}/`);//importante usar crase
    });
}

/*function exemploTradicional() {
    console.log('Tradicional');//uma função tradicional, com nome e nesse caso sem parametro.
};

const exemploExpressao = function() {
    console.log('Expressão');//função que se baseia em definir uma variável que recebe uma funçaõ
};

const exemploArrow = () => {
    console.log('Arrow');//arrow function, são mais flexiveis para atribuição de valores a variaveis
};
*/



