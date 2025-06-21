const {Resend} = require("resend");

const resend = new Resend("");

const sendEmail = async  () => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["aditypatil71@gmail.com"],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

module.exports = sendEmail;