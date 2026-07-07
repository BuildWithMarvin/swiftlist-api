const formular = document.getElementById("loginForm");
// const ausgabe = document.getElementById("ausgabe");

formular.addEventListener("submit", async function(event) {
  
  
  event.preventDefault();

  
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;
  
  const user = {
     "username": usernameInput,
     "password": passwordInput
 }


const response = await fetch("http://localhost:3000/validate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
});

if (response.ok) {

  window.location.href = "/dashboard"; 
} else {
  console.error("error login");
}
 
});