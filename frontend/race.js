import { getArtists, createArtist, updateArtist, deleteArtist } from "./rest-service.js";

window.addEventListener("load", initApp);

function initApp() {
  console.log("We're live 🚀");
  updateArtistsGrid();
}

async function updateArtistsGrid() {
  const artists = await getArtists();
  displayArtists(artists);
}

function displayArtists(list) {
  document.querySelector("#artists-grid").innerHTML = "";

  for (const artist of list) {
    document.querySelector("#artists-grid").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <article>
      <img src="${artist.image}">
      <h2>${artist.name}</h2>
      <p>Born: ${artist.birthdate}</p>
      <p>Active Since: ${artist.activeSince}</p>
      <p>Genres: ${artist.genres.join(", ")}</p>
      <p>Labels: ${artist.labels.join(", ")}</p>
      <p>Website: <a href="${artist.website}" target="_blank">${artist.website}</a></p>
      <p>${artist.shortDescription}</p>
      <div class="btns">
        <button class="btn-update-artist">Update</button>
        <button class="btn-delete-artist">Delete</button>
      </div>
      </article>`
    );
    // document.querySelector("#artists-grid article:last-child .btn-update-user").addEventListener("click", () => )
    // document.querySelector("#artists-grid article:last-child .btn-delete-user").addEventListener("click", () => )
  }
}

function artistClicked() {}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
