document.getElementById("userSignupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    var user = {
        email: formData.getElementById('email').value,
        senha: formData.getElementById('senha').value,
        cpf: formData.getElementById('cpf').value,
        nome: formData.getElementById('nome').value,
        cargo: formData.getElementById('cargo').value
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
