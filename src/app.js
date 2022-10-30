const express = require("express");
const path = require("path");
require("./db/conn");
const Register = require("./models/registers");
const app = express();
// const dotenv = require("../../mernbackend/dotenv");
// dotenv.config();
const hbs = require("hbs");
// console.log(process.env.DBHOST);
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registerUser = new Register({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        phone: req.body.phone,
        message: req.body.message,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });
      const registered = await registerUser.save();
      res.status(201).render("index.hbs");
    } else {
      res.send("Passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
