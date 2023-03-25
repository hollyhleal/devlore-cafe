const router = require("express").Router();
const { Manage } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const dbManageData = await Manage.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedInManager = true;

      res.redirect("/menu-mgr");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const dbManageData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbManageData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbManageData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedInManager = true;

      res.redirect("/menu-mgr");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
