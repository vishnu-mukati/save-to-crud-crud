function savetocrudcrud(event) {
  event.preventDefault();

  let name = event.target.username.value;
  let email = event.target.email.value;
  let phonenumber = event.target.phonenumber.value;

  
  let obj = {
    name : "name",
    email : "email",
    phonenumber : "phonenumber",
  };

  axios
    .post(
      "https://crudcrud.com/api/2463db5fdfae416c90580f7386d91856/appointment",
      obj
    )
    .then((response) => {
      displayuseronscreen(response.data);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>something went wrong</h4>";
      console.log(error);
    });
}

//   localStorage.setItem(obj.email,JSON.stringify(obj))

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/2463db5fdfae416c90580f7386d91856/appointment"
    )
    .then((response) => {
      console.log(response);

      for (let i = 0; i < response.data.length; i++) {
        displayuseronscreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function displayuseronscreen(obj) {
  let li = document.createElement("li");

  let listitem = document.createTextNode(
    `${obj.name} - ${obj.email} - ${obj.phonenumber}`
  );

  li.appendChild(listitem);

  li.setAttribute("data-id", obj._id);

  let ul = document.getElementById("userlist");

  ul.appendChild(li);

  let deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  li.appendChild(deletebtn);

  deletebtn.addEventListener("click", function (event) {
    let id = event.target.parentElement.getAttribute("data-id");
    axios
      .delete(
        `https://crudcrud.com/api/2463db5fdfae416c90580f7386d91856/appointment/${id}`
      )
      .then((response) => {
        console.log(response);
        //it is to remove the data from screeen
        ul.removeChild(event.target.parentElement);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  let editbtn = document.createElement("button");
  editbtn.textContent = "Edit";

  editbtn.addEventListener("click", function (event) {
    let id = event.target.parentElement.getAttribute("data-id");
    axios.get(`https://crudcrud.com/api/2463db5fdfae416c90580f7386d91856/appointment/${id}`)
      .then((response) => {
        console.log(response);
        let obj = response.data;

        document.getElementById("username").value = obj.name;
        document.getElementById("email").value = obj.email;
        document.getElementById("phonenumber").value = obj.phonenumber;

        ul.removeChild(event.target.parentElement);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  li.appendChild(editbtn);
}
