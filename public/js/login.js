const handleSubmit = () => {
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
      // Set token in local storage
      localStorage.setItem("token", response.token);

      // Check if token is set and redirect to /dashboard
      if (response.token) {
        window.location.href = "/dashboard";
      }
    });
};
