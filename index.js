const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

document.getElementById('loginForm').onsubmit = async function (event) {
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

            // Aqui você pode redirecionar o usuário ou fazer o que precisar com o token
            // Por exemplo, salvar o token em localStorage e redirecionar
            localStorage.setItem('userToken', token);
            window.location.href = '../analytics.html'; // Substituir pelo caminho correto
        } else {
            console.error("Credenciais inválidas ou erro no servidor");
            // Aqui você pode mostrar alguma mensagem de erro para o usuário
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        // Aqui você pode mostrar alguma mensagem de erro genérica para o usuário
    }
};
