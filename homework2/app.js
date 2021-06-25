const express = require("express");
const fs = require("fs/promises");
const path = require('path');
const expressHbs = require("express-handlebars");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", ".hbs");
app.engine('.hbs', expressHbs({
  defaultLayout: false
}));

function link() {
  const link = path.join(__dirname, "usersBD.json");

  return fs.readFile(link, 'utf-8')
      .then(data => JSON.parse(data))
}

app.set("views", path.join(__dirname, "static"));

app.get('/', async (req, res) => {
  res.render('main');
});

app.get('/login', async (req, res) => {
  res.render('login');
});

app.get('/registration', async (req, res) => {
  res.render('registration');
});

app.get("/users", async (req, res) => {
  const users = await link();
  res.render('users', { users });
});

app.get("/users/:username", async (req, res) => {
  const users = await link();
  const { username } = req.params;

  const user = users.find(user => user.username === username);

  res.render('user', { user });
})

app.post("/login", async (req, res) => {
  const users = await link();

  users.forEach(value => {
    if (req.body.username === value.username && req.body.password === value.password) {
      return res.redirect('/user/' + value.username);
    }
  });

  res.json('No such user found');
})

app.post("/registration", async (req, res) => {
  const users = await link();

  const validation = users.find(value => value.username === req.body.username);

  if (validation) {
    return res.json('A user with this name already exists, try another');
  }

  users.push(req.body);
  const updateUsers = JSON.stringify(users);
  await fs.writeFile(path.join(__dirname, "usersBD.json"), updateUsers);

  res.redirect("/users/" + req.body.username);
});

app.listen(3000, () => {
  console.log('Listen 3000');
});



