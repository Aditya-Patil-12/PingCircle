const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async  ({email,subject,message}) => {
  console.log(email," ",subject," ",message);
  
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [`${email}`],
    subject: `${subject}`,
    html: `${message}`,
  });

  if (error) {
    return console.error({ error });
  }
  console.log("mail sent");
  
  console.log({ data });
}

module.exports = sendEmail;