const itemsArray = [];
const btnSave = document.querySelector('#btn-save');
btnSave.addEventListener('click', saveItem);

const btnRandom = document.getElementById('btn-random');
btnRandom.addEventListener('click', function() {
  startSlide(document.querySelector('#slide-item-list'));
});


const inputElement = document.getElementById('inputItem');
inputElement.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    saveItem();
  }
});

function saveItem() {
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
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = "";

  for (let i = 0; i < itemsArray.length; i++) {
    const item = itemsArray[i];
    const li = document.createElement('li');
    li.textContent = item;
    itemList.appendChild(li);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "X";
    removeBtn.addEventListener('click', function() {
      removeItem(i);
    });
    li.appendChild(removeBtn);
  }
}

function removeItem(index) {
  itemsArray.splice(index, 1);
  renderItemList();
}

function startSlide() {
  const slide = document.getElementsById('slide');
  const items = slide.getElementById('slide-item-list li');


  const slideWidth = slide.offsetWidth;

  let currentPosition = 0;
  let cycleCount = 0;
  let isAnimating = false;
  let winnerIndex = null;

  const slideInterval = setInterval(() => {
    if (!isAnimating) {
      isAnimating = true;
      cycleCount++;

      currentPosition -= slideWidth / 3;

      slide.style.transform = `translateX(${currentPosition}px)`;

      const firstItem = items[0];
      const firstItemWidth = firstItem.offsetWidth;

      if (currentPosition <= -firstItemWidth) {
        slide.appendChild(firstItem);
        slide.style.transition = 'none';
        slide.style.transform = 'translateX(0)';
        currentPosition += firstItemWidth;
        setTimeout(() => {
          slide.style.transition = 'transform 0.3s';
          isAnimating = false;
        }, 50);
      } else {
        setTimeout(() => {
          isAnimating = false;
        }, 50);
      }
    } else if (cycleCount >= 20) {
      clearInterval(slideInterval);
      slide.style.transition = 'transform 0.5s ease-out';
      slide.style.transform = `translateX(${currentPosition + slideWidth / 6}px)`;
      slide.addEventListener('transitionend', () => {
        winnerIndex = Math.floor(items.length / 2);
        const winner = items[winnerIndex];
        alert(`O item sorteado é: ${winner.textContent}`);
      }, { once: true });
    }
  }, 500);
}
