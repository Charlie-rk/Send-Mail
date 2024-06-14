const AWS = require('aws-sdk');
require('dotenv').config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = async (recipientEmail, name) => {
  const params = {
    Source: process.env.AWS_SES_SENDER,
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <html>
              <head>
                <style>
                  body {
                    background-color: black;
                    color: white;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                  }
                  .content {
                    background-color: #333333;
                    padding: 20px;
                    border-radius: 10px;
                  }
                  h1 {
                    color: #ffcc00;
                  }
                  p {
                    color: #cccccc;
                  }
                  .quote {
                    font-style: italic;
                    color: #ff5733;
                  }
                </style>
              </head>
              <body>
                <div class="content">
                  <h1>Hello, ${name}!</h1>
                  <p>This is the body of my email!</p>
                  <p class="quote">"This is a beautiful quote for you."</p>
                </div>
              </body>
            </html>
          `,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello, this is the body of my email!"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello, ${name}!`,
      }
    },
  };

  try {
    const res = await AWS_SES.sendEmail(params).promise();
    console.log('Email has been sent!', res);
  } catch (error) {
    console.error(error);
  }
}

sendEmail("rustampavri1275@gmail.com", "Rk - Ck");
