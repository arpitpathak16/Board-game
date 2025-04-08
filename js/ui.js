// ui.js - User interface controller and screen management

import RisklandGame from "./game.js";
import GameBoard from "./board.js";
import gameData from "./data.js";

class GameUI {
  constructor() {
    this.game = new RisklandGame();
    this.currentScreen = "home";
    this.setupEventListeners();
  }

  // Initialize all event listeners
  setupEventListeners() {
    // Home screen buttons
    document
      .getElementById("play-btn")
      .addEventListener("click", () => this.showScreen("setup"));
    document
      .getElementById("rules-btn")
      .addEventListener("click", () => this.showScreen("rules"));
    document
      .getElementById("about-btn")
      .addEventListener("click", () => this.showScreen("about"));

    // Navigation back buttons
    document
      .getElementById("rules-back-btn")
      .addEventListener("click", () => this.showScreen("home"));
    document
      .getElementById("about-back-btn")
      .addEventListener("click", () => this.showScreen("home"));
    document
      .getElementById("setup-back-btn")
      .addEventListener("click", () => this.showScreen("home"));

    // Setup screen controls
    document
      .getElementById("add-player-btn")
      .addEventListener("click", () => this.addPlayerInput());
    document
      .getElementById("start-game-btn")
      .addEventListener("click", () => this.startGame());

    // Game board controls
    document
      .getElementById("roll-dice-btn")
      .addEventListener("click", () => this.handleDiceRoll());
    document
      .getElementById("pause-btn")
      .addEventListener("click", () => this.togglePauseMenu());

    // Card screen buttons
    document
      .getElementById("question-submit-btn")
      .addEventListener("click", () => this.submitAnswer());
    document
      .getElementById("surprise-continue-btn")
      .addEventListener("click", () => this.continueFromSurprise());
    document
      .getElementById("feedback-continue-btn")
      .addEventListener("click", () => this.continueFromFeedback());

    // Pause menu buttons
    document
      .getElementById("resume-btn")
      .addEventListener("click", () => this.togglePauseMenu());
    document
      .getElementById("restart-btn")
      .addEventListener("click", () => this.restartGame());
    document
      .getElementById("main-menu-btn")
      .addEventListener("click", () => this.returnToMainMenu());

    // Game over buttons
    document
      .getElementById("play-again-btn")
      .addEventListener("click", () => this.playAgain());
    document
      .getElementById("end-main-menu-btn")
      .addEventListener("click", () => this.returnToMainMenu());

    // showScreen on window resize
    // reposition on window resize
    window.addEventListener("resize", () => {
      this.showScreen(this.currentScreen);
      this.game.removeTokenTransition();
      this.game.repositionTokens();
      this.game.addTokenTransition();
    });
  }

  // Show a specific screen and hide others
  showScreen(screenName) {
    this.currentScreen = screenName;

    // Hide all screens
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    // Show the requested screen
    document.getElementById(`${screenName}-screen`).classList.add("active");

    const screens = document.querySelectorAll(".screen");

    // add class hidden to all screens except the target screen
    screens.forEach((screen) => {
      if (screen !== screenName) {
        screen.classList.add("hidden");
      } else {
        screen.classList.remove("hidden");
      }
    });

    // put current screen in the center of the screen
    const currentScreen = document.getElementById(`${screenName}-screen`);
    const screenRect = currentScreen.getBoundingClientRect();
    const screenWidth = screenRect.width;
    const screenHeight = screenRect.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const left = (windowWidth - screenWidth-250) / 2;
    const top = (windowHeight - screenHeight) / 2;
    currentScreen.style.left = `${left}px`;
    currentScreen.style.top = `${top}px`;
    currentScreen.style.position = "absolute";
    currentScreen.style.zIndex = 1000;

    // Hide all player tokens on the game board
    const playerTokens = document.querySelectorAll(".player-token");
    playerTokens.forEach((token) => {
      token.style.visibility = "hidden";
    });

    // Special cases
    if (screenName === "setup") {
      this.setupPlayerInputs();
    } else if (screenName === "game-board") {
      this.game.repositionTokens();
      //   show player-token
      const playerTokens = document.querySelectorAll(".player-token");
      playerTokens.forEach((token) => {
        token.style.visibility = "visible";
      });
    }
  }

  // showScreen(screenName) {
  //   this.currentScreen = screenName;

  //   // Hide all screens
  //   document.querySelectorAll(".screen").forEach((screen) => {
  //       screen.classList.remove("active");
  //   });

  //   // Show the requested screen
  //   document.getElementById(`${screenName}-screen`).classList.add("active");

