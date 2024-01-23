const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');
const logoutBtn = document.getElementById('logout-btn');

if (!localStorage.getItem("userToken")) {
    window.location.href = "./index.html"; // Redireciona para a página de login se não estiver autenticado
}

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

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Limpe os dados de autenticação, como tokens, do armazenamento local ou da sessão
    localStorage.removeItem('userToken');
    // Redirecionar para a página de login
    window.location.href = './index.html';
        });

const lastThreeTickets = Tickets.slice(-4); // Obtém os últimos três elementos do array

lastThreeTickets.forEach(tickets => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${tickets.clientName}</td>
        <td>${tickets.ticketNumber}</td>
        <td>${tickets.withPerson}</td>
        <td class="${tickets.status === 'Atrasado' ? 'danger' : tickets.status === 'Aberto' ? 'warning' : 'primary'}">${tickets.status}</td>
        <td class="primary"><a href='#'>Details</a><td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});