import { getArtists, createArtist, updateArtist, deleteArtist } from "./rest-service.js";
import { scrollToTop } from "./helpers.js";

let artists;

window.addEventListener("load", initApp);

function initApp() {
  console.log("We're live 🚀");
  updateArtistsGrid();
  // My Event Listeners
  document.querySelector("#btn-create-artist").addEventListener("click", showCreateArtistDialog);
  document.querySelector("#form-create-artist").addEventListener("submit", createArtistClicked);
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);
  document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  document.querySelector("#form-delete-artist .btn-cancel").addEventListener("click", deleteCancelClicked);
  // document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);
  document.querySelector("#search-input").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#search-input").addEventListener("search", inputSearchChanged);
}

// ============== Events ============== //

function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
}

async function createArtistClicked(event) {
  const form = event.target;

  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (res.ok) {
    console.log("New artist succesfully added to Database 🎵");
    form.reset();
    scrollToTop();
    updateArtistsGrid();
  }
}

async function updateArtistClicked(event) {
  const form = event.target;

  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const id = form.getAttribute("data-id");
  const res = await updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription);

  if (res.ok) {
    console.log("Artist succesfully updated in Database 🎵");
    scrollToTop();
    updateArtistsGrid();
  }
}

async function deleteArtistClicked(event) {
  const id = event.target.getAttribute("data-id");
  const res = await deleteArtist(id);

  if (res.ok) {
    console.log("Artist succesfully deleted from Firebase 🎵");
    scrollToTop();
    updateArtistsGrid();
  }
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-artist").close();
}

function inputSearchChanged(event) {
  const value = event.target.value;
  const artistsToShow = searchArtists(value);
  displayArtists(artistsToShow);
}

// ============== Artists ============== //

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
      <p>Genres: ${artist.genres}</p>
      <p>Labels: ${artist.labels}</p>
      <p>Website: <a href="${artist.website}" target="_blank">${artist.website}</a></p>
      <p>${artist.shortDescription}</p>
      <div class="btns">
        <button class="btn-update-artist">Update</button>
        <button class="btn-delete-artist">Delete</button>
      </div>
      </article>`
    );
    document
      .querySelector("#artists-grid article:last-child .btn-update-artist")
      .addEventListener("click", () => updateClicked(artist));
    document
      .querySelector("#artists-grid article:last-child .btn-delete-artist")
      .addEventListener("click", () => deleteClicked(artist));
  }
}

function updateClicked(artist) {
  const updateForm = document.querySelector("#form-update-artist");
  updateForm.name.value = artist.name;
  updateForm.birthdate.value = artist.birthdate;
  updateForm.activeSince.value = artist.activeSince;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.website.value = artist.website;
  updateForm.image.value = artist.image;
  updateForm.shortDescription.value = artist.shortDescription;
  updateForm.setAttribute("data-id", artist.id);
  document.querySelector("#dialog-update-artist").showModal();
}

function deleteClicked(artist) {
  document.querySelector("#dialog-delete-artist-name").textContent = artist.name;
  document.querySelector("#form-delete-artist").setAttribute("data-id", artist.id);
  document.querySelector("#dialog-delete-artist").showModal();
}

function searchArtists(searchValue) {
  searchValue = searchValue.toLowerCase();
  const results = artists.filter((artists) => artist.name.toLowerCase().includes(searchValue));
  return results;
}
