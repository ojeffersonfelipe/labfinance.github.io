document.getElementById("userSignupForm").addEventListener("submit", function(e){
    e.preventDefault();

    var formData = new FormData(this);

    fetch('https://localhost:7288/AdicionaUsuario', {
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            senha: formData.get('senha'),
            cpf: formData.get('cpf'),
            nome: formData.get('nome'),
            cargo: formData.get('cargo')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
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
        // Aqui você pode verificar o conteúdo específico de 'data' para exibir a mensagem correta
        if(data.success) { // Supondo que 'success' é uma propriedade da resposta do servidor
            document.getElementById("message").innerText = "Cadastro realizado com sucesso!";
        } else {
            // Use 'data.message' ou uma propriedade semelhante conforme a resposta do seu servidor
            document.getElementById("message").innerText = "Falha no cadastro: " + data.message;
        }
    })
    .catch(error => {
        // Captura qualquer erro que ocorra durante a execução
        console.error('Error:', error);
        document.getElementById("message").innerText = "Erro ao enviar o formulário: " + error;
    });
});
