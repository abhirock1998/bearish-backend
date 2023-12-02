require("dotenv").config();
const express = require("express");
const folderRoute = require("./routes/folderRoutes");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", folderRoute);

app.get("/", (req, res) => {
  res.status(404).json({ error: "Requested resource not Found" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  connectToDB();
});

function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
}
