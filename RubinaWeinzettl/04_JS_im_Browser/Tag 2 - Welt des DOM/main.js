
const addButton = document.getElementsByTagName("button")[0];
const inputField = document.getElementById("item");
const list = document.getElementsByTagName("ul")[0];

 const addListItem = () => {
    var inputValue = inputField.value;

    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    const removeItem = () => {
       list.removeChild(listItem);
    }; 

   inputField.value = ""; 
   listItem.appendChild(span);
   listItem.appendChild(deleteButton);
   span.innerText = inputValue;
   deleteButton.innerText = "Delete";
   deleteButton.id = "delete";

   deleteButton.addEventListener("click", removeItem); 
   
   list.appendChild(listItem);
};

addButton.addEventListener("click", addListItem);


