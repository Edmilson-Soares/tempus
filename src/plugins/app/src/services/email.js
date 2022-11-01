'use strict';
const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // use SSL
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});




module.exports = ({ strapi }) => ({

    send: async(options) => {


        try {
            return transporter.sendMail(options);
        } catch (error) {
            console.log(error.message)
        }

    },
    test: async() => {

        try {

            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <edmilsonsoares120@gmail.com>', // sender address
                to: "edmilsonsoares120@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `
                <!DOCTYPE html>
                <html lang="pt">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
                    <title>Tempus</title>

                </head>

                <body>

                <div class="card">
                <div class="card-header">
                    <h4>Criação da Conta no Tempus</h4>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="inputPassword5">Nome da Instituição:</label>
                        <small id="passwordHelpBlock" class="form-text text-muted">
                                      MicroAITec
                        </small>
                    </div>
                    <div class="form-group">
                    <label for="inputPassword5">Acesso a plaforma:</label>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                                  MicroAITec
                    </small>
                </div>

                <div class="form-group">
                <label for="inputPassword5">Nome:</label>
                <small id="passwordHelpBlock" class="form-text text-muted">
                              MicroAITec
                </small>
            </div>

            <div class="form-group">
            <label for="inputPassword5">Username:</label>
            <small id="passwordHelpBlock" class="form-text text-muted">
                                MicroAITec
                  </small>
              </div>

                <div class="form-group">
        <a href="https://tempus.microaitec.pt/">Criar uma senha de acesso </a>
            </div>

                </div>
            </div>
                </body>

                </html>


                `
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..

        } catch (error) {
            console.log(error.message)
        }

    }

});
