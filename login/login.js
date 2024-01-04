document.getElementById('loginForm').onsubmit = async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        let response = await fetch('https://localhost:7288/CreateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email, Password: password })
        });

        if (response.ok) {
            let token = await response.text(); // Assumindo que a resposta é apenas o token
            console.log("Token recebido:", token);

            // Aqui você pode redirecionar o usuário ou fazer o que precisar com o token
            // Por exemplo, salvar o token em localStorage e redirecionar
            localStorage.setItem('userToken', token);
            window.location.href = './index.html'; // Substituir pelo caminho correto
        } else {
            console.error("Credenciais inválidas ou erro no servidor");
            // Aqui você pode mostrar alguma mensagem de erro para o usuário
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        // Aqui você pode mostrar alguma mensagem de erro genérica para o usuário
    }
};
