function googleLoginConfig(OAuth2Client) {
  return  new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: "http://localhost:5173",
  });
}

module.exports = googleLoginConfig;