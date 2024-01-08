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
            // Se não for uma resposta de sucesso, lançamos um erro com o status para tratamento no catch
            return response.json().then(err => { throw new Error(`Erro ${response.status}: ${err.message}`) });
        }
        return response.json(); // Continuamos com a resposta JSON se tudo estiver ok
    })
    .then(data => {
        // Aqui você trata a resposta de sucesso
        alert("Cadastro realizado com sucesso!");
        document.getElementById("confirmed").innerText = "Cadastro realizado com sucesso!";
        // Limpar o formulário após o sucesso, se desejado
        document.getElementById("userSignupForm").reset();
    })
    .catch(error => {
        // Tratamento de erros
        console.error('Erro na solicitação:', error);
        alert("Falha no cadastro: " + error.message); // Alerta o usuário
        document.getElementById("message").innerText = "Falha no cadastro: " + error.message;
    });
});
