const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

function sendMail(email, subject, message) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vishnuprasanth050603@gmail.com",
                pass: "raylvfelhwygrpfg" 
            }
        });

        const mail_configs = {
            from: "vishnuprasanth050603@gmail.com",
            to: email,
            subject: subject,
            text: message,
        };

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error occurred` });
            }

            return resolve({ message: "Email sent successfully" });
        });
    });
}

app.post("/send-email", (req, res) => { 
    const { email, subject, message } = req.body;

    sendMail(email, subject, message)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});