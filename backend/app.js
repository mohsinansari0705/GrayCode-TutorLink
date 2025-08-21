// This is going to be the main executable file 

import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });
const app = express();

app.get("/", (req, res) => {
  res.send("This is Ai `Hello my name is Ai haha haha `");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running : http://localhost:${process.env.PORT} `);
});