  //   // Special cases
  //   if (screenName === "setup") {
  //       this.setupPlayerInputs();
  //   } else if (screenName === "game-board") {
  //       this.game.repositionTokens();
  //       // Show player-token
  //       const playerTokens = document.querySelectorAll(".player-token");
  //       playerTokens.forEach((token) => {
  //           token.style.visibility = "visible";
  //       });
  //   }
  // }

  /* SETUP SCREEN FUNCTIONS */

  // Setup initial player inputs
  setupPlayerInputs() {
    const container = document.getElementById("players-container");
    container.innerHTML = "";

    // Add first player input
    this.addPlayerInput(0, "red");
  }

  // Add a new player input field
  addPlayerInput(index = null, defaultColor = null) {
    const container = document.getElementById("players-container");
    const playerCount = container.children.length;

    // Limit to 4 players
    if (playerCount >= 4) {
      alert("Maximum 4 players allowed");
      return;
    }

    const newIndex = index !== null ? index : playerCount;
    const color = defaultColor || this.getAvailableColor(newIndex);

    const playerInput = document.createElement("div");
    playerInput.className = "player-input";
    playerInput.dataset.index = newIndex;
    playerInput.innerHTML = `
            <label for="player${newIndex + 1}">Player ${
      newIndex + 1
    } Name:</label>
            <input type="text" id="player${
              newIndex + 1
            }" placeholder="Enter name" value="Player ${newIndex + 1}">
            <div class="token-selector">
                <label>Select Token:</label>
                <div class="token-options">
                    <div class="token-option ${
                      color === "red" ? "selected" : ""
                    }" data-color="red"></div>
                    <div class="token-option ${
                      color === "blue" ? "selected" : ""
                    }" data-color="blue"></div>
                    <div class="token-option ${
                      color === "green" ? "selected" : ""
                    }" data-color="green"></div>
                    <div class="token-option ${
                      color === "yellow" ? "selected" : ""
                    }" data-color="yellow"></div>
                </div>
            </div>
            ${
              newIndex > 0
                ? `<button class="btn btn-small remove-player-btn" data-index="${newIndex}">Remove</button>`
                : ""
            }
        `;

    container.appendChild(playerInput);

    // Add event listeners to token options
    playerInput.querySelectorAll(".token-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        // Deselect all options in this group
        playerInput.querySelectorAll(".token-option").forEach((opt) => {
          opt.classList.remove("selected");
        });

        // Select clicked option
        e.target.classList.add("selected");
      });
    });

    // Add event listener to remove button
    const removeBtn = playerInput.querySelector(".remove-player-btn");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        container.removeChild(playerInput);
      });
    }
  }

  // Get an available color for new players
  getAvailableColor(index) {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[index % colors.length];
  }

  // Start the game with configured players
  startGame() {
    const players = [];
    const playerInputs = document.querySelectorAll(".player-input");

    // Gather player info from inputs
    playerInputs.forEach((input, index) => {
      const name = input.querySelector("input").value || `Player ${index + 1}`;
      const color = input.querySelector(".token-option.selected").dataset.color;

      players.push({ name, color });
    });

    // Get game options
    const options = {
      hazardFocus: document.getElementById("hazard-focus").value,
      difficulty: document.getElementById("difficulty").value,
    };

    // TODO: use difficulty and hazard focus in game

    // Initialize the game
    this.showScreen("game-board");
    this.game.initGame(players, options);
  }

  /* GAME BOARD FUNCTIONS */

  // Handle dice roll action
  async handleDiceRoll() {
    // Disable button during roll
    const rollBtn = document.getElementById("roll-dice-btn");
    rollBtn.disabled = true;

    // Roll the dice and get result
    const result = this.game.rollDice();
    window.recentResult = result;

    console.log("Dice rolled, result: ", result);

    // If game over (player reached finish)
    if (result?.gameOver) {
      this.showGameOver(result);
      return;
    }

    // Handle special space effects after a delay
    if (result?.type) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.handleSpecialSpace(result);
    } else {
      // Normal space - proceed to next turn after delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.game.nextTurn();
    }

    rollBtn.disabled = false;
  }

  // Handle special space effects (question, surprise, instruction)
  handleSpecialSpace(spaceData) {
    switch (spaceData.type) {
      case "question":
        this.showQuestionCard(spaceData);
        break;
      case "surprise":
        this.showSurpriseCard(spaceData);
        break;
      case "instruction":
        this.applyInstruction(spaceData);
        break;
    }
  }

  // Show question card screen
  showQuestionCard(questionData) {
    const card = document.getElementById("question-card-screen");
    document.getElementById("question-text").textContent =
      questionData.question;

    window.recentQuestion = questionData;
    console.log("Question card shown: ", questionData);

    const optionsContainer = document.getElementById("question-options");
    optionsContainer.innerHTML = "";

    // Add answer options
    questionData.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.className = "question-option";
      optionElement.textContent = option;
      optionElement.dataset.index = index;

      optionElement.addEventListener("click", () => {
        // Highlight selected option
        optionsContainer.querySelectorAll(".question-option").forEach((opt) => {
          opt.classList.remove("selected");
        });
        optionElement.classList.add("selected");
      });

      optionsContainer.appendChild(optionElement);
    });

    this.showScreen("question-card");
  }

  // Submit answer to question
  submitAnswer() {
    const selectedOption = document.querySelector(".question-option.selected");
    if (!selectedOption) {
      alert("Please select an answer");
      return;
    }

    const answerIndex = parseInt(selectedOption.dataset.index);
    console.log("Answer selected: ", answerIndex);
    const result = this.game.answerQuestion(
      this.game.currentPlayer.id,
      answerIndex,
      window.recentQuestion
    );

    window.recentFeedback = result;
    console.log("Answer submitted, result: ", result);

    // Show feedback
    this.showFeedbackCard(
      result.correct ? "Correct!" : "Incorrect",
      result.explanation
    );
  }

  // Show surprise card screen
  showSurpriseCard(surpriseData) {
    document.getElementById("surprise-text").textContent = surpriseData.text;
    this.showScreen("surprise-card");
  }

  // Continue from surprise card
  continueFromSurprise() {
    if (window.recentResult.gameOver) {
      this.showGameOver(effect);
    } else {
      this.showScreen("game-board");

      this.game.applyCardEffect({
        text: document.getElementById("surprise-text").textContent,
        ...window.recentResult,
      });

      if (!this.game.currentPlayer.extraTurn) {
        this.game.nextTurn();
      }
      // this.game.nextTurn();
    }
  }

  // Apply instruction space effect
  applyInstruction(instructionData) {
    console.log("Applying instruction:", instructionData);
    const effect = this.game.applyCardEffect(instructionData, false);

    window.recentFeedback = instructionData;
    console.log("Instruction applied, effect: ", effect);

    if (effect?.gameOver) {
      this.showGameOver(effect);
    } else {
      // Show feedback about the instruction
      this.showFeedbackCard("Instruction", instructionData.message);
    }
  }

  // Show feedback card
  showFeedbackCard(header, message) {
    document.getElementById("feedback-header").textContent = header;
    document.getElementById("feedback-text").textContent = message;
    this.showScreen("feedback");
  }

  // Continue from feedback card
  continueFromFeedback() {
    this.showScreen("game-board");
    this.game.applyCardEffect(window.recentFeedback);

    // Only advance turn if player doesn't get an extra turn
    if (!this.game.currentPlayer.extraTurn) {
      this.game.nextTurn();
    } else {
      this.game.currentPlayer.extraTurn = false;
    }
  }

  /* PAUSE MENU FUNCTIONS */

  // Toggle pause menu visibility
  togglePauseMenu() {
    if (this.currentScreen === "pause-menu") {
      this.game.resumeGame();
      this.showScreen("game-board");
    } else {
      this.game.pauseGame();
      this.showScreen("pause-menu");
    }
  }

  /* GAME OVER FUNCTIONS */

  // Show game over screen with results
  showGameOver(result) {
    document.getElementById(
      "winner-text"
    ).textContent = `${result.winner.name} wins!`;

    // Display game stats
    const statsContainer = document.getElementById("game-stats-content");
    statsContainer.innerHTML = result.stats.players
      .map(
        (player) => `
            <div class="player-stat">
                <h4>${player.name}</h4>
                <p>Final Position: ${player.finalPosition}</p>
                <p>Correct Answers: ${player.correctAnswers}</p>
                <p>Score: ${player.score}</p>
            </div>
        `
      )
      .join("");

    // Display lessons learned
    const lessonsContainer = document.getElementById("lessons-learned");
    lessonsContainer.innerHTML = result.stats.lessonsLearned
      .map(
        (lesson) => `
            <li>${lesson}</li>
        `
      )
      .join("");

    this.showScreen("game-over");
  }

  // Restart the game with same players
  restartGame() {
    this.game.restartGame();
    this.showScreen("game-board");
  }

  // Play again from game over screen
  playAgain() {
    this.game.restartGame();
    this.showScreen("game-board");
  }

  // Return to main menu
  returnToMainMenu() {
    this.showScreen("home");
  }
}

// Initialize the UI when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const gameUI = new GameUI();

  console.log("Game initialized");
  // hide all screens except for active class screen
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    if (!screen.classList.contains("active")) {
      screen.classList.add("hidden");
    }
  });
});
