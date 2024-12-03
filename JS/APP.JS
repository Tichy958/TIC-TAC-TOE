// This is called app namespace

const App = {
  // All of our selected HTML elements
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector("[data-id='menu-items']"),
    resetBtn: document.querySelector("[data-id='resetBtn']"),
    newRoundBtn: document.querySelector("[data-id='newRoundBtn']"),
    squares: document.querySelectorAll("[data-id='square']"),
    modal: document.querySelector("[data-id='modal']"),
    modalText: document.querySelector("[data-id='modal-text']"),
    modalBtn: document.querySelector("[data-id='modal-btn']"),
    turn: document.querySelector("[data-id='turn']"),
  },

  //   init: function () {}
  // init: () => {}
  // -- after loading init will be called, and that will call all registerEventListeners

  state: {
    moves: [],
  },

  init() {
    App.registerEventListeners();
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1) // výstup je vyfiltrovaný Array (s objects - dict)
      .map((move) => +move.squareId); // výstup je Array
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      //   console.log({ pattern, p1Moves, p2Moves });

      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });

    // if (p1Wins) winner = 1; <------ checks if p1Wins is truthy value - not neccesarily true

    //     There are exactly six falsy values in JavaScript:
    // 	1.	false - the boolean false.
    // 	2.	0 - the number zero.
    // 	3.	"" or '' - an empty string.
    // 	4.	null - the absence of any value.
    // 	5.	undefined - a variable that hasn’t been assigned a value.
    // 	6.	NaN - “Not-a-Number”.
    // Any value that is not one of these is considered truthy.

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress", // in-progress-complete
      winner, // 1-2-null
    }; // RETURNS OBJECT WITH 2 PROPERTIES: status and winner
  },

  registerEventListeners() {
    //DONE
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden"); // Toggle the 'hidden' class on the items container
    });
    //TODO
    App.$.resetBtn.addEventListener("click", () => {
      console.log("Round restarted!");
    });
    //TODO
    App.$.newRoundBtn.addEventListener("click", () => {
      console.log("New round started!");
    });

    App.$.modalBtn.addEventListener("click", () => {
      App.state.moves = [];
      App.$.squares.forEach((square) => {
        square.replaceChildren();
      });
      App.$.modal.classList.add("hidden");
    });

    //TODO -
    App.$.squares.forEach((square) => {
      square.addEventListener("click", () => {
        //CHECK IF THERE IS FRee space in SQUARE
        const hasMove = (squareId) => {
          // The find method expects a function that returns true or false for each element in the array
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId // if not found, find () returns undefined
          );
          return existingMove !== undefined;
        };

        // if there is not a free space, exit early
        if (hasMove(+square.id)) {
          return;
        }

        // Determine which player icon to add to the square

        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);

        const nextPlayer = getOppositePlayer(currentPlayer);

        const squareIcon = document.createElement(`i`);
        const turnIcon = document.createElement(`i`);
        const turnLabel = document.createElement(`p`);
        turnLabel.innerText = `Player ${nextPlayer}, you are up!`;

        if (currentPlayer === 1) {
          // icon.className = `fa-solid fa star` this would delete all classes in element
          squareIcon.classList.add("fa-solid", "fa-x", "yellow"); //adds another class
          turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnLabel.classList = "turquoise";
        } else {
          squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnIcon.classList.add("fa-solid", "fa-x", "yellow"); //addanother class
          turnLabel.classList = "yellow";
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel);

        //Tracks a record of who clicked on which square
        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        console.log(App.state);
        console.log(App.getGameStatus(App.state.moves));

        square.replaceChildren(squareIcon);

        // Check if there is a winner or tie game
        const game = App.getGameStatus(App.state.moves);

        if (game.status === "complete") {
          App.$.modal.classList.remove("hidden");

          let message = "";
          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = `Tie game!`;
          }

          // 	1.	let and const have block scope: Variables declared with const or let are limited to the block in which they are declared. In your code, you have const message declared separately in both the if and else blocks. These are not the same as the message variable declared outside the block. - i had let message outside and const message inside if statement

          App.$.modalText.textContent = message;
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
