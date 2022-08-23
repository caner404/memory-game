import headerView from "./headerView.js";
import gameBoardView from "./gameBoardView.js";
import footerView from "./footerView.js";

class GameView {
  _views = [headerView, gameBoardView, footerView];

  render(state) {
    let markup = `<div class="container-gameboard container-gameboard--active">`;
    markup += this._views.map((view) => view.generateMarkup(state)).join(``);
    markup += `</div>`;
    document.querySelector("body").innerHTML = "";
    document.querySelector("body").style.backgroundColor = "#fcfcfc";
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  }
}

export default new GameView();
