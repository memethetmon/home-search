const express = require("express");
const fs = require("fs");
const path = require("path");
const neatCSV = require("neat-csv");

// initialize app
const app = express();

const filePath = path.join(__dirname, "homes.csv");

app.use(express.static(__dirname));

app.get("/home", (req, res, next) => {
  const filter = req.query;
  // read CSV file as a string and pass that into neatCSV function which returns a promise with parsed data
  fs.readFile(filePath, async (error, data) => {
    if(error) {
      console.log("Error reading csv file");
    }
    const parsedHomes = await neatCSV(data);
    const filteredHome = parsedHomes.filter(home => {
      return home.ADDRESS.includes(filter.address);
    })
    res.send(filteredHome);
  });
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});