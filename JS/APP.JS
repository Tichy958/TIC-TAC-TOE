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
    App.$.squares.forEach((square) => {
      square.addEventListener("click", () => {
        console.log(square);
        //CHECK IF THERE IS FRee space in SQUARE
        if (square.hasChildNodes()) {
          console.log("Has childNodes");
          return;
        }

        const icon = document.createElement(`i`);

        if (App.state.currentPlayer === 1) {
          // icon.className = `fa-solid fa star` this would delete all classes in element
          icon.classList.add("fa-solid", "fa-x", "yellow"); //adds another class
          square.appendChild(icon);
          App.state.currentPlayer += 1;
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
          square.appendChild(icon);
          App.state.currentPlayer -= 1;
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
