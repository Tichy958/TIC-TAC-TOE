//ES6
// --- this way its not in global scope .. if i wanted it this way ---> window.View = View ... at the end of this file

export default class View {
  $ = {};
  $$ = {};
  //   //   the $ symbol doesn’t have a special meaning in JavaScript, but it’s commonly used to indicate that these are DOM elements, making the code easier to read and undersand.

  //	The constructor is a special method that runs when you create a new instance of the View class. It’s used to initialize properties or set up the object.
  constructor() {
    this.$.menu = this.#qs("[data-id='menu']");
    this.$.menuBtn = this.#qs("[data-id='menu-btn']");
    this.$.menuItems = this.#qs("[data-id='menu-items']");
    this.$.resetBtn = this.#qs("[data-id='resetBtn']");
    this.$.newRoundBtn = this.#qs("[data-id='newRoundBtn']");
    this.$.moda = this.#qs("[data-id='modal']");
    this.$.modalText = this.#qs("[data-id='modal-text']");
    this.$.modalBtn = this.#qs("[data-id='modal-btn']");
    this.$.turn = this.#qs("[data-id='turn']");

    // UI-only event listeners
    this.$.menuBtn.addEventListener("click", (event) => {
      this.toggleMenu();
    });

    this.$$.squares = this.#qsAll("[data-id='square']");
  }

  /**
   * Register all the event listeners
   *
   * @param {*} handler
   */

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }
  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }
  /**
   * DOM helper methods
   */
  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector(`i`);

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  // player = 1 | 2
  setTurnIndicator(player) {
    const icon = document.createElement(`i`);
    const label = document.createElement(`p`);

    icon.classList.add("fa-solid", player.iconClass, player.colorClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you are up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Could not find element");

    return el;
  }
  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("Could not find elements");

    return elList;
  }
}

//	1.	Class Definition (View) A class is essentially a template or blueprint in JavaScript that allows you to create objects with predefined properties and methods. In this case, the View class will represent an interface for interacting with the HTML elements in the DOM (Document Object Model).
