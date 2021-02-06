export default {
  jwt: {
    // secret: '9c661b6bf65c1a7aab41f0fcb8c7d296',
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
