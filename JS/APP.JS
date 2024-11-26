// This is called app namespace

const App = {
  // All of our selected HTML elements
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector("[data-id='menu-items']"),
  },
  //   init: function () {}
  // init: () => {}
  init() {
    App.$.menu.addEventListener("click", () => {
      App.$.menuItems.classList.toggle("hidden"); // Toggle the 'hidden' class on the items container
    });
  },
};

window.addEventListener("load", () => App.init());

