const mongoose = require("mongoose");
require("dotenv").config();

const password = encodeURI(process.env.MONGO_PASSWORD.trim());
// const url = `mongodb+srv://jaweherhichri07:${password}@cluster0.jgo8wfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url = `mongodb+srv://zeroToOne:buipVfeMa5gYzYsa@cluster0.r4tscil.mongodb.net/`;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected !");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
  