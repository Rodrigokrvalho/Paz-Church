export default function SendEmail(req, res) {
  let nodemailer = require('nodemailer')
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
    to: req.body.email,
    subject: `Bem Vindo ${req.body.fullName}`,
    text: `Seja muito bem vindo. Seu cadastro foi realizado com sucesso.`,
    html: ` <div>
              <h1>Olá, ${req.body.fullName}!</h1></br>
              <h3>Seja muito bem vindo! Seu cadastro foi realizado com sucesso.</h3>
            </div>`
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