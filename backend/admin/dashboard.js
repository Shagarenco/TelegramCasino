// backend/admin/dashboard.js

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const users = await response.json();

    displayUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    document.getElementById("userList").innerHTML = "<li>No connection to backend.</li>";
  }
}

function displayUsers(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  if (!users || users.length === 0) {
    userList.innerHTML = "<li>No users found.</li>";
    return;
  }

  users.forEach(user => {
    const userItem = document.createElement("li");
    userItem.className = "user-item";
    userItem.innerHTML = `
      <strong>${user.username || 'Unknown'}</strong> 
      (ID: ${user.telegramId}) - 
      Balance: <span class="balance">${user.balance}</span>
    `;
    userList.appendChild(userItem);
  });
}

async function fetchUser() {
  const telegramId = document.getElementById("telegramIdInput").value.trim();
  if (!telegramId) {
    alert("Please enter a Telegram ID.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/referral/${telegramId}`);
    const user = await response.json();

    if (!user || !user.telegramId) {
      alert("User not found.");
      return;
    }

    document.getElementById("userId").textContent = user.telegramId;
    document.getElementById("userBalance").textContent = user.balance;
    document.getElementById("referralEarnings").textContent = user.referralEarnings;
    document.getElementById("userProfile").style.display = "block";
  } catch (error) {
    console.error("Error loading user:", error);
    alert("Error loading user.");
  }
}

async function updateBalance() {
  const telegramId = document.getElementById("userId").textContent;
  const newBalance = parseFloat(document.getElementById("newBalance").value);

  if (!telegramId || isNaN(newBalance)) {
    alert("Invalid input.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/update-balance/${telegramId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ balance: newBalance })
    });

    const result = await response.json();

    if (result.success) {
      alert("Balance updated successfully!");
      document.getElementById("userBalance").textContent = result.newBalance;
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error.");
  }
}

// Start the dashboard
fetchUsers();