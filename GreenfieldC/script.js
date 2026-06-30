// Cache DOM elements using more specific selectors
const inputField = document.querySelector("input");
const addButton = document.querySelector("button");
const listElement = document.querySelector("ul");

// Initialize the bucket list array
const bucketList = [];

// Function to create a new list item
const createListItem = (item) => {
  const listItem = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = item;
  listItem.appendChild(span);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  listItem.appendChild(deleteButton);

  return listItem;
};

// Event handler for adding a new item
const handleAddItem = () => {
  const newItem = inputField.value.trim();

  if (newItem === "") {
    alert("Please enter an item.");
    inputField.focus();
    return;
  }

  bucketList.push(newItem);

  const listItem = createListItem(newItem);
  listElement.appendChild(listItem);

  inputField.value = "";
  inputField.focus();
};

const handleDeleteItem = (event) => {
  if (event.target.classList.contains("delete-button")) {
    const listItem = event.target.parentElement;
    const itemText = listItem.querySelector("span").textContent;

    listElement.removeChild(listItem);

    const index = bucketList.indexOf(itemText);
    if (index !== -1) {
      bucketList.splice(index, 1);
    }
  }
};

addButton.addEventListener("click", handleAddItem);
listElement.addEventListener("click", handleDeleteItem);

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleAddItem();
  }
});
