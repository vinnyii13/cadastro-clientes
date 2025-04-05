const form = document.getElementById('client-form');
const tableBody = document.querySelector('#client-table tbody');

let clients = JSON.parse(localStorage.getItem('clients')) || [];
let editingIndex = null;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !email || !phone) return;

  const client = { name, email, phone };

  if (editingIndex !== null) {
    clients[editingIndex] = client;
    editingIndex = null;
  } else {
    clients.push(client);
  }

  localStorage.setItem('clients', JSON.stringify(clients));
  form.reset();
  renderClients();
});

function renderClients() {
  tableBody.innerHTML = '';

  clients.forEach((client, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>
        <button class="edit" onclick="editClient(${index})">Editar</button>
        <button class="delete" onclick="deleteClient(${index})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editClient(index) {
  const client = clients[index];
  form.name.value = client.name;
  form.email.value = client.email;
  form.phone.value = client.phone;
  editingIndex = index;
}

function deleteClient(index) {
  if (confirm('Deseja excluir este cliente?')) {
    clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
    renderClients();
  }
}

renderClients();
