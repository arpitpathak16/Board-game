// board.js - Game board generation and space interactions

import gameData from "./data.js";

class GameBoard {
  constructor() {
    this.boardSpaces = gameData.boardSpaces;
    this.players = [];
    this.currentPlayerIndex = 0;
    this.domElements = {
      board: document.getElementById("game-board"),
      playerList: document.getElementById("player-list"),
      dice: document.getElementById("dice"),
      turnStatus: document.getElementById("turn-status"),
      moveStatus: document.getElementById("move-status"),
    };
  }

  // Initialize the game board
  init(players) {
    this.players = players;
    this.renderBoard();
    this.renderPlayerList();
    this.updateTurnStatus();
  }

  // Render the game board spaces
  renderBoard() {
    this.domElements.board.innerHTML = "";

    // Create a container for the board spaces
    const boardContainer = document.createElement("div");
    boardContainer.className = "board-container2";

    // Generate each space on the board
    this.boardSpaces.forEach((space) => {
      const spaceElement = document.createElement("div");
      spaceElement.className = `board-space space-${space.type}`;
      spaceElement.dataset.position = space.position;

      //   // Add space number
      //   const spaceNumber = document.createElement("span");
      //   spaceNumber.className = "space-number";
      //   spaceNumber.textContent = space.position + 1;
      //   spaceElement.appendChild(spaceNumber);

      //   // Add special instructions if they exist
      //   if (space.instruction) {
      //     const instruction = document.createElement("span");
      //     instruction.className = "space-instruction";
      //     instruction.textContent = space.instruction;
      //     spaceElement.appendChild(instruction);
      //   }

      boardContainer.appendChild(spaceElement);
    });

    this.domElements.board.appendChild(boardContainer);

    // Position the spaces
    this.positionSpaces();

    // Render player tokens
    this.renderPlayerTokens();
  }

  // Position spaces
  positionSpaces() {
    const spaces = document.querySelectorAll(".board-space");
    const centerX = this.domElements.board.offsetWidth / 2;
    const centerY = this.domElements.board.offsetHeight / 2;

    /*
        Game Board Dimensions: 804 x 623
        Game Board Aspect Ratio: 1.290529695024077
    */

    // list of positions hardcoded
    let positions = [
      {
        x: 82,
        y: 598.21875,
      },
      {
        x: 111,
        y: 559.21875,
      },
      {
        x: 155,
        y: 520.21875,
      },
      {
        x: 154,
        y: 471.21875,
      },
      {
        x: 146,
        y: 413.21875,
      },
      {
        x: 164,
        y: 368.21875,
      },
      {
        x: 137,
        y: 330.21875,
      },
      {
        x: 113,
        y: 300.21875,
      },
      {
        x: 136,
        y: 272.21875,
      },
      {
        x: 159,
        y: 249.21875,
      },
      {
        x: 186,
        y: 223.21875,
      },
      {
        x: 235,
        y: 213.21875,
      },
      {
        x: 283,
        y: 223.21875,
      },
      {
        x: 280,
        y: 271.21875,
      },
      {
        x: 275,
        y: 311.21875,
      },
      {
        x: 267,
        y: 348.21875,
      },
      {
        x: 292,
        y: 378.21875,
      },
      {
        x: 314,
        y: 416.21875,
      },
      {
        x: 346,
        y: 457.21875,
      },
      {
        x: 345,
        y: 495.21875,
      },
      {
        x: 322,
        y: 536.21875,
      },
      {
        x: 345,
        y: 572.21875,
      },
      {
        x: 402,
        y: 575.21875,
      },
      {
        x: 462,
        y: 554.21875,
      },
      {
        x: 507,
        y: 520.21875,
      },
      {
        x: 535,
        y: 472.21875,
      },
      {
        x: 504,
        y: 443.21875,
      },
      {
        x: 490,
        y: 413.21875,
      },
      {
        x: 477,
        y: 383.21875,
      },
      {
        x: 453,
        y: 354.21875,
      },
      {
        x: 420,
        y: 338.21875,
      },
      {
        x: 397,
        y: 316.21875,
      },
      {
        x: 384,
        y: 284.21875,
      },
      {
        x: 406,
        y: 261.21875,
      },
      {
        x: 447,
        y: 252.21875,
      },
      {
        x: 493,
        y: 247.21875,
      },
      {
        x: 515,
        y: 224.21875,
      },
      {
        x: 506,
        y: 191.21875,
      },
      {
        x: 482,
        y: 161.21875,
      },
      {
        x: 457,
        y: 127.21875,
      },
      {
        x: 482,
        y: 108.21875,
      },
      {
        x: 516,
        y: 121.21875,
      },
      {
        x: 535,
        y: 161.21875,
      },
      {
        x: 562,
        y: 203.21875,
      },
      {
        x: 563,
        y: 243.21875,
      },
      {
        x: 564,
        y: 283.21875,
      },
      {
        x: 572,
        y: 313.21875,
      },
      {
        x: 572,
        y: 343.21875,
      },
      {
        x: 579,
        y: 383.21875,
      },
      {
        x: 596,
        y: 418.21875,
      },
      {
        x: 635,
        y: 410.21875,
      },
      {
        x: 659,
        y: 373.21875,
      },
      {
        x: 652,
        y: 330.21875,
      },
      {
        x: 638,
        y: 291.21875,
      },
      {
        x: 645,
        y: 249.21875,
      },
      {
        x: 685,
        y: 254.21875,
      },
      {
        x: 707,
        y: 296.21875,
      },
      {
        x: 717,
        y: 335.21875,
      },
      {
        x: 710,
        y: 378.21875,
      },
      {
        x: 695,
        y: 418.21875,
      },
      {
        x: 669,
        y: 451.21875,
      },
      {
        x: 640,
        y: 473.21875,
      },
      {
        x: 630,
        y: 518.21875,
      },
      {
        x: 652,
        y: 565.21875,
      },
      {
        x: 700,
        y: 574.21875,
      },
      {
        x: 744,
        y: 548.21875,
      },
      {
        x: 755,
        y: 478.21875,
      },
    ];

    // normalize the positions for 1x1 board
    positions = positions.map((position) => {
      return {
        // x: position.x,
        // y: position.y,
        x: position.x / 804,
        y: position.y / 623,
      };
    });

    let boardWidth = 804;
    let boardHeight = 623;

    // get dimensions of the board
    if (document.querySelector(".game-board")?.offsetWidth) {
      boardWidth = document.querySelector(".game-board").offsetWidth;
      boardHeight = document.querySelector(".game-board").offsetHeight;
      console.log("Board dimensions:", boardWidth, boardHeight);
    }

    spaces.forEach((space, index) => {
      let x = positions[index].x;
      let y = positions[index].y;

      // scale x,y to fit the board
      x = x * boardWidth;
      y = y * boardHeight;

      space.style.position = "absolute";
      space.style.left = `${x}px`;
      space.style.top = `${y}px`;

      // center self
      space.style.transform = "translate(-50%, -50%)";
    });

    console.log("Board spaces positioned.");
  }

