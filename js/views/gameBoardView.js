class GameBoardView {
  _parentElement = document.querySelector(".game-board");

  generateMarkup(state) {
    return `<main class="game-board ${
      state.gridSize <= 16 ? "game-board--grid-16" : "game-board--grid-36"
    }">
      ${state.gameArr
        .map((gameContent) => {
          return `<div class="circle">
            <button class="circle__button ${
              state.gridSize <= 16
                ? "circle__button--large"
                : "circle__button--small"
            } "></button>
            <div class="circle__content ${
              state.gridSize <= 16
                ? "circle__content--large"
                : "circle__content--small"
            }">${
            state.theme === "Numbers"
              ? gameContent.value
              : `<i class='fa-solid ${gameContent.icon}'></i>`
          }</div>
          </div>`;
        })
        .join("")}
    </main>`;
  }
  addGamePairHandler(handler) {
    const gamePairs = document.querySelectorAll(".circle__button");
    gamePairs.forEach((circle) => circle.addEventListener("click", handler));
  }

  getNumberValue(targetEl) {
    return Number(targetEl.nextElementSibling.textContent);
  }

  getIconValue(targetEl, gameArr) {
    return gameArr.find((el) => {
      if (
        targetEl.nextElementSibling.childNodes[0].classList.contains(el.icon)
      ) {
        return el;
      }
    });
  }

  showCircle(targetEl) {
    targetEl.classList.add("circle__button--hidden");
    targetEl.nextElementSibling.classList.add("circle__content--active");
  }

  circlesFound(state) {
    let gamePairs = document.querySelectorAll(".circle__button");
    if (state.theme === "Numbers") {
      gamePairs.forEach((circles) => {
        let circleContent = circles.nextElementSibling;
        let circleContentElement = Number(circleContent.textContent);
        if (circleContentElement === state.firstValue) {
          circleContent.classList.remove("circle__content--active");
          circleContent.classList.add("circle__content--found");
        }
      });
    } else {
      const foundIcon = state.gameArr.find((el) => el === state.firstValue);
      gamePairs.forEach((circles) => {
        let circleContent = circles.nextElementSibling;
        if (circleContent.childNodes[0].classList.contains(foundIcon.icon)) {
          circleContent.classList.remove("circle__content--active");
          circleContent.classList.add("circle__content--found");
        }
      });
    }
  }

  removeCircles(firstValue, secondValue) {
    setTimeout(function () {
      const gamePairs = document.querySelectorAll(".circle__button");
      gamePairs.forEach((circles) => {
        let circleContent = circles.nextElementSibling;
        let circleContentElement = Number(circleContent.textContent);
        if (
          circleContentElement === firstValue ||
          circleContentElement === secondValue
        ) {
          circles.classList.remove("circle__button--hidden");
          circleContent.classList.remove("circle__content--active");
        }
      });
    }, 1000);
  }
  removeCirclesIcons(firstValue, secondValue) {
    setTimeout(function () {
      const gamePairs = document.querySelectorAll(".circle__button");
      gamePairs.forEach((circles) => {
        let circleContent = circles.nextElementSibling;
        if (
          circleContent.childNodes[0].classList.contains(firstValue.icon) ||
          circleContent.childNodes[0].classList.contains(secondValue.icon)
        ) {
          circles.classList.remove("circle__button--hidden");
          circleContent.classList.remove("circle__content--active");
        }
      });
    }, 1000);
  }

  resetGamePair() {
    const gamePairs = document.querySelectorAll(".circle__button");
    gamePairs.forEach((circles) => {
      circles.classList.remove("circle__button--hidden");
      circles.nextElementSibling.classList.remove("circle__content--active");
      circles.nextElementSibling.classList.remove("circle__content--found");
    });
  }

  update(gameArr) {
    const gamePairs = document.querySelectorAll(".circle__button");
    let i = 0;
    gamePairs.forEach((circles) => {
      circles.nextElementSibling.textContent = gameArr[i].value;
      i++;
    });
  }
}

export default new GameBoardView();
