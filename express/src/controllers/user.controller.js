const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);
  if (user === null) {
    return res.status(404).send({ message: "User not found!" });
  }

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email,
    phone: req.body.phone,
    joinDate: req.body.joinDate
  });
  if (user === null) {
    res.json(false);
  }
  res.json(true);
};

exports.edit = async (req, res) => {
  var newuser;
  const name = req.params.username;
  let removed = false;
  try {
    const user = await db.user.findByPk(name);
    if (!user) {
      return res.status(405).send({ message: "User not found!" });
    }
    if(user !== null) {
      await user.destroy();
      removed = true;
    }
    if(removed){
      newuser = await db.user.create({
        username: req.body.username,
        password_hash: req.body.password_hash,
        email: req.body.email,
        phone: req.body.phone,
        joinDate: req.body.joinDate
      });
      
    }
    res.json(newuser);
  } catch (error) {
    res.status(500).send({ message: "Error updating user with id=" + name });
  }





};

exports.remove = async (req, res) => {
  const name = req.params.username;

  let removed = false;

  const user = await db.user.findByPk(name);
  if (user === null) {
    return res.status(405).send({ message: "User not found!" });
  }
  if(user !== null) {
    await user.destroy();
    removed = true;
  }

  return res.json(removed);
};