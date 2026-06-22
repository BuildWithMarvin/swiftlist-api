let sidebar = document.querySelector("nav");
let mainContainer = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("interaktiv")
    .addEventListener("click", clickHandling);
});

function clickHandling() {
    sidebar.classList.remove("sidebar");
    mainContainer.classList.add("mainContainer");
    sidebar.classList.add("sidebarToogle");
    mainContainer.classList.add("mainContainerToogle");
  }