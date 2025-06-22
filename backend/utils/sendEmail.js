const {Resend} = require("resend");

const resend = new Resend("");

const sendEmail = async  ({name,email,token,origin}) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [`${email}`],
    subject: "Hello World",
    html: `Here is the password resetting link <strong>${token}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

module.exports = sendEmail;