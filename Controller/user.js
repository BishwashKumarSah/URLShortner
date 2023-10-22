const USER = require("../Model/user");
const { setUser } = require("../Services/auth");

const { v4: uuidv4 } = require("uuid");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await USER.create({
    name: name,
    email: email,
    password: password,
  });
  return res.redirect("/");
}
async function handleUserLoginIn(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email: email, password: password });
  if (!user)
    return res.render("login", {
      error: "invalid UserName or Password",
    });
  const uid = uuidv4();
  setUser(uid, user);
  res.cookie("uid", uid);
  return res.redirect("/");
}

module.exports = { handleUserLoginIn, handleUserSignUp };
