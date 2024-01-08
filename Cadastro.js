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

    // Iniciar a solicitação POST
    fetch('https://localhost:7288/AdicionaUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        if (!response.ok) {
            // Se não for uma resposta de sucesso, processamos o erro
            return response.json().then(errors => {
                // Supondo que 'errors' é uma lista de objetos de erro
                let errorMessages = errors.map(err => `${err.code}: ${err.description}`).join('\n');
                throw new Error(errorMessages);
            });
        }
        return response.json(); // Se tudo estiver ok, prosseguimos com a resposta JSON
    })
    .then(data => {
        // Aqui você trata a resposta de sucesso
        let messageElement = document.getElementById("message");
        
        if(data.message === '"Usuário Adicionado"') {
            messageElement.innerText = "Cadastro realizado com sucesso!";
            messageElement.style.color = "green"; // Adiciona cor verde para sucesso
            document.getElementById("userSignupForm").reset(); // Limpar o formulário após o sucesso, se desejado
        } else {
            // Lida com qualquer outra resposta que não seja a esperada
            messageElement.innerText = `Falha no cadastro: ${data.message}`;
            messageElement.style.color = "red"; // Adiciona cor vermelha para falha
        }
    })
    .catch(error => {
        // Tratamento de erros
        console.error('Erro na solicitação:', error);
        let messageElement = document.getElementById("message");
        messageElement.innerText = "Falha no cadastro: " + error.message; // Mostra as mensagens de erro da API
        messageElement.style.color = "red"; // Adiciona cor vermelha para falha
    });
});
