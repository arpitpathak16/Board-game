// game.js - Core game logic and state management

import GameBoard from "./board.js";
import gameData from "./data.js";

class RisklandGame {
  constructor() {
    this.board = new GameBoard();
    this.players = [];
    this.currentPlayer = null;
    this.gameState = "setup"; // setup, playing, paused, gameOver
    this.diceValue = 1;
    this.selectedHazard = "all";
    this.difficulty = "medium";
    this.turnHistory = [];
  }

  // Initialize a new game with players and options
  initGame(players, options = {}) {
    // add event listeners to game-board. on click console.log x and y wrt the box
    window.positions = [];
    const board = document.getElementById("game-board");
    board.addEventListener("click", (event) => {
      const rect = board.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log({ x, y });
      window.positions.push({ x, y });
      // log game-board dimensions and aspect ratio
      const boardWidth = board.offsetWidth;
      const boardHeight = board.offsetHeight;
      const aspectRatio = boardWidth / boardHeight;
      console.log(`Game Board Dimensions: ${boardWidth} x ${boardHeight}`);
      console.log(`Game Board Aspect Ratio: ${aspectRatio}`);
    });

    this.players = players.map((player, index) => ({
      id: index + 1,
      name: player.name,
      color: player.color,
      position: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      cardsDrawn: 0,
      isActive: true,
    }));

    this.selectedHazard = options.hazardFocus || "all";
    this.difficulty = options.difficulty || "medium";
    this.gameState = "playing";
    this.currentPlayer = this.players[0];
    this.turnHistory = [];

    // Filter questions based on selected hazard if not 'all'
    if (this.selectedHazard !== "all") {
      gameData.questionCards = gameData.questionCards.filter(
        (card) => card.hazard === this.selectedHazard
      );
    }

    // Initialize the board with players
    this.board.init(this.players);

    console.log("Game initialized with players:", this.players);
  }

  removeTokenTransition() {
    // .player-token
    const tokens = document.querySelectorAll(".player-token");
    tokens.forEach((token) => {
      token.style.transition = "none";
    });
  }

  addTokenTransition() {
    // .player-token
    const tokens = document.querySelectorAll(".player-token");
    tokens.forEach((token) => {
      token.style.transition = "all 0.5s ease";
    });
  }

  repositionTokens() {
    if (document.querySelector(".game-board")?.offsetWidth) {
      //   this.removeTokenTransition();

      console.log("Repositioning tokens on the board.");
      this.board.positionSpaces();
      //   this.addTokenTransition();

      this.players.forEach((player) => {
        const position = player.position;
        this.board.updatePlayerPosition(player, position, false);
      });
    }
  }

  // Roll the dice and move the current player
  rollDice() {
    if (this.gameState !== "playing") return;

    // Roll a 6-sided die
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    // this.diceValue = 1; // For testing purposes, always roll a 1
    this.board.animateDiceRoll(this.diceValue);

    // Calculate new position
    const currentPosition = this.currentPlayer.position;
    let newPosition = currentPosition + this.diceValue;
    const boardSize = gameData.boardSpaces.length - 1; // 0-64

    console.log(
      `Current Position: ${currentPosition}, Dice Roll: ${this.diceValue}, New Position: ${newPosition}`
    );

    // Handle overshooting the finish line
    if (newPosition > boardSize) {
      const overshoot = newPosition - boardSize;
      newPosition = boardSize - overshoot;
      this.board.updateMoveStatus(
        `${this.currentPlayer.name} overshot the finish by ${overshoot} and moves back!`
      );
    }

    // Update player position
    this.board.updatePlayerPosition(this.currentPlayer, newPosition);
    this.currentPlayer.position = newPosition;

    // Record the move
    this.turnHistory.push({
      player: this.currentPlayer.name,
      diceRoll: this.diceValue,
      from: currentPosition,
      to: newPosition,
      spaceType: gameData.boardSpaces[newPosition].type,
    });

    // Check for win condition
    if (newPosition === boardSize) {
      return this.handleGameOver();
    }

    // Handle the space the player landed on
    const currentSpace = gameData.boardSpaces[newPosition];
    return this.board.handleLanding(this.currentPlayer, currentSpace);
  }

  // Handle player answering a question
  answerQuestion(playerId, answerIndex, questionData) {
    if (this.gameState !== "playing") return;
    if (playerId !== this.currentPlayer.id) return;

    const isCorrect = answerIndex === questionData.correctAnswer;
    const player = this.players.find((p) => p.id === playerId);

    if (isCorrect) {
      player.correctAnswers++;
      player.score += 10;
      this.board.updateMoveStatus(
        `${player.name} answered correctly! ${questionData.explanation}`
      );
      return {
        player,
        correct: true,
        explanation: questionData.explanation,
        effect: questionData.trueEffect,
      };
    } else {
      player.wrongAnswers++;
      this.board.updateMoveStatus(
        `${player.name} answered incorrectly. The correct answer was: ${questionData.explanation}`
      );
      return {
        player,
        correct: false,
        explanation: questionData.explanation,
        effect: questionData.falseEffect,
      };
    }
  }

