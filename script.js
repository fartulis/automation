// V2.4.2 login control, layout separation, welcome message
document.getElementById("loginBtn").onclick = function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const userPanel = document.getElementById("userPanel");

  if (
    (username === "user1" && password === "user1") ||
    (username === "admin" && password === "admin")
  ) {
    document.getElementById("loginBox").style.display = "none";
    localStorage.setItem("username", username);
    userPanel.innerHTML = `Welcome: ${username} <button onclick="logout()">Logout</button>`;
  } else {
    alert("Invalid login");
  }
};

function logout() {
  localStorage.removeItem("username");
  location.href = "index.html";
}

// On load, show welcome if already logged in
window.onload = function () {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("userPanel").innerHTML = `Welcome: ${username} <button onclick="logout()">Logout</button>`;
  }
};
