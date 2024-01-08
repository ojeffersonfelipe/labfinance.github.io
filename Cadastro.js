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
            return response.text().then(text => { throw new Error(`Erro ${response.status}: ${text}`) });
        }
        return response.text(); // Se tudo estiver ok, prosseguimos com a resposta como texto
    })
    .then(text => {
        // Aqui você trata a resposta de sucesso
        if(text === "Usuário Adicionado") {
            alert("Cadastro realizado com sucesso!");
            document.getElementById("message").innerText = "Cadastro realizado com sucesso!";
            document.getElementById("userSignupForm").reset(); // Limpar o formulário após o sucesso, se desejado
        } else {
            // Lida com qualquer outra resposta que não seja a esperada
            throw new Error(text || "Ocorreu um erro desconhecido");
        }
    })
    .catch(error => {
        // Tratamento de erros
        console.error('Erro na solicitação:', error);
        alert("Falha no cadastro: " + error.message); // Alerta o usuário
        document.getElementById("message").innerText = "Falha no cadastro: " + error.message;
    });
});