  // Apply card effects to the game
  applyCardEffect(result, doAction = true) {
    if (!result) return;

    const effect = result.effect;
    if (!effect) return;

    // // TODO: check if effect is already applied
    // if (effect.done) {
    //     console.log("Effect already applied:", effect);
    //     return;
    // }

    if (doAction) {
      console.log("Applying card effect:", effect);
    }

    const player = result.player;
    let message = "";

    if (effect.move) {
      message = `${player.name} ${
        effect.move > 0 ? "advances" : "goes back"
      } ${Math.abs(effect.move)} spaces.`;

      if (doAction) {
        let newPosition = player.position + effect.move;

        // Ensure position stays within bounds
        newPosition = Math.max(
          0,
          Math.min(newPosition, gameData.boardSpaces.length - 1)
        );

        this.board.updatePlayerPosition(player, newPosition);
        player.position = newPosition;

        // Check for win condition after move
        if (newPosition === gameData.boardSpaces.length - 1) {
          return this.handleGameOver();
        }
        // After moving, if the new space is special, process its landing effect
        const landedSpace = gameData.boardSpaces[newPosition];
        if (
          landedSpace.type !== "normal" &&
          landedSpace.type !== "start" &&
          landedSpace.type !== "finish"
        ) {
          // Automatically process the effect of the space
          return this.board.handleLanding(player, landedSpace);
        }
      }
      player.extraTurn = false; // Reset extra turn flag
    }

    if (effect.moveTo) {
      message = `${player.name} moves to space ${effect.moveTo + 1}.`;
      if (doAction) {
        this.board.updatePlayerPosition(player, effect.moveTo, false); // false to avoid step animation
        player.position = effect.moveTo;
      }
      player.extraTurn = false; // Reset extra turn flag
    }

    if (effect.skipTurn) {
      message += ` ${player.name} loses a turn.`;
      // if (doAction) { this.nextTurn(); } // Advance to next player}
      player.skipTurn = true; // Set a flag for skip turn
      player.extraTurn = false; // Set a flag for skip turn
    }

    if (effect.extraTurn) {
      message += ` ${player.name} gets another turn!`;
      player.extraTurn = true; // Set a flag for extra turn
      // Don't advance turn - player goes again
    }
    if (doAction) {
      //   this.repositionTokens();
      this.board.updateMoveStatus(message);
      //   effect.done = true; // TODO: check if this is useful
    }
    return { message };
  }

  // Move to the next player's turn
  nextTurn() {
    let nextplayer = this.board.nextTurn();
    while (nextplayer.skipTurn) {
      nextplayer.skipTurn = false; // Reset skip turn flag
      nextplayer = this.board.nextTurn();
    }
    this.currentPlayer = nextplayer;
    // this.currentPlayer = this.board.nextTurn();
    console.log(
      `Next turn: ${this.currentPlayer.name}, Position: ${this.currentPlayer.position}`
    );
    return this.currentPlayer;
  }

  // Handle game over condition
  handleGameOver() {
    this.gameState = "gameOver";
    const winner = this.currentPlayer;

    // Calculate game statistics
    const stats = {
      winner: winner.name,
      turnsPlayed: this.turnHistory.length,
      players: this.players.map((player) => ({
        name: player.name,
        finalPosition: player.position + 1,
        correctAnswers: player.correctAnswers,
        wrongAnswers: player.wrongAnswers,
        score: player.score,
      })),
      hazardsEncountered: this.getHazardsEncountered(),
      lessonsLearned: this.getLessonsLearned(),
    };

    return {
      gameOver: true,
      winner: winner,
      stats: stats,
    };
  }

  // Get hazards encountered during the game
  getHazardsEncountered() {
    const hazards = new Set();
    this.turnHistory.forEach((turn) => {
      const space = gameData.boardSpaces[turn.to];
      if (space.hazard) {
        hazards.add(space.hazard);
      }
    });
    return Array.from(hazards);
  }

  // Generate lessons learned based on game events
  getLessonsLearned() {
    const lessons = new Set();

    // Add lessons from correct answers
    this.players.forEach((player) => {
      if (player.correctAnswers > 0) {
        lessons.add(
          `${player.name} learned ${player.correctAnswers} important prevention strategies`
        );
      }
    });

    // Add lessons from special spaces
    this.turnHistory.forEach((turn) => {
      const space = gameData.boardSpaces[turn.to];
      if (space.instruction && space.instruction.includes("Advance")) {
        lessons.add(space.instruction.replace("Advance", "Learned:"));
      }
    });

    return Array.from(lessons);
  }

  // Pause the game
  pauseGame() {
    if (this.gameState === "playing") {
      this.gameState = "paused";
      return true;
    }
    return false;
  }

  // Resume the game
  resumeGame() {
    if (this.gameState === "paused") {
      this.gameState = "playing";
      return true;
    }
    return false;
  }

  // Restart the game with same players
  restartGame() {
    this.initGame(
      this.players.map((p) => ({ name: p.name, color: p.color })),
      { hazardFocus: this.selectedHazard, difficulty: this.difficulty }
    );
    return this.players;
  }
}

// Export the game class
export default RisklandGame;
