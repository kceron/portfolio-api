require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(function(req, res, next) {
  // to enable cors in the server, specidy what domain can make the request
  res.header("Access-Control-Allow-Origin", "https://kceron.github.io/"); // update to match the domain you will make the request from // localhost::8000
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/email', (req, res) => {
  
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        Name: ${req.body.name}
        Email: ${req.body.email}
        Message: 
        ${req.body.message}
    `
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
      }
    })
    const mailOptions = {
      from: `${req.body.email}`,
      to: 'kitzel7@gmail.com',
      subject: `${req.body.name}`,
      text: htmlEmail,
      replyTo: `${req.body.email}`
    }
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
    })
  })
})

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // change later to only allow our server
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// app.get('/api', (req, res, next) => {
//     res.send('API Status: I\'m awesome. You\'re awesome. We all awesome!')
// });

// app.post('/api/email', (req, res, next) => {

//     console.log(req.body);

//     sendGrid.setApiKey('');
//     const msg = {
//         to: 'kitzel7@gmail.com',
//         from: req.body.email,
//         subject: 'Website Contact',
//         text: req.body.message
//     }

//     sendGrid.send(msg)
//         .then(result => {
//             // this 'res' is from the callback function above req, res, etc
//             res.status(200).json({
//                 success: true
//             });

//         })
//         .catch(err => {

//             console.log('error: ', err);
//             res.status(401).json({
//                 success: false
//             });

//         });
// });

// app.listen(3030, '0.0.0.0');