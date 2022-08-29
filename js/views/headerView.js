class RecipeView {
  _restartButtons = null;
  _newGameButtons = null;
  _menuMobileButton = null;
  _menuMobileResumeButton = null;
  _parentElement = document.querySelector("header");

  generateMarkup(state) {
    return `<header>
    <h1 class="gamename">memory</h1>
    <div class="buttons">
      <button class="button button__restart button--hide">Restart</button>
      <button class="button button__newgame button--hide">New Game</button>
    </div>
    <button class="button button__menu">Menu</button>
    <div class="modal modal__mobile hidden">
        <button class="button button__restart">Restart</button>
        <button class="button button__newgame">New Game</button>
        <button class="button button__resume">Resume Game</button>
    </div>
    <div class="overlay overlay__mobile hidden"></div>
  </header>`;
  }

  addHandlerRestartGame(handler) {
    this._restartButtons = document.querySelectorAll(".button__restart");
    this._restartButtons.forEach((btn) =>
      btn.addEventListener("click", handler)
    );
  }

  addHandlerNewGame(handler) {
    this._newGameButtons = document.querySelectorAll(".button__newgame");
    this._newGameButtons.forEach((btn) =>
      btn.addEventListener("click", handler)
    );
  }

  addHandlerMenuMobileOpen(handlerOpen) {
    this._menuMobileButton = document.querySelector(".button__menu");
    this._menuMobileButton.addEventListener("click", handlerOpen);
  }

  addHandlerMenuMobileClose(handlerclose) {
    this._menuMobileResumeButton = document.querySelector(".button__resume");
    const overlay__mobile = document.querySelector(".overlay__mobile");
    this._menuMobileResumeButton.addEventListener("click", handlerclose);
    overlay__mobile.addEventListener("click", handlerclose);
  }

  openModalMobile() {
    const modal__mobile = document.querySelector(".modal__mobile");
    const overlay__mobile = document.querySelector(".overlay__mobile");
    modal__mobile.classList.remove("hidden");
    overlay__mobile.classList.remove("hidden");
  }

  closeModalMobile() {
    const modal__mobile = document.querySelector(".modal__mobile");
    const overlay__mobile = document.querySelector(".overlay__mobile");
    modal__mobile.classList.add("hidden");
    overlay__mobile.classList.add("hidden");
  }
}
export default new RecipeView();
