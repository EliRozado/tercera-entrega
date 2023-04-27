import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'wolfusimagius@gmail.com',
        pass: 'hwakzdpxwmbgsoef'
    }
})


app.get('/mail', async (req, res) => {
    let result = await transport.sendMail({
        from: 'Merry Chrysler <wolfusimagius@gmail.com>',
        to: 'skatey.o.deakka@gmail.com',
        subject: 'correo de prueba',
        html: '<h1>This is a test, did it arrive?</h1>',
        attachments: []
    })

    res.status(201).send({message: 'mande un mail!'})
});

app.listen(3000, () => console.log(`Server up in port 3000`))