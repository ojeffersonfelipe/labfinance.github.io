document.getElementById("userSignupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var user = {
        email: document.getElementById('email'),
        senha: document.getElementById('senha'),
        cpf: document.getElementById('cpf'),
        nome: document.getElementById('nome'),
        cargo: document.getElementById('cargo')
    };
    // Isto imprimirá os dados do usuário no console para fins de debug
    console.log("Dados que serão enviados para a API:", user);

    fetch('https://localhost:7288/AdicionaUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        
    })
    .then(response => {
        // Verifica se a solicitação foi bem-sucedida
        if(response.ok) {
            return response.json(); // Continua para processar a resposta do servidor
        } else {
            throw new Error('Algo deu errado no servidor!'); // Lança um erro se a resposta não for bem-sucedida
        }
    })
    .then(data => {
        // Processa a resposta do servidor
        if(data.success) {
            document.getElementById("message").innerText = "Cadastro realizado com sucesso!";
        } else {
            document.getElementById("message").innerText = "Falha no cadastro: " + data.message;
        }
    })
    .catch(error => {
        console.error('Erro na solicitação:', error);
    });
});
