const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try{
        const response = await fetch("http://localhost:3000/api/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, senha})
        });
        
const data = await response.json();

if (response.ok) {
  mensagem.style.color = "green";
  mensagem.innerText = data.message;

  // 🔐 MARCA COMO LOGADO
  sessionStorage.setItem("logado", "true");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 800);
} else {
  mensagem.style.color = "red";
  mensagem.innerText = data.message;
}
    } catch (error) {
        mensagem.style.color = "red";
        mensagem.innerText = "Erro ao conectar com o servidor";
        console.error(error);
    }
});
