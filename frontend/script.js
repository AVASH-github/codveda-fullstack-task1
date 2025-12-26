const usersList = document.getElementById("usersList");
const userForm = document.getElementById("userForm");

const API_URL = "http://localhost:5000/api/users";

// Fetch and display users
async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  usersList.innerHTML = "";

  users.forEach(user => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="update-btn">Update</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    // Attach update event
    tr.querySelector(".update-btn").onclick = () => updateUser(user);

    // Attach delete event
    tr.querySelector(".delete-btn").onclick = () => deleteUser(user.id);

    usersList.appendChild(tr);
  });
}

// Add user
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  userForm.reset();
  loadUsers();
});

// Delete user
async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadUsers();
}

// Update user
function updateUser(user) {
  const newName = prompt("Enter new name:", user.name);
  const newEmail = prompt("Enter new email:", user.email);

  if (!newName || !newEmail) return;

  fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, email: newEmail })
  }).then(() => loadUsers());
}

// Initial load
loadUsers();
