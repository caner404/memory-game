class GameSettingsView {
  _themeButtons = document.querySelectorAll(".menu__button--theme");
  _playerButtons = document.querySelectorAll(".menu__button--player");
  _gridButtons = document.querySelectorAll(".menu__button_grid");
  _startButton = document.querySelector(".menu__startButton");

  _controlSelectedButton(item, index, array) {
    item.addEventListener("click", function () {
      array.forEach((btn) => btn.classList.remove("btn--active"));
      item.classList.add("btn--active");
    });
  }

  getGameSettings() {
    const themeArray = Array.from(this._themeButtons);
    const playerCountArray = Array.from(this._playerButtons);
    const gridArray = Array.from(this._gridButtons);

    const selectedTheme = themeArray.find((btn) =>
      btn.classList.contains("btn--active")
    );

    const selectedPlayerCount = playerCountArray.find((btn) =>
      btn.classList.contains("btn--active")
    );

    const selectedGrid = gridArray.find((btn) =>
      btn.classList.contains("btn--active")
    );
    //get TextContent of Buttons and save in state
    const activetheme = selectedTheme.textContent;
    const playerCount = Number(selectedPlayerCount.textContent);
    const gridSize = Number(selectedGrid.dataset.gridSize);

    return {
      activetheme: activetheme,
      playerCount: playerCount,
      gridSize: gridSize,
    };
  }

  addHandlerRender(handler) {
    this._themeButtons.forEach(this._controlSelectedButton);
    this._playerButtons.forEach(this._controlSelectedButton);
    this._gridButtons.forEach(this._controlSelectedButton);
    this._startButton.addEventListener("click", handler);
  }
}

export default new GameSettingsView();
