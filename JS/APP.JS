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

  registerEventListeners() {
    App.$.menu.addEventListener("click", () => {
      App.$.menuItems.classList.toggle("hidden"); // Toggle the 'hidden' class on the items container
    });

    App.$.resetBtn.addEventListener("click", () => {
      console.log("Round restarted!");
    });
    App.$.newRoundBtn.addEventListener("click", () => {
      console.log("New round started!");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`Square with id ${event.target.id} was clicked`);
        // here needs to be used backtick for (`) - opt + 1
      });
    });
  },
};

window.addEventListener("load", App.init);
