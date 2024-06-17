const mailer = require("./config/nodemailer");
const router = require("express").Router();

// Utility Function
const contactMail = async (data) => {
  mailer.options.text = `
        Someone Contacted you!
    
        Name: ${data.name}

        Email: ${data.email}

        Message: ${data.message}
    `;
};

// Send Mail
router.post("/", async (req, res) => {
  try {
    const data = await req.body;
    await contactMail(data);

    // Sending E-mail
    mailer.transporter.sendMail(mailer.options, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("SENT:", info.response);
      }
    });

    // SUCCESS
    res.status(200).json({
      message: "Contact Query Received!",
    });
  } catch (err) {
    // ERROR
    console.log(err);
    res.status(500).json({
      message: "Contact Query Failed!",
    });
  }
});

module.exports = router;
