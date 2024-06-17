const mailer = require('./config')

const contactMail = (data) => {
    return {
        from: process.env.EMAIL || "ingeltemails@gmail.com",
        to: "info@elderholidays.com",
        subject: "Elder Cabs Contact Query",
        text: `

        Someone Contacted you!

        Name: ${data.fname} ${data.lname || ''}

        Phone Number: ${data.phoneNo}

        Email: ${data.email}

        Subject: ${data.subject}

        Message: ${data.message}
        `,
    };
}

exports.sendMail = async (req, res) => {
    try {
        mailer.transporter.sendMail(contactMail(req.body), (err, info) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.send(info.response)
            }
        });
    } catch (err) {
        res.status(400).send(err)
    }
}