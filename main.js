const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
app.use('/dist', express.static(path.join(__dirname,'dist')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res)=> {
    const output = `
    <p>You have a new contact request</p>
    <h3> Contact Details </h3>
    <ul>
        <li> Name: ${req.body.name}</li>
        <li> Name: ${req.body.email}</li>
    </ul>
    <h3> Message </h3>
    <p>${req.body.message}</p>
    `;
       // create reusable transporter object using the default SMTP transport
       let transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
            user: 'dylangodfrey12@gmail.com', // generated ethereal user
            pass: 'austin12' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"NodeMailer" <dylangodfrey12@gmail.com>', // sender address
        to: 'dylangodfrey12@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact',{msg:'Email Sent!'})
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});



app.listen(3000, () => console.log('Server started...'));
   