const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/saurabh', (req, res) => { 
    res.send('Hello from Saurabh Singh updated');
});

app.post('/contact', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saurabhsinghcontactemail@gmail.com',  
            pass: '@Saurabh12345678'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'saurabhsinghcontactemail@gmail.com',
        subject: `Message from your client having mailId ${req.body.email}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            res.send(err);
        } else { 
            res.status(200).json({ 
                status: 'Success',
                message: 'Email Sent Successfully'
            }); 
        }
    });

});

app.listen(PORT, () => {
    console.log('App running on port');
});