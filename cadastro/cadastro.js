document.getElementById('userForm').onsubmit = async function(event){
    event.preventDefault(); // Prevent the default form submit

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let cpf = document.getElementById('cpf').value;

    // Constructing the request body
    let userData = {
        email: email,
        senha: senha,
        cpf: cpf
    };

    try {
        let response = await fetch('/AdicionaUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        let result = await response.json(); // or response.text() if the server returns plain text

        if (response.ok) {
            console.log("Usuário Adicionado:", result);
            // Handle success - perhaps clear form, or give user feedback
        } else {
            console.error("Erro ao adicionar usuário:", result);
            // Handle errors - display message to user, log, etc.
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        // Handle network errors, show user feedback
    }
}
