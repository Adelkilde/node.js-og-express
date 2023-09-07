import { artists } from "./race.js";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function searchArtists(searchValue) {
  searchValue = searchValue.toLowerCase();
  const results = artists.filter(checkName);
  function checkName(artist) {
    const name = artist.name.toLowerCase();
    return name.includes(searchValue);
  }
  return results;
}
function compareNameAZ(artist1, artist2) {
  return artist1.name.localeCompare(artist2.name);
}

function compareNameZA(artist1, artist2) {
  return artist2.name.localeCompare(artist1.name);
}

function compareGenres(artist1, artist2) {
  return artist1.genres.localeCompare(artist2.genres);
}

export { scrollToTop, searchArtists, compareNameAZ, compareNameZA, compareGenres };
