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
  const data = await fs.readFile("data.json");
  console.log(data);
  const artists = JSON.parse(data);

  const sortedArtists = artists.sort((a, b) => a.name.localeCompare(b.name));

  res.json(sortedArtists);
});

app.get("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  let artist = artists.find((artist) => artist.id === id);

  fs.writeFile("data.json", JSON.stringify(artists));
  res.json(artist);
});
