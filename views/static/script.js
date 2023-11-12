async function Login() {
  await fetch('/api/auth/login', { 
    method: "POST", 
    body: JSON.stringify({
      "username": document.getElementById("login-username").value,
      "password": document.getElementById("login-password").value
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }
    
    })
    .then(async rawResponse => {
      var res = await rawResponse.json()
      console.log(res)
      if (res.error != null) {
        alert(res.error)
      } else {
        localStorage.setItem("token", res.token)
        alert("Your token is: " + res.token);
        window.location.replace("/");
      }
    })
    .catch(error => {
      alert(error.error);
    }); 
}


async function Register() {
  await fetch('/api/auth/register', { 
    method: "POST", 
    body: JSON.stringify({
      "username": document.getElementById("signup-username").value,
      "password": document.getElementById("signup-password").value,
      "email": document.getElementById("signup-email").value
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }
    
    })
    .then(async rawResponse => {
      var res = await rawResponse.json()
      console.log(res)
      if (res.error != null) {
        alert(res.error)
      } else {
        localStorage.setItem("token", res.token)
        alert(`Hello ${res.username} you have been been register successfully`)
        alert("Your token is: " + res.token);
        window.location.replace("/");
      }
    })
    .catch(error => {
      alert(error.error);
    }); 
}

