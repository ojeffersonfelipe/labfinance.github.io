document.getElementById("userSignupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Preparando dados do usuário
    var user = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value
    };

    // Elemento de mensagem
    let messageElement = document.getElementById("message");

    // Iniciar a solicitação POST
    fetch('https://localhost:7288/AdicionaUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
        if(data.message == 'Usuário Adicionado') {
            messageElement.innerText = "Cadastro realizado com sucesso!";
            messageElement.style.color = "green"; 
            document.getElementById("userSignupForm").reset();
        } else {
            // Lida com qualquer outra resposta que não seja a esperada
            messageElement.innerText = `Falha no cadastro: ${data.message}`;
            messageElement.style.color = "red"; // Adiciona cor vermelha para falha
        }
    })
    .catch(error => {
        // Tratamento de erros
        console.error('Erro na solicitação:', error);
        messageElement.innerText = "Falha no cadastro: " + error.message; // Mostra as mensagens de erro da API
        messageElement.style.color = "red"; // Adiciona cor vermelha para falha
    });
});
