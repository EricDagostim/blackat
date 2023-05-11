

const itemsArray = [];
const btnSave = document.querySelector('#btn-save');
btnSave.addEventListener('click', saveItem);


const inputElement = document.getElementById('inputItem');
inputElement.addEventListener('keydown', (event) => {
  if (event.code === 'Enter' || event.keyCode === 13) {
    event.preventDefault(); // previne a ação padrão de inserir uma nova linha
    saveItem(); // chama a função saveItem()
  }
});



function saveItem() {
  const inputElement = document.getElementById('inputItem');
  const item = inputElement.value.trim();

  // Verifica se o item já existe no array
  if (itemsArray.includes(item)) {
    const errorElement = document.getElementById("error-msg");
    errorElement.textContent = "Este item já foi adicionado!";
    setTimeout(() => {
      errorElement.textContent = "";
    }, 5000);
    return;
  }

  // Verifica se o item está vazio
  if (item === "") {
    const errorElement = document.getElementById("error-msg");
    errorElement.textContent = "O item não pode ser vazio!";
    setTimeout(() => {
      errorElement.textContent = "";
    }, 5000);
    return;
  }

  itemsArray.push(item);
  inputElement.value = "";

  renderItemList();
}

function renderItemList() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';
  
    itemsArray.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listElement.appendChild(li);
    });
  }


function spin() {
    if (items.length > 0) {
      let spinCount = Math.floor(Math.random() * items.length);
      let spinAngle = 360 / items.length * spinCount + 360 * 10;
      wheel.style.transform = `rotate(${spinAngle}deg)`;
      wheel.classList.add("rotating");
  
      setTimeout(() => {
        wheel.classList.remove("rotating");
        let result = items[spinCount];
        alert(`O item sorteado é: ${result}`);
      }, 7000);
    } else {
      alert("Você precisa adicionar pelo menos um item para sortear");
    }
  }
  