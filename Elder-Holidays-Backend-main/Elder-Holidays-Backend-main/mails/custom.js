const mailer = require("./config/nodemailer");
const router = require("express").Router();

// Utility Function
const customMail = async (data) => {
  mailer.options.text = `
        Customized Package Request!
    
        Name: ${data.name}

        Email: ${data.email}

        Phone: ${data.phone}

        Source: ${data.source}

        Destination: ${data.destination}

        Requests from Client: ${data.client_requests}

        Number of People: ${data.num_people}

        Start Date: ${data.startDate}

        Number of Days: ${data.num_days}

        Hotel: ${data.hotel}
    `;
};

// Send Mail
router.post("/", async (req, res) => {
  try {
    const data = await req.body;
    await customMail(data);

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
      message: "Custom Package Query Received!",
    });
  } catch (err) {
    // ERROR
    console.log(err);
    res.status(500).json({
      message: "Custom package Query Failed!",
    });
  }
});

module.exports = router;
