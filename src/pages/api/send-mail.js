import nodemailer from 'nodemailer'
export default function SendEmail(req, res) {

  const user = process.env.USERMAIL
  const pass = process.env.PASSMAIL
  const host = process.env.HOST
  const port = process.env.PORT

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailData = {
    from: user,
    to: 'rodrigos-carvalho@hotmail.com',
    subject: 'Ola, ....',
    text: "Email enviado pelo NEXT",
  }

  transporter.sendMail(mailData)
    .then(info => {
      res.send(info)
      console.log(info)
    })
    .catch(error => {
      res.send(error)
      console.log(error)
    })

}