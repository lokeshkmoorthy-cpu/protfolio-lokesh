const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const DATA_PATH = path.join(__dirname, "data", "portfolioData.json");
const PUBLIC_DATA_PATH = path.join(__dirname, "..", "public", "data", "portfolioData.json");

const readData = () => {
  const file = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(file);
};

const writeData = (payload) => {
  const json = JSON.stringify(payload, null, 2);
  fs.writeFileSync(DATA_PATH, json, "utf-8");
  fs.writeFileSync(PUBLIC_DATA_PATH, json, "utf-8"); // keep frontend static copy in sync
};

// Get full portfolio
app.get("/api/portfolio", (_req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Replace full portfolio
app.put("/api/portfolio", (req, res) => {
  try {
    const payload = req.body;
    writeData(payload);
    res.json({ ok: true, data: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to write data" });
  }
});

// Update a single section (hero, about, skills, resume, portfolio, contact)
app.patch("/api/portfolio/:section", (req, res) => {
  try {
    const section = req.params.section;
    const incoming = req.body;
    const data = readData();

    // If section is an array and action is add, push item
    const addable = ["skills", "portfolio"];
    if (addable.includes(section) && incoming?.action === "add" && incoming.item) {
      data[section] = data[section] || [];
      data[section].push(incoming.item);
    } else {
      data[section] = incoming;
    }

    writeData(data);
    res.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update section" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
