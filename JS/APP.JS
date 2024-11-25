const menu = document.querySelector(`.menu`);

menu.addEventListener("click", (event) => {
  console.log(event.target);
});

// Select the menu button and the items container
const menuButton = document.querySelector(".menu-btn");
const menuItems = document.querySelector('[data-id="menu-items"]');

// Add a click event listener to the menu button
menuButton.addEventListener("click", () => {
  // Toggle the 'hidden' class on the items container
  menuItems.classList.toggle("hidden");
});
