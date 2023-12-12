

const handleLogin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((response) => {
      localStorage.setItem("token", response.token);

      if (response.token) {
        window.location.href = "/dashboard";
      }
    });
};

const handleSignUp = () => {
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/register", {
    method: "POST",
    body: JSON.stringify(password),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((response) => {
      console.log(response);
    });
};