  // Render player tokens on the board
  renderPlayerTokens() {
    this.players.forEach((player) => {
      const token = document.createElement("div");
      token.className = "player-token";
      token.style.backgroundColor = player.color;
      token.dataset.playerId = player.id;
      token.title = player.name;

      // Position the token on its current space
      this.positionToken(token, player.position);

      this.domElements.board.appendChild(token);
    });
  }

  // Position a token on a specific space
  positionToken(token, spacePosition) {
    const space = document.querySelector(
      `.board-space[data-position="${spacePosition}"]`
    );
    if (space) {
      const spaceRect = space.getBoundingClientRect();
      const boardRect = this.domElements.board.getBoundingClientRect();

      if (boardRect.width === 0 || boardRect.height === 0) {
        return;
      }

      // Position token relative to the board
      token.style.left = `${
        spaceRect.left - boardRect.left + spaceRect.width / 2 - 15
      }px`;
      token.style.top = `${
        spaceRect.top - boardRect.top + spaceRect.height / 2 - 15
      }px`;
    }
  }

  animateTokenMovement(token, startPosition, endPosition, duration) {
    const positionTokenHelper = (token, positions, posIndex) => {
      this.positionToken(token, positions[posIndex]);
      setTimeout(() => {
        if (posIndex < positions.length - 1) {
          positionTokenHelper(token, positions, posIndex + 1);
        }
      }, duration);
    };
    const positions = []; // range from startPosition to endPosition
    if (startPosition < endPosition) {
      for (let i = startPosition; i <= endPosition; i++) {
        positions.push(i);
      }
    } else {
      for (let i = startPosition; i >= endPosition; i--) {
        positions.push(i);
      }
    }
    // animate the token movement
    positionTokenHelper(token, positions, 0);
  }

