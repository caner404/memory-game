const gameContentArr = [
  {
    value: 1,
    icon: "fa-futbol",
  },
  {
    value: 2,
    icon: "fa-anchor",
  },
  {
    value: 3,
    icon: "fa-atom",
  },
  {
    value: 4,
    icon: "fa-sun",
  },
  {
    value: 5,
    icon: "fa-hand",
  },
  {
    value: 6,
    icon: "fa-moon",
  },
  {
    value: 7,
    icon: "fa-bug",
  },
  {
    value: 8,
    icon: "fa-snowflake",
  },
  {
    value: 9,
    icon: "fa-turkish-lira-sign",
  },
  {
    value: 10,
    icon: "fa-car",
  },
  {
    value: 11,
    icon: "fa-peace",
  },
  {
    value: 12,
    icon: "fa-globe",
  },
  {
    value: 13,
    icon: "fa-bell",
  },
  {
    value: 14,
    icon: "fa-cloud",
  },
  {
    value: 15,
    icon: "fa-diamond",
  },
  {
    value: 16,
    icon: "fa-egg",
  },
  {
    value: 17,
    icon: "fa-headphones",
  },
  {
    value: 18,
    icon: "fa-reddit",
  },
];

export const state = {
  theme: "",
  playerCount: 0,
  gridSize: 0,
  firstValue: null,
  secondValue: null,
  gameArr: [],
  players: [],
  time: "",
};

const initgamePairs = function () {
  //init gameArray with value pairs and icons
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < state.gridSize / 2; i++) {
      state.gameArr.push(gameContentArr[i]);
    }
  }

  // shuffle gameArray
  state.gameArr = state.gameArr
    .map((gameContent) => ({ gameContent, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ gameContent }) => gameContent);

  //init players equal to playerCount
  for (let i = 0; i < state.playerCount; i++) {
    state.players.push({
      moves: 0,
      playerNumber: i + 1,
      isCurrentPlayer: false,
    });
  }
  state.players[0].isCurrentPlayer = true;
  console.log(state);
};

export const initGameState = function (gameSettings) {
  state.theme = gameSettings.activetheme;
  state.playerCount = gameSettings.playerCount;
  state.gridSize = gameSettings.gridSize;
  initgamePairs();
};

export const removeCorrectValue = function () {
  //can be firstValue or secondValue (same number,icon)
  state.gameArr = state.gameArr.filter((el) => {
    if (isNumbers()) {
      return el.value !== state.firstValue;
    } else {
      return el !== state.firstValue;
    }
  });
};

export const isSinglePlayer = function () {
  return state.playerCount === 1;
};

export const isNumbers = function () {
  return state.theme === "Numbers";
};

export const reset = function () {
  initgamePairs();
};

export const resetPairValues = function () {
  state.firstValue = null;
  state.secondValue = null;
};

export const getCurrentPlayer = function () {
  return state.players.find((player) => player.isCurrentPlayer === true);
};

export const changeNextPlayer = function () {
  let nextPlayer;
  const currentPlayer = getCurrentPlayer();
  const isHighestPlayerNumber = state.players.find(
    (player) => player.playerNumber === state.playerCount
  );
  if (currentPlayer.playerNumber >= isHighestPlayerNumber.playerNumber) {
    nextPlayer = state.players[0];
  } else {
    nextPlayer = state.players.find((player) => {
      let nextNumber = currentPlayer.playerNumber + 1;
      if (player.playerNumber === nextNumber) return player;
    });
  }
  nextPlayer.isCurrentPlayer = true;
  currentPlayer.isCurrentPlayer = false;
};

export const updateMovesForPlayer = function (currentPlayer) {
  currentPlayer.moves = currentPlayer.moves + 1;
};

export const isGameOver = function () {
  return state.gameArr.length <= 0;
};

export const getPlayerMovesSortedDesc = function () {
  return state.players
    .sort((a, b) => b.moves - a.moves)
    .map((player) => player);
};
