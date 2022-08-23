class RecipeView {
  _restartButtons = null;
  _newGameButtons = null;
  _parentElement = document.querySelector("header");

  generateMarkup(state) {
    return `<header>
    <h1 class="gamename">memory</h1>
    <div class="buttons">
      <button class="buttons__restart">Restart</button>
      <button class="buttons__newgame">New Game</button>
    </div>
  </header>`;
  }

  addHandlerRestartGame(handler) {
    this._restartButtons = document.querySelectorAll(".buttons__restart");
    this._restartButtons.forEach((btn) =>
      btn.addEventListener("click", handler)
    );
  }

  addHandlerNewGame(handler) {
    this._newGameButtons = document.querySelectorAll(".buttons__newgame");
    this._newGameButtons.forEach((btn) =>
      btn.addEventListener("click", handler)
    );
  }
}
export default new RecipeView();