  // Update player positions on the board
  updatePlayerPosition(player, newPosition, animate = true) {
    const playerId = player.id;
    console.log("Updating player position:", playerId, newPosition);
    const token = document.querySelector(
      `.player-token[data-player-id="${playerId}"]`
    );
    if (token) {
      if (animate) {
        this.animateTokenMovement(token, player.position, newPosition, 500);
      } else {
        this.positionToken(token, newPosition);
      }
    }
  }

  // Render the player list in the sidebar
  renderPlayerList() {
    this.domElements.playerList.innerHTML = "";

    this.players.forEach((player, index) => {
      const playerItem = document.createElement("div");
      playerItem.className = `player-item ${
        index === this.currentPlayerIndex ? "active" : ""
      }`;

      const playerColor = document.createElement("div");
      playerColor.className = "player-color";
      playerColor.style.backgroundColor = player.color;

      const playerDetails = document.createElement("div");
      playerDetails.className = "player-details";

      const playerName = document.createElement("div");
      playerName.className = "player-name";
      playerName.textContent = player.name;

      const playerPosition = document.createElement("div");
      playerPosition.className = "player-position";
      playerPosition.textContent = `Position: ${player.position}`;

      playerDetails.appendChild(playerName);
      playerDetails.appendChild(playerPosition);
      playerItem.appendChild(playerColor);
      playerItem.appendChild(playerDetails);

      this.domElements.playerList.appendChild(playerItem);
    });
  }

  // Update the turn status display
  updateTurnStatus() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    this.domElements.turnStatus.textContent = `${currentPlayer.name}'s turn`;
    this.domElements.moveStatus.textContent = "";

    // Highlight current player in the list
    document.querySelectorAll(".player-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelectorAll(".player-item")
      [this.currentPlayerIndex].classList.add("active");
  }

  // Update move status message
  updateMoveStatus(message) {
    this.domElements.moveStatus.textContent = message;
  }

  // Animate dice roll
  animateDiceRoll(value) {
    this.domElements.dice.classList.add("rolling");
    this.domElements.dice.innerHTML = `<div class="dice-face">${value}</div>`;

    setTimeout(() => {
      this.domElements.dice.classList.remove("rolling");
    }, 800);
  }

  // Handle landing on a space
  handleLanding(player, space) {
    console.log("Handling landing on space:", player, space);
    switch (space.type) {
      case "question":
        return this.handleQuestionSpace(player, space);
      case "surprise":
        return this.handleSurpriseSpace(player, space);
      case "instruction":
        return this.handleInstructionSpace(player, space);
      default:
        return {
          message: `${player.name} landed on space ${space.position}`,
        };
    }
  }

  // Handle question space
  handleQuestionSpace(player, space) {
    // Get a random question card
    const randomIndex = Math.floor(
      Math.random() * gameData.questionCards.length
    );
    const questionCard = gameData.questionCards[randomIndex];

    return {
      type: "question",
      ...questionCard,
      player: player,
      message: `${player.name} landed on a question space! Answer correctly to roll again.`,
    };
  }

  // Handle surprise space
  handleSurpriseSpace(player, space) {
    // Get a random surprise card
    const randomIndex = Math.floor(
      Math.random() * gameData.surpriseCards.length
    );
    const surpriseCard = gameData.surpriseCards[randomIndex];

    return {
      type: "surprise",
      text: surpriseCard.text,
      effect: surpriseCard.effect,
      player: player,
      message: `${player.name} landed on a surprise space! ${surpriseCard.text}`,
    };
  }

  // Handle instruction space
  handleInstructionSpace(player, space) {
    let effect = {};
    let message = space.instruction;

    if (space.move) {
      effect.move = space.move;
      message += ` ${player.name} ${
        space.move > 0 ? "advances" : "goes back"
      } ${Math.abs(space.move)} spaces.`;
    }

    if (space.skipTurn) {
      effect.skipTurn = true;
      message += ` ${player.name} loses a turn.`;
    }

    if (space.moveTo) {
      effect.moveTo = space.moveTo;
      message += ` ${player.name} moves to space ${space.moveTo + 1}.`;
    }

    if (space.extraTurn) {
      effect.extraTurn = true;
      // add a newline character
      // message += `\n`;

      // message += `${player.name} gets an extra turn!`;
    }

    return {
      type: "instruction",
      effect: effect,
      player: player,
      message: message,
    };
  }

  // Advance to next player's turn
  nextTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    this.renderPlayerList();
    this.updateTurnStatus();
    return this.players[this.currentPlayerIndex];
  }
}

// Export the GameBoard class
export default GameBoard;
