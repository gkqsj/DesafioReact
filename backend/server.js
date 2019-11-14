const express = require('express');
const senhasupersecreta = 'karla123';
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/', express.static(path.join(__dirname,'/build')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.post('/send', (req, res) => {
    const output = `
        <p>Youjust got an E-mail by a goddamm Trainee</p>
        <h3>Scared Trainee's info</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone Number: ${req.body.phone}</li>
            <li>Name: ${req.body.name}</li>
        </ul>
        <h3>Here's ur message</h3>
        <p>${req.body.message}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'gkqsj@cin.ufpe.br', // generated ethereal user
            pass: senhasupersecreta // generated ethereal password
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: '"Nodemailer" <gkqsj@cin.ufpe.br>', // sender address
        to: 'gabrielkris13@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    }, (error, info) => {
        if(error){
            return console.log(error);
        }else{
            return console.log('Email enviado: ' + info.response);
        }
    });
})

app.listen(process.env.PORT || 3000, () =>{
    console.log(`runin in port ${process.env.PORT || 3000}`);
});