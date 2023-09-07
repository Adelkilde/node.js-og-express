const endpoint = "http://localhost:3333";
const headers = { "Content-Type": "application/json" };

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
  const newArtist = { name, birthdate, activeSince, genres, labels, website, image, shortDescription };
  const json = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    headers: headers,
    method: "POST",
    body: json,
  });
  return response;
}

async function updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
  const artistToUpdate = { id, name, birthdate, activeSince, genres, labels, website, image, shortDescription };
  const json = JSON.stringify(artistToUpdate);
  const response = await fetch(`${endpoint}/artists/${id}`, {
    headers: headers,
    method: "PUT",
    body: json,
  });
  return response;
}

async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    headers: headers,
    method: "DELETE",
  });
  return response;
}

async function changeFavorite(artist) {
  const response = await fetch(`${endpoint}/artists/favorite/${artist.id}`, {
    method: "PUT",
  });
  if (response.ok) {
    return response;
  } else {
    console.error("Failed to change favorite status. Status: " + response.satus);
  }
}

export { getArtists, createArtist, updateArtist, deleteArtist, changeFavorite };
