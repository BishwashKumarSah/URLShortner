const USER = require("../Model/user");

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
    return res.redirect("/login", {
      error: "invalid UserName or Password",
    });
  return res.redirect("/");
}

module.exports = { handleUserLoginIn, handleUserSignUp };
