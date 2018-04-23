const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
var helmet = require('helmet');
require('dotenv').config();
// View engine setup
app.engine('html', exphbs());
app.set('view engine', 'html');

// Static folder
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.get('/', (req, res) => {
    //Retrieve the template data from the HTML .
    
    
    res.render('index',);
});
app.get('/about', (req, res) => {
    //Retrieve the template data from the HTML .
    
    
    res.render('about',);
});
app.get('/services', (req, res) => {
    //Retrieve the template data from the HTML .
    
    
    res.render('services',);
});
app.get('/contact', (req, res) => {
    //Retrieve the template data from the HTML .
    
    
    res.render('contact',);
});
app.post('/send', (req, res)=> {
    console.log(req.body);
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
        res.render('confirmation');
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

app.post('/email', (req, res)=> {
    console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3> Contact Details </h3>
    <ul>
        <li> Name: ${req.body.name}</li>
        <li> Name: ${req.body.email}</li>
        <li> Name: ${req.body.number}</li>
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
        res.render('confirmation');
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});


app.listen(3000, () => console.log('Server started...'));
   