const smallId = require("small-id");

const URL = require("../Model/url");

async function handleCreateShortUrl(req, res) {
  const redirectURL = req.body.redirectURL;
  var id = smallId();

  if (!redirectURL) return res.status(400).json({ msg: "URL is required!" });
  await URL.create({
    shortId: id,
    redirectURL: redirectURL,
    countHistory: [],
    createdBy: req.newUserLogin._id,
  });
  return res.render("home", { shortId: id });
}

const handleGetUrlById = async (req, res) => {
  const id = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: id,
    },
    {
      $push: {
        countHistory: {
          timtimestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectURL);
};

async function handleAnalytics(req, res) {
  const id = req.params.id;
  const result = await URL.findOne({
    shortId: id,
  });
  return res.json({
    totalCicks: result.countHistory.length,
    analytics: result.countHistory,
  });
}

module.exports = { handleCreateShortUrl, handleGetUrlById, handleAnalytics };
