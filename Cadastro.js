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
            return response.json().then(err => { throw new Error(`Erro ${response.status}: ${err.message || JSON.stringify(err)}`) });
        }
        return response.json(); // Se tudo estiver ok, prosseguimos com a resposta JSON
    })
    .then(data => {
        // Aqui você trata a resposta de sucesso
        if(data.message === "Usuário Adicionado") {
            document.getElementById("message").innerText = "Cadastro realizado com sucesso!";
            document.getElementById("userSignupForm").reset(); // Limpar o formulário após o sucesso, se desejado
        } else {
            // Lida com qualquer outra resposta que não seja a esperada
            throw new Error(data.message || "Ocorreu um erro desconhecido");
        }
    })
    .catch(error => {
        // Tratamento de erros
        console.error('Erro na solicitação:', error);
        document.getElementById("message").innerText = "Falha no cadastro: " + error.message;
    });
});
