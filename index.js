let pizzas = []; // Array de pizzas adicionadas

// Função para verificar qual radio foi marcado e disponibilizar o formulário correto
document.addEventListener("DOMContentLoaded", function() {
    const formRedonda = document.getElementById("formRedonda");
    const formQuadrada = document.getElementById("formQuadrada");
    
    const radioRedonda = document.getElementById("pizzaRedonda");
    const radioQuadrada = document.getElementById("pizzaQuadrada");
    // Evento que fica escutando qual radio está sendo selecionado. Quando um é selecionado o outro é escondido e a formatação do formulário é passada junto.
    radioRedonda.addEventListener("change", function() {
        if (radioRedonda.checked) {
            formRedonda.style.display = "block";
            formRedonda.style.marginTop = "20px";
            formRedonda.style.display = "flex";
            formRedonda.style.flexDirection = "column";
            formRedonda.style.justifyContent = "center";
            formRedonda.style.alignItems = "center";
            
            formQuadrada.style.display = "none";
        }
    });
    
    radioQuadrada.addEventListener("change", function() {
        if (radioQuadrada.checked) {
            formQuadrada.style.display = "block";
            formQuadrada.style.marginTop = "20px";
            formQuadrada.style.display = "flex";
            formQuadrada.style.flexDirection = "column";
            formQuadrada.style.justifyContent = "center";
            formQuadrada.style.alignItems = "center";
            
            formRedonda.style.display = "none";
        }
    });
});
// função para salvar as pizzas adicionadas
function salvarPizzas(event) {
    event.preventDefault();

    let nome = '';
    let preco = 0;
    let tamanho = 0;
    let pedacoPorPreco = 0;

    const tipoPizzaSelecionada = document.querySelector('input[name="tipoPizza"]:checked').value;
    // É feita a verificação de qual tipo de pizza está sendo passada e feitas as modificações necessárias nos campos
    if (tipoPizzaSelecionada === "redonda") {
        nome = document.getElementById("formRedonda").querySelector("#nome").value;
        preco = parseFloat(document.getElementById("formRedonda").querySelector("#preco").value);
        tamanho = parseFloat(document.getElementById("formRedonda").querySelector("#tamanho").value);
        pedacoPorPreco = (3.14 * (tamanho / 2) * (tamanho / 2)) / preco;
    } else if (tipoPizzaSelecionada === "quadrada") {
        nome = document.getElementById("formQuadrada").querySelector("#nome").value;
        preco = parseFloat(document.getElementById("formQuadrada").querySelector("#preco").value);
        const altura = parseFloat(document.getElementById("formQuadrada").querySelector("#altura").value);
        const comprimento = parseFloat(document.getElementById("formQuadrada").querySelector("#comprimento").value);
        tamanho = `${altura}x${comprimento}`;
        pedacoPorPreco = (altura*comprimento) / preco;
    }
    // Objeto pizza criado com os atributos passados pelo formulário
    const novaPizza = {
        nome: nome,
        tamanho: tamanho,
        preco: preco,
        pedacoPorPreco: pedacoPorPreco,
    };
    // Adicionando a pizza ao array de pizzas
    pizzas.push(novaPizza);

    // Limpar campos dos formulários
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        input.value = '';
    });

    if (pizzas.length !== 0) {
        document.querySelector('.container').style.display = 'block';
    }

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
// Função para limpar a tabela/ array de pizzas
function limparTabela() {
    pizzas = [];
    document.querySelector('.container').style.display = 'none'; 
    atualizarTabela();
}

// Aqui é adicionado um evento para escutar o botão input "submit" e quando o botão for apertado a função salvarPizzas é chamada e desencadeia todo o processo
const formRedonda = document.getElementById("formRedonda");
formRedonda.addEventListener("submit", salvarPizzas);

const formQuadrada = document.getElementById("formQuadrada");
formQuadrada.addEventListener("submit", salvarPizzas);
