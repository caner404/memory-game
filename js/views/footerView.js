class FooterView {
  _parentElement = document.querySelector("footer");
  timerInterval;

  generateMarkup(state) {
    return `<footer>
      ${
        state.playerCount > 1
          ? this.generateMarkupMultiplayer(state)
          : this.generateMarkupSingleplayer(state)
      }
  </footer>
  <div class="modal modal__end hidden">
    <div class="modal__buttons">
        <button class="button button__restart">Restart</button>
        <button class="button button__newgame">Setup New Game</button>
    </div>
  </div>
  <div class="overlay overlay__end hidden"></div>`;
  }

  generateMarkupMultiplayer(state) {
    let multiplayer = state.players.map((player) => {
      return `<div class="moves ${
        player.isCurrentPlayer ? "moves-bg--active" : ""
      }">
              <h2 class="moves__header ${
                player.isCurrentPlayer ? "moves-color--active" : ""
              }">Player ${player.playerNumber}</h2>
              <p class="moves__number ${
                player.isCurrentPlayer ? "moves-color--active" : ""
              }">${player.moves}</p>
              </div>`;
    });
    return multiplayer.join("");
  }

  generateMarkupSingleplayer(state) {
    return `
    <div class="timer">
      <h2 class="timer__header">Time</h2>
      <p class="timer__number">00:00</p>
    </div>
    <div class="moves">
      <h2 class="moves__header">Moves</h2>
      <p class="moves__number">${state.players[state.playerCount - 1].moves}</p>
    </div>`;
  }

  renderModalSinglePlayer() {
    const markup = `<h2 class="modal__header">You did it!</h2>
    <p class="modal__subheader">Game over! Here's how you got on...</p>
    <div class="modal__stats">
      <div class="timer modal__timer">
        <h2 class="timer__header">Time Elapsed</h2>
        <p class="timer__number modal__time">0</p>
      </div>
      <div class="moves modal__moves">
        <h2 class="moves__header">Moves taken</h2>
        <p class="moves__number modal__move">0</p>
      </div>
    </div>`;
    const modal = document.querySelector(".modal__end");
    modal.insertAdjacentHTML("afterbegin", markup);
  }

  renderModalMultiplayer(state) {
    const markup = `<h2 class="modal__header"></h2>
    <p class="modal__subheader">Game over! Here are the results...</p>
    <div class="modal__stats">
      ${state.players
        .map((player) => {
          return `<div class="moves modal__moves">
                  <h2 class="moves__header"></h2>
                  <p class="moves__number"></p>
                </div>`;
        })
        .join("")}`;
    const modal = document.querySelector(".modal__end");
    modal.insertAdjacentHTML("afterbegin", markup);
  }

  updateModalSinglePlayer(time, moves) {
    document.querySelector(".modal__time").textContent = time;
    document.querySelector(".modal__move").textContent = moves;
  }

  updateModalMultiplayer(playersSorted) {
    let isTie = false;
    const highestPlayer = playersSorted[0];
    const moves = document.querySelectorAll(".modal__moves");
    if (playersSorted[0].moves === playersSorted[1].moves) {
      document.querySelector(".modal__header").textContent = `It's a tie`;
      isTie = true;
    } else {
      document.querySelector(
        ".modal__header"
      ).textContent = `Player ${highestPlayer.playerNumber} wins!`;
      moves[0].classList.add("moves-bg--tie");
      moves[0].children[0].textContent = `Player ${highestPlayer.playerNumber} (Winner!)`;
      moves[0].children[0].classList.add("moves-color--active");
      moves[0].children[1].classList.add("moves-color--active");
    }
    let i = 0;
    moves.forEach((move) => {
      if (i <= playersSorted.length) {
        if (playersSorted[i].moves === highestPlayer.moves && isTie) {
          move.classList.add("moves-bg--tie");
          move.children[0].textContent = `Player ${playersSorted[i].playerNumber}(Winner!)`;
          move.children[0].classList.add("moves-color--active");
          move.children[1].classList.add("moves-color--active");
        } else {
          if (playersSorted[i] !== highestPlayer)
            move.children[0].textContent = `Player ${playersSorted[i].playerNumber}`;
        }
        move.children[1].textContent = `${playersSorted[i].moves} Pairs `;
        i++;
      }
    });
  }
  setMovesZero() {
    const movesNumber = document.querySelectorAll(".moves__number");
    movesNumber.forEach((moves) => {
      moves.textContent = "0";
    });
  }

  setTimerZero() {
    if (document.querySelector(".timer__number") != null) {
      document.querySelector(".timer__number").textContent = "00:00";
    }
  }

  getTimerElement() {
    return document.querySelector(".timer__number");
  }

  getTimer() {
    return document.querySelector(".timer__number").textContent;
  }

  leadingZero(number) {
    return number < 10 ? "0" + number : number;
  }

  startTimer() {
    let that = this;
    let seconds = 0;
    this.timerInterval = setInterval(() => {
      const timerEL = that.getTimerElement();
      if (timerEL != null) {
        seconds++;
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds - hrs * 3600) / 60);
        var secs = seconds % 60;
        timerEL.textContent = `${that.leadingZero(mins)}:${that.leadingZero(
          secs
        )}`;
      }
    }, 1000);
    return this.timerInterval;
  }

  getMovesCount() {
    return Number(document.querySelector(".moves__number").textContent) + 1;
  }

  updateMoveCounter() {
    const movesCounter = document.querySelector(".moves__number");
    movesCounter.textContent = Number(movesCounter.textContent) + 1;
  }

  updateModal(time, moves) {
    document.querySelector(".modal__time").textContent = time;
    document.querySelector(".modal__move").textContent = moves;
  }

  clearTimer() {
    clearInterval(this.timerInterval);
  }

  closeModal() {
    const modal = document.querySelector(".modal__end");
    const overlay = document.querySelector(".overlay__end");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  openModal() {
    const modal = document.querySelector(".modal__end");
    const overlay = document.querySelector(".overlay__end");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  updateMovesCurrentPlayer(currentPlayer) {
    const currentPlayerActives = document.querySelectorAll(
      ".moves-color--active"
    );
    currentPlayerActives.forEach((player) => {
      if (player.classList.contains("moves__number")) {
        player.textContent = Number(currentPlayer.moves);
      }
    });
  }

  changeNextPlayer() {
    const currentPlayer = document.querySelector(".moves-bg--active");
    currentPlayer.classList.remove("moves-bg--active");
    for (let i = 0; i < currentPlayer.children.length; i++) {
      currentPlayer.children[i].classList.remove("moves-color--active");
    }
    if (currentPlayer.nextElementSibling != null) {
      const nextPlayer = currentPlayer.nextElementSibling;
      nextPlayer.classList.add("moves-bg--active");
      for (let i = 0; i < currentPlayer.children.length; i++) {
        nextPlayer.children[i].classList.add("moves-color--active");
      }
    } else {
      //switch to first Player again
      const firstplayer = document.querySelector(".moves:first-child");
      firstplayer.classList.add("moves-bg--active");
      for (let i = 0; i < firstplayer.children.length; i++) {
        firstplayer.children[i].classList.add("moves-color--active");
      }
    }
  }

  resetActivePlayer() {
    const currentPlayer = document.querySelector(".moves-bg--active");
    currentPlayer.classList.remove("moves-bg--active");
    for (let i = 0; i < currentPlayer.children.length; i++) {
      currentPlayer.children[i].classList.remove("moves-color--active");
    }
    const firstplayer = document.querySelector(".moves:first-child");
    firstplayer.classList.add("moves-bg--active");
    for (let i = 0; i < firstplayer.children.length; i++) {
      firstplayer.children[i].classList.add("moves-color--active");
    }
  }
}
export default new FooterView();
