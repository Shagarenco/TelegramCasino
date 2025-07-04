// telegram-bot/public/app.js
async function checkBalance() {
  console.log("Checking balance...");
  const response = await fetch('http://localhost:3000/api/balance/123456789');
  console.log("Response:", response);
  const data = await response.json();
  console.log("Data:", data);

function playSlots() {
  fetch('https://telegram-casino-system-aho7-git-main-shagarencos-projects.vercel.app/api/slots/123456789/play', {
    method: 'POST' // <-- Wichtig: Methode explizit setzen
  })
    .then(response => response.json())
    .then(data => {
      alert(`You played and got: ${data.result.join(' ')}\nWin amount: ${data.winAmount}\nNew balance: ${data.balance}`);
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong while playing.");
    });
}

function checkBalance() {
  fetch('https://telegram-casino-system-aho7-git-main-shagarencos-projects.vercel.app/api/balance/123456789')
    .then(response => response.json())
    .then(data => {
      document.getElementById("balanceValue").textContent = data.balance;
      showBalanceSection();
    })
    .catch(error => {
      console.error("Error fetching balance:", error);
      alert("Could not load your balance.");
    });
}

function inviteUser() {
  const newUserTelegramId = document.getElementById("newUserTelegramId").value.trim();

  if (!newUserTelegramId) {
    alert("Please enter a valid Telegram ID.");
    return;
  }

  fetch('https://telegram-casino-system-aho7-git-main-shagarencos-projects.vercel.app/api/deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      telegramId: newUserTelegramId,
      amount: 100,
      referralId: "123456789"
    })
  })
    .then(response => response.json())
    .then(data => {
      alert("User invited successfully!");
      updateEarnings();
    })
    .catch(error => {
      console.error("Error inviting user:", error);
      alert("An error occurred while inviting the user.");
    });
}

function updateEarnings() {
  fetch('https://telegram-casino-system-aho7-git-main-shagarencos-projects.vercel.app/api/referral/123456789')
    .then(response => response.json())
    .then(data => {
      document.getElementById("referralEarnings").textContent = data.earnings;
    })
    .catch(error => {
      console.error("Error updating earnings:", error);
      alert("Could not update your referral earnings.");
    });
}

function showBalanceSection() {
  document.getElementById("gameArea").classList.add("d-none");
  document.getElementById("balanceArea").classList.remove("d-none");
  document.getElementById("referralArea").classList.add("d-none");
}
}