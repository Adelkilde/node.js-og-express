import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Dis shit runnin' on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Wow!!");
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("back-end/data.json");
  console.log(data);
  const artists = JSON.parse(data);

  const sortedArtists = artists.sort((a, b) => a.name.localeCompare(b.name));

  res.json(sortedArtists);
});

app.get("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("back-end/data.json");
  const artists = JSON.parse(data);

  let artist = artists.find((artist) => artist.id === id);

  fs.writeFile("back-end/data.json", JSON.stringify(artists));

  if (!artist) {
    res.status(404).json({ error: "Artist not found!" });
  } else {
    res.json(artist);
  }
});

app.post("/artists", async (req, res) => {
  const newArtist = req.body;
  newArtist.id = new Date().getTime();
  // newArtist.name;
  // newArtist.birthdate;
  // newArtist.activeSince;
  // newArtist.genres;
  // newArtist.labels;
  // newArtist.website;
  // newArtist.image;
  // newArtist.shortDescription;

  const data = await fs.readFile("back-end/data.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  fs.writeFile("back-end/data.json", JSON.stringify(artists));
  res.json(artists);
});
