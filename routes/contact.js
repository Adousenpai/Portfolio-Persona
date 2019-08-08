const router = require('express').Router();
const Contact = require('../models/ContactModel');
const smtpTransport = require('nodemailer-smtp-transport');
const mailer = require('nodemailer');

// Page Contact
router.get('/contact', (req, res) => {
  res.render('contact');
});

//  Requete du Formulaire Contact
router.post('/contact-post', (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>email: ${req.body.email}</li>
    <li>sujet: ${req.body.sujet}</li>
  </ul>
  <h3> Messages: </h3>
  <p>${req.body.message}</p>
  `;

  let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'simplonportfolio@gmail.com', // generated ethereal user
      pass: 'Simplonco94' // generated ethereal password
    }
  });
  // const mailOptions = {
  //   from: '"NodeMailer Contact" <simplonportfolio@gmail.com>', // sender address
  //   to: 'maxime.diopkaypaghian@gmail.com', // list of receivers
  //   subject: 'Node Contact Request', // Subject line
  //   text: 'Hello world?', // plain text body
  //   html: output // plain text body
  // };

  // transporter.sendMail(mailOptions, function(err, info) {
  //   if (err) console.log(err);
  //   else console.log(info);
  // });
  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"NodeMailer Contact" <simplonportfolio@gmail.com>', // sender address
    to: 'maxime.diopkaypaghian@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  });
  // Envois du mail
  res.redirect('/');
});

module.exports = router;
