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