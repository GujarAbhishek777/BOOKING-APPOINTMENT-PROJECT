// Function to store the user details in local storage

function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
  
    const obj = {
      name,
      email,
      phonenumber,
    };
    localStorage.setItem(obj.email,JSON.stringify(obj)); 
    showUserOnScreen(obj);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStoragekeys = Object.keys(localStorageObj);
    for (var i = 0; i < localStoragekeys.length; i++) {
      const key = localStoragekeys[i];
      const userDetailsString = localStorageObj[key];
      const userDetailsObj = JSON.parse(userDetailsString);
      showUserOnScreen(userDetailsObj);
    }
  });
  
  // Function to display the user details on the screen
  
  function showUserOnScreen(user) {
    if (localStorage.getItem(user.email) !== null) {
      removeUserFromScreen(user.email);
    }
    const parentNode = document.getElementById("listOfUsers");
    const childHTML = `<li id =${user.email}>${user.name} - ${user.email}
                          <button onclick = deleteUser('${user.email}')>Delete</button>
                          <button onclick = editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit</button>
                          </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  
  function editUserDetails(emailId, name, phonenumber) {
    document.getElementById("email").value = emailId;
    document.getElementById("username").value = name;
    document.getElementById("phonenumber").value = phonenumber;
  
    deleteUser(emailId);
  }
  
  // Function to delete the user details from local storage
  
  function deleteUser(emailId) {
    console.log(emailId);
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId);
  }
  
  // function to remove the user details from the screen
  
  function removeUserFromScreen(emailId) {
    const parentNode = document.getElementById("listOfUsers");
    const childNodeToBeDeleted = document.getElementById(emailId);
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }