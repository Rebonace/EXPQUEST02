require("dotenv").config();

const express = require("express");
const { validateMovie, validateUser } = require("./validators.js");
const { hashPassword } = require("./middlewares/auth");
const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./routes/movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, hashPassword, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const usersHandlers = require("./routes/usersHandlers");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.post("/api/users", validateUser, hashPassword, usersHandlers.postUser);
app.post("api/login", validateUser, hashPassword, usersHandlers.postUser);
app.put("/api/users/:id", validateUser, hashPassword, usersHandlers.updateUser);
app.delete("/api/users/:id", usersHandlers.deleteUser);
app.post("/api/login", usersHandlers.isItDwight);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
