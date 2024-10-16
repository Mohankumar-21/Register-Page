const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');



function showError(inputElement, errorMessage) {
  inputElement.classList.add('invalid');
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block';
}


function hideError(inputElement) {
  inputElement.classList.remove('invalid');
  const errorElement = inputElement.nextElementSibling;
  errorElement.style.display = 'none';
} 


usernameInput.addEventListener('input', function () {
  const username = usernameInput.value.trim();
   
  if (username === '') {
    showError(usernameInput, 'Username is required.');
  } else {
    hideError(usernameInput);
  } 
});


emailInput.addEventListener('input', function () {
  const email = emailInput.value.trim();
  
  if (email === '') { 
    showError(emailInput, 'Email is required.');
  } else {
    hideError(emailInput);
  }
});


passwordInput.addEventListener('input', function () {
  const password = passwordInput.value;
  
  if (password.length < 8) {
    showError(passwordInput, 'Password must be at least 8 characters long.');
  } else {
    hideError(passwordInput); 
  }
});


document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let isValid = true; 
 
  if (username === '') {
    showError(usernameInput, 'Username is required.');
    isValid = false;
  }

  if (email === '') {
    showError(emailInput, 'Email is required.');
    isValid = false;
  }

  if (password === '') {
    showError(passwordInput, 'Password is required.');
    isValid = false;
  } else if (password.length < 8) {
    showError(passwordInput, 'Password must be at least 8 characters long.');
    isValid = false;
  } else {
    hideError(passwordInput);
  }

  if (isValid) {
    const formData = {
      username: username,
      email: email,
      password: password,
    };

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      registerForm.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
});
