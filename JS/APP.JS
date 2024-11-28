// This is called app namespace

const App = {
  // All of our selected HTML elements
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector("[data-id='menu-items']"),
    resetBtn: document.querySelector("[data-id='resetBtn']"),
    newRoundBtn: document.querySelector("[data-id='newRoundBtn']"),
    squares: document.querySelectorAll("[data-id='square']"),
  },

  //   init: function () {}
  // init: () => {}
  // -- after loading init will be called, and that will call all registerEventListeners

  init() {
    App.registerEventListeners();
  },

  state: {
    currentPlayer: 1,
  },

  registerEventListeners() {
    //DONE
    App.$.menu.addEventListener("click", () => {
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

    //TODO -
    // Click on the square will alert - square was clicked.
    // depending on the player playing, O or X will be added, => current player will be changed
    //
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`Square with id ${event.target.id} was clicked`);

        // here needs to be used backtick for (`) - opt + 1

        // Check if there is already a play, if so, return early

        const currentPlayer = App.state.currentPlayer;

        const icon = document.createElement("i");

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "turqoise");
        }
        App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;

        // Clear all children of the parent element
        event.target.replaceChildren(icon);
      });
    });
  },
};

window.addEventListener("load", App.init);
