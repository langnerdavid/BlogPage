function toggleEdit() {
    var fields = document.querySelectorAll('[contenteditable]');
    var editButton = document.querySelector('.edit-button');
  
    if (editButton.innerText === 'Edit Fields') {
      editButton.innerText = 'Save Fields';
      fields.forEach(function(field) {
        field.contentEditable = 'true';
      });
    } else {
      editButton.innerText = 'Edit Fields';
      fields.forEach(function(field) {
        field.contentEditable = 'false';
      });
      saveData();
    }
  }
  
  
function saveData() {
    var displayName = document.getElementById('display-name').innerText;
    var username = document.getElementById('username').innerText;
    var password = document.getElementById('password').innerText;
    var description = document.getElementById('description').innerText;

    localStorage.setItem('display-name', displayName);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('description', description);
}
  
var displayName = localStorage.getItem('display-name');
var username = localStorage.getItem('username');
var password = localStorage.getItem('password');
var description = localStorage.getItem('description');
  
if (displayName) {
    document.getElementById('display-name').innerText = displayName;
}
if (username) {
    document.getElementById('username').innerText = username;
}
if (password) {
    document.getElementById('password').innerText = password;
}
if (description) {
    document.getElementById('description').innerText = description;
}

  