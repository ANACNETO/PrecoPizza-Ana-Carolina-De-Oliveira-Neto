let pizzas = []; // Array de pizzas adicionadas

function salvarPizzas(event) {
    event.preventDefault();     // previne a execução padrão de um formulário, de submeter os dados para outra página

    // Obtem os valores dos inputs
    let nome = document.getElementById("nome").value;                           
    let tamanho = parseFloat(document.getElementById("tamanho").value);
    let preco = parseFloat(document.getElementById("preco").value);
    // Já cria um atributo do pedaço por preço da pizza e efetua o cálculo de quantos cm^2 por real de pizza de cada pizza
    let pedacoPorPreco = (3.14 * (tamanho / 2) * (tamanho / 2)) / preco;
    // Cria um objeto para armazenar os atributos de cada pizza
    let novaPizza = {
        nome: nome,
        tamanho: tamanho,
        preco: preco,
        pedacoPorPreco: pedacoPorPreco,
    };
    // Adiciona a pizza ao array de pizzas
    pizzas.push(novaPizza);
    // Limpa os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("tamanho").value = "";
    document.getElementById("preco").value = "";

    // Mostra a tabela no html se o array não for vazio
    if (pizzas.length !== 0) {
        document.querySelector('.container').style.display = 'block';
    }
    // Chama as outra funções quando o form é submetido
    ordernarPizzas();
    atualizarTabela();
}
// Função para calcular a diferença percentual entre as pizzas passando o pedaço por valor em relação ao melhor custo benefício
function calcularDiferencaPercentual(melhorValor, valor) {
    return ((melhorValor / valor) - 1) * 100;
}
// Ordena as pizzas pelo pedaço por preço, se o pedaço por preço for maior, logo ele terá o melhor custo benefício
function ordernarPizzas() {
    pizzas.sort((a, b) => b.pedacoPorPreco - a.pedacoPorPreco);
}
// Função para atualizar a tabela cada vez que uma nova pizza é adicionada
function atualizarTabela() {
    const tabela = document.getElementById("tabelaPizzas");

    // Limpa a tabela
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }

    // Recria a tabela com a ordem correta das pizzas
    const melhorPizza = pizzas[0].pedacoPorPreco;

    // Para cada nova pizza é criada uma lina e os campos devidos
    pizzas.forEach((pizza, index) => {
        let novaLinha = tabela.insertRow(-1);

        let nomeCelula = novaLinha.insertCell(0);
        let tamanhoCelula = novaLinha.insertCell(1);
        let precoCelula = novaLinha.insertCell(2);
        let pedacoPorPrecoCelula = novaLinha.insertCell(3);
        let diferencaCelula = novaLinha.insertCell(4);

        // Adicionado os valores a cada campo
        nomeCelula.innerHTML = pizza.nome;
        tamanhoCelula.innerHTML = pizza.tamanho;
        precoCelula.innerHTML = `R$ ${pizza.preco}`;
        pedacoPorPrecoCelula.innerHTML = pizza.pedacoPorPreco.toFixed(2);
        //Se o index for 0, ou seja, a primeira pizza terá a frase "Melhor CB"
        if (index === 0) {
            diferencaCelula.innerHTML = "Melhor CB";
        } else {
            //As outras pizzas irão trazer a mensagem e o valor da diferença percentual com a pizza de melhor CB
            const diferencaPercentual = calcularDiferencaPercentual(melhorPizza, pizza.pedacoPorPreco);
            diferencaCelula.innerHTML = `+${diferencaPercentual.toFixed(0)}%`;
        }
    });
}
// Aqui é adicionado um evento para escutar o botão input "submit" e quando o botão for apertado a função salvarPizzas é chamada e desencadeia todo o processo
let form = document.querySelector("form");
form.addEventListener("submit", salvarPizzas);
