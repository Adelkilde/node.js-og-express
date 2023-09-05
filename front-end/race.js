"use strict";

window.addEventListener("load", initApp);

function initApp() {
  console.log("We're live 🚀");
  getArtists();
}

async function getArtists() {
  const response = await fetch("http://localhost:3333/artists");
  const data = await response.json();
  console.log(data);
}

function displayArtists() {}

function createArtist() {}

function updateArtist() {}

function deleteArtist() {}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
