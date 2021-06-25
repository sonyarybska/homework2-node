const express = require("express");
const fs = require("fs/promises");
const path = require('path');
const expressHbs = require("express-handlebars");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended: true}));

app.set("view engine", ".hbs");
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

function Link() {
    const data = await fs.readFile(link, 'utf-8');
    const users = JSON.parse(data);
  } 

app.set("views", path.join(__dirname, "static"));

const link=path.join(__dirname, "usersBD.json");

app.get('/', async (req, res) => {
    return res.render('main');
});

app.get('/login', async (req, res) => {
    return res.render('login');
});

app.get('/registration', async (req, res) => {
    return res.render('registration');
});

app.get("/users", async (req, res) => {
    Link();
    res.render('users', {users});
});

app.get("/user/:username", async (req, res) => {
    Link();
    let {username} = req.params;

     const user = users.find(user => user.username === username);

    res.render('user', {user});
})

app.post("/login", async (req, res) => {
     Link();
    users.forEach(value => {
         if (req.body.username === value.username && req.body.password === value.password) {
             return res.redirect('/user/' + value.username);
        }
    });

    return res.json('No such user found');
})

app.post("/registration", async (req, res) => {
    Link();

      let validation = users.find(value => value.username === req.body.username);

          if (validation) {
             return res.json('A user with this name already exists, try another');
          }

    const body = req.body;
    users.push(body);
    const updateUsers = JSON.stringify(users);
    await fs.writeFile(link, updateUsers);

        return res.redirect("/user/"+req.body.username);
});

app.listen(3000, () => {
    console.log('Listen 3000');
});



