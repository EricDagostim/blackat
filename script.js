// Array para armazenar os itens
const itemsArray = [];

// Referências aos elementos do DOM
const btnSave = document.querySelector('#btn-save');
const btnRandom = document.getElementById('btn-random');
const inputElement = document.getElementById('inputItem');
const itemList = document.getElementById('item-list');
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Adiciona o listener do botão "Salvar"
btnSave.addEventListener('click', saveItem);

// Adiciona o listener do botão "Sortear"
btnRandom.addEventListener('click', startSlide);

// Adiciona o listener da tecla "Enter" no campo de input
inputElement.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    saveItem();
  }
});

// Função para salvar um item na lista
function saveItem() {
  // Obtém o valor do input e remove espaços em branco no início e no fim
  const item = inputElement.value.trim();

  // Verifica se o item já existe no array
  if (itemsArray.includes(item)) {
    const labelElement = document.getElementById("text-label");
    const errorElement = document.getElementById("error-msg");
    labelElement.textContent = "";
    errorElement.textContent = "Este item já foi adicionado!";
    setTimeout(() => {
      errorElement.textContent = "";
      labelElement.textContent = "Digite um item:";
    }, 3500);
    return;
  }

  // Verifica se o item está vazio
  if (item === "") {
    const errorElement = document.getElementById("error-msg");
    const labelElement = document.getElementById("text-label");
    labelElement.textContent = "";
    errorElement.textContent = "O item não pode ser vazio!";
    setTimeout(() => {
      errorElement.textContent = "";
      labelElement.textContent = "Digite um item:";
    }, 3500);
    return;
  }

  // Adiciona o item no array e limpa o input
  itemsArray.push(item);
  inputElement.value = "";

  // Renderiza a lista de itens
  renderItemList();
}

// Função para renderizar a lista de itens
function renderItemList() {
  // Limpa a lista
  itemList.innerHTML = "";


  

  for (let i = itemsArray.length; i > 0; i--){
    console.log(i)
    const item = itemsArray[i - 1];
    const li = document.createElement('li');
    li.textContent = i   +  " - " + item;
    itemList.appendChild(li);

    // Adiciona um botão de remoção para cada item
    const removeBtn = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add("fa-solid", "fa-xmark");
    
    removeBtn.appendChild(icon);
    
    removeBtn.addEventListener('click', function() {
      removeItem(i - 1);
    });
    li.appendChild(removeBtn);
  }
}

// Função para remover um item da lista
function removeItem(index) {
  itemsArray.splice(index, 1);
  renderItemList();
}



// Função para iniciar o slide
function startSlide() {

  const winnerIndex = Math.floor(Math.random() * itemsArray.length);
  
  const winner = document.getElementById('winner');
  winner.textContent = itemsArray[winnerIndex];

  
     
 
}
