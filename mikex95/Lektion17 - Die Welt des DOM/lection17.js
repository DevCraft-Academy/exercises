// element acces
let ul = document.getElementsByTagName("ul")[0];
const input = document.getElementsByTagName("input")[0];
const buttonEl = document.getElementsByTagName("button")[0];

buttonEl.addEventListener("click", (e) => {
  let inputValue = input.value;

  // create
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");

  // append
  li.appendChild(span);
  li.appendChild(delBtn);

  span.textContent = inputValue;
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", (e) => {
    li.remove();
  });

  ul.appendChild(li);

  input.value = "";
  input.focus();
});
