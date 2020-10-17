const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let cartas = cards.length;

//função para virar carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCards();
}

//função que desabilita as cartas
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  cartas -= 2;
  if (cartas == 0) {
    end();
  }
  resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
  card.addEventListener('click', flipCard)
});

function end() {
  setTimeout(() => {
    document.body.style.display = "block";
    document.body.innerHTML = '<h1 class="end">Fim de jogo</h1><h4 class="end end_sub">Reiniciando...</h4>';
    setTimeout(() => {
      window.location = "index.html";
    }, 1000);
  }, 1000);
}