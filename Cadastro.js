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
    }).then(response => response.json())
      .then(data => {
          document.getElementById("message").innerText = data;
      }).catch(error => {
          console.error('Error:', error);
          document.getElementById("message").innerText = "Erro ao enviar o formulário";
      });
});
