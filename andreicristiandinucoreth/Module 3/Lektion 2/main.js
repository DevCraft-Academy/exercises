const list = document.getElementsByTagName('ul')[0];
const input = document.getElementById('item');
const button = document.getElementsByTagName('button')[0];

const buttonClick = () => {
    const itemText = input.value;
    input.value = '';

    const newListItem = document.createElement('li');
    
    const newSpan = document.createElement('span');
    newSpan.innerText = itemText;
    newListItem.appendChild(newSpan)
    
    const newButton = document.createElement('button');
    newButton.innerText = 'Delete';
    newButton.addEventListener('click', () => list.removeChild(newLi));
    newListItem.appendChild(newButton)

    list.appendChild(newListItem);
}

button.addEventListener('click', buttonClick);