document.addEventListener("DOMContentLoaded", function() {
  const deleteButtons = document.getElementsByClassName('btn-delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    // Get the user's ID from the button's data attribute
    const id = deleteButtons[i].getAttribute('data-user');

    deleteButtons[i].addEventListener('click', (event) => {
      // Make the request
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `/users/delete/${id}`, true);

      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          // Success
          if (this.status === 200) {
            // reload the users page to remove the deleted user
            window.location = '/users';
          }
          // Failure
          else {
            alert('User was not deleted. Check console for error.');
            console.log(`Error: ${this.response}`);
          }
        }
      };

      xhr.send();
    });
  }
});