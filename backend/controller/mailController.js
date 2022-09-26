const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const https = require('https');

const CLIENT_ID =
  "731119881363-2b42s3fukotgtbqj4dj3rqbnmts2s2ki.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//043PKmjQDvzUHCgYIARAAGAQSNwF-L9IrasP-SCEg-bQbRO8jp_q1dGKfDlDWd2_vDUCCiD-y9U1k9FQLjF1-qHKt7Ea80CrwVfc";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

const authorizationUrl = oAuth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});

const sendMail = async (req, res) => {
  const { mailTo, code, mailText } = req.body;
  if (req.url == "/") {
    res.writeHead(301, { Location: authorizationUrl });
  }


  
  

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.gmail.com",
      // port: 587,
      
      auth: {
        type: "OAUTH2",
        user: "za.tajer@gmail.com",
        pass: "bkhgzysakhcdmwoi",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    await transport.sendMail({
      from: "za.tajer@gmail.com",
      to: mailTo,
      subject: "Email Confirmation",
      text: "",
      html: `<h1>Confirmation code: ${code}</h1>`,
    });
    res.json({ status: 200, Message: "Message Sent" });
  } catch (error) {
    console.log(error);
    res.json({ status: 400, Message: error });
  }
};

module.exports = { sendMail };
