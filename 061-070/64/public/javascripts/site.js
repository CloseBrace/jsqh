document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formContact');
  const pristine = new Pristine(form);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const valid = pristine.validate();

    if (valid) {
      submitForm();
    } else {
      return null;
    }
  });
});

const submitForm = () => {
  // Get DOM elements we'll be working with
  const msgError = document.getElementById('msgError');
  const msgErrorList = document.getElementById('errorList');
  const msgSuccess = document.getElementById('msgSuccess');
  const form = document.getElementById('formContact');

  // harvest the form data
  const email = document.getElementById('inputEmail').value;
  const message = document.getElementById('inputMessage').value;
  const name = document.getElementById('inputName').value;
  const data = {
    email,
    message,
    name,
  };

  // Make the request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/contact', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    // Success, but still could have validation errors
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const { response } = this;
      let resp = null;
      if (response && response !== '') {
        resp = JSON.parse(response);
      }

      // Check for validation failure
      if (resp && resp.hasError) {
        // Populate the error box and show it
        let str = '';
        resp.list.forEach(errorText => (str += `<li>${errorText}</li>`));
        msgErrorList.innerHTML += str;
        msgError.style.display = 'block';
      }

      // Success - turn on the success box and blank the form
      if (resp && !resp.hasError) {
        form.reset();
        msgSuccess.style.display = 'block';
        msgError.style.display = 'none'; // just in case
      }
    }

    // Failure. Error out gracefully
    if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
      msgErrorList.innerHTML += `<li>Server Error: ${this.status}</li>`;
      msgError.style.display = 'block';
    }
  };

  xhr.send(JSON.stringify(data));
};
