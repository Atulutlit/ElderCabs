const mailer = require("./config/nodemailer");
const router = require("express").Router();

// Utility Function
const packageMail = async (data) => {
  mailer.options.text = `
        Package Booking Request!
    
        Firstname: ${data.fname}

        Lastname: ${data.lname}

        Email: ${data.email}

        Phone No: ${data.phone}

        Departure Date: ${data.departure_date}

        Number of People: ${data.num_people}

        Package Details: ${data.package_details}
    `;
};

// Send Mail
router.post("/", async (req, res) => {
  try {
    const data = await req.body;
    await packageMail(data);

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
      message: "Package Query Received!",
    });
  } catch (err) {
    // ERROR
    console.log(err);
    res.status(500).json({
      message: "Package Query Failed!",
    });
  }
});

module.exports = router;
