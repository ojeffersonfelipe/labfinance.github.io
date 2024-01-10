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
    .then(response => response.text())
    .then(responseText => {
        try {
            // Tenta analisar a resposta como JSON
            const responseData = JSON.parse(responseText);

            if (Array.isArray(responseData) && responseData.length > 0) {
                // Se a resposta for um array, lidar com erros conhecidos
                if (responseData[0].code === "DuplicateUserName") {
                    messageElement.innerText = "Erro: O e-mail já está em uso.";
                } else {
                    // Tratar outros erros que possam estar no array
                    messageElement.innerText = "Erro no cadastro: " + responseData[0].description;
                }
            } else if (responseText === '"Usuário Adicionado"') {
                messageElement.innerText = "Cadastro realizado com sucesso!";
                messageElement.style.color = "green"; 
                document.getElementById("userSignupForm").reset();
            } else {
                // Lida com qualquer outra resposta que não seja a esperada
                messageElement.innerText = `Falha no cadastro: ${responseText}`;
            }
        } catch (error) {
            // Se a resposta não puder ser analisada como JSON
            messageElement.innerText = `Falha no cadastro: ${responseText}`;
        }

        messageElement.style.color = "red"; // Adiciona cor vermelha para falha
    })
    .catch(error => {
        // Tratamento de erros
        console.error('Erro na solicitação:', error);
        messageElement.innerText = "Falha no cadastro: " + error.message; // Mostra as mensagens de erro da API
        messageElement.style.color = "red"; // Adiciona cor vermelha para falha
    });
});
