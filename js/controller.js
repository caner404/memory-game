import gameSettingsView from "./views/gameSettingsView.js";
import gameView from "./views/gameView.js";
import gameBoardView from "./views/gameBoardView.js";
import headerView from "./views/headerView.js";
import footerView from "./views/footerView.js";

import * as model from "./model.js";

const controlGameRender = function () {
  const gameSettings = gameSettingsView.getGameSettings();
  model.initGameState(gameSettings);
  gameView.render(model.state);
  if (model.isSinglePlayer()) {
    footerView.renderModalSinglePlayer();
    footerView.startTimer();
  } else {
    footerView.renderModalMultiplayer(model.state);
  }
  //init Handler for GameboardView

  headerView.addHandlerRestartGame(controlRestartGame);
  headerView.addHandlerNewGame(controlNewGame);
  headerView.addHandlerMenuMobileOpen(controlMenuOpen);
  headerView.addHandlerMenuMobileClose(controlMenuClose);
  gameBoardView.addGamePairHandler(controlGameLogic);
};

const controlRestartGame = function () {
  footerView.setMovesZero();
  footerView.setTimerZero();
  gameBoardView.resetGamePair();
  footerView.closeModal();
  headerView.closeModalMobile();
  model.reset();
  gameBoardView.update(model.state.gameArr);
  if (model.isSinglePlayer()) {
    footerView.clearTimer();
    footerView.startTimer();
  } else {
    footerView.resetActivePlayer();
  }
};

const controlNewGame = function () {
  location.reload();
};

const controlMenuOpen = function () {
  console.log("Hi Menu Modal Open");
  headerView.openModalMobile();
};

const controlMenuClose = function () {
  console.log("Hi Menu Modal Close");
  headerView.closeModalMobile();
};

const controlGameLogic = function (e) {
  e.stopPropagation();
  // Set the first Element in UI
  if (model.state.firstValue == null) {
    gameBoardView.showCircle(e.target);
    if (model.isNumbers()) {
      model.state.firstValue = gameBoardView.getNumberValue(e.target);
    } else {
      model.state.firstValue = gameBoardView.getIconValue(
        e.target,
        model.state.gameArr
      );
    }
    return;
  }
  // Set the second Element in UI
  if (model.state.secondValue == null) {
    gameBoardView.showCircle(e.target);
    if (model.isNumbers()) {
      model.state.secondValue = gameBoardView.getNumberValue(e.target);
    } else {
      model.state.secondValue = gameBoardView.getIconValue(
        e.target,
        model.state.gameArr
      );
    }
  }
  // values are not the same
  if (model.state.firstValue !== model.state.secondValue) {
    if (model.isNumbers()) {
      gameBoardView.removeCircles(
        model.state.firstValue,
        model.state.secondValue
      );
    } else {
      gameBoardView.removeCirclesIcons(
        model.state.firstValue,
        model.state.secondValue
      );
    }
    if (!model.isSinglePlayer()) {
      footerView.changeNextPlayer();
      model.changeNextPlayer();
    }
  } else {
    gameBoardView.circlesFound(model.state);
    model.removeCorrectValue();
    if (!model.isSinglePlayer()) {
      const currentPlayer = model.getCurrentPlayer();
      model.updateMovesForPlayer(currentPlayer);
      footerView.updateMovesCurrentPlayer(currentPlayer);
    }
    if (model.isGameOver()) {
      if (model.isSinglePlayer()) {
        model.state.time = footerView.getTimer();
        model.state.moves = footerView.getMovesCount();
        footerView.clearTimer();
        footerView.updateModalSinglePlayer(model.state.time, model.state.moves);
        footerView.openModal();
      } else {
        const playersSorted = model.getPlayerMovesSortedDesc();
        footerView.updateModalMultiplayer(playersSorted);
        footerView.openModal();
      }
    }
  }
  if (model.isSinglePlayer()) {
    footerView.updateMoveCounter();
  }
  model.resetPairValues();
};

const init = function () {
  gameSettingsView.addHandlerRender(controlGameRender);
};
init();
