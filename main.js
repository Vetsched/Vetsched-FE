const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build"), { extensions: ["js"] }));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});
app.listen(443);
